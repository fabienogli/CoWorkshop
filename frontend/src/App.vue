<template>
  <div class="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";
  import http from '@/http';

  export default {
    name: 'App',
    components: {
      NavBar,
    },
    computed: {
      token() {
        return this.$store.getters['auth/token'];
      },
      userId() {
        return this.$store.getters['auth/user_id'];
      }
    },
    mounted() {
      this.setUpWebsockets(this.token);
    },
    methods: {
      handleWorkWebsocket(data) {
        const {from_stream} = data.message;
        if(from_stream === 'works') {
          let {work, added, updated} = data.message;
          work = JSON.parse(work);
          if(added) {
            this.$store.dispatch('works/addWork', work);
          } else if(updated) {
            this.$store.dispatch('works/updateWork', work);
          } else {
            this.$store.dispatch('works/removeWork', work);
          }
        } else {
          const {work, user, subscribe} = data.message;
          if (subscribe) {
            this.onSubscribe(work, user);
          } else {
            this.onUnsubscribe(work, user);
          }
        }

      },
      onSubscribe(work, user) {
        const title = `${user.pseudo} is participating to your work  ${work.name} !`;
        this.createAndDispatchNotification(title, '/works');
      },
      onUnsubscribe(work, user) {
        const title = `${user.pseudo} is not participating to your work ${work.name} anymore !`;
        this.createAndDispatchNotification(title, '/works');
      },
      createAndDispatchNotification(title, redirects_to) {
        const notif = {
          title,
          read: false,
          user_id: this.$store.getters['auth/user_id'],
          redirects_to
        };
        this.$store.dispatch('notification/addNotif', notif);
      },
      setUpWebsockets(token) {
        if (token !== '') {
          const user_id = this.userId;
          this.$subscriber.subscribe('WorkChannel', this.handleWorkWebsocket, {
            user_id: user_id,
          });

          http.get(`/users/${user_id}`)
            .then((response) => {
              this.$subscriber.subscribe('TagChannel', (data) => {
                const {from_stream} = data.message;
                if(from_stream === 'tags') {
                  const {tag, added} = data.message;
                  if(added) {
                    this.$store.dispatch('tags/addTag', tag);
                  } else {
                    this.$store.dispatch('tags/removeTag', tag);
                  }
                } else {
                  const {work, tag} = data.message;
                  if(work.user_id !== user_id) {
                    const title = `A new project (${work.name}) was created with the tag ${tag.name} that you follow !`;
                    this.createAndDispatchNotification(title, '/works');
                  }
                }
              });
              this.$subscriber.perform('TagChannel', 'subscribe_all', {
                tags: response.data.tags,
              });
            })
        }
      }
    },
    watch: {
      token(newToken, oldToken) {
        this.setUpWebsockets(newToken);
      },
      userId(newId, oldId) {
        if(newId === 0) {
          this.$subscriber.unsubscribe({
            channel: 'TagChannel'
          });
          this.$subscriber.unsubscribe({
            channel: 'WorkChannel',
            user_id: oldId,
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  .app {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
