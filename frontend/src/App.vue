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
      }
    },
    methods: {
      handleWorkWebsocket(data) {
        const {work, user, subscribe} = data.message;
        if (subscribe === true) {
          this.onSubscribe(work, user);
        } else if (subscribe === false) {
          this.onUnsubscribe(work, user);
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
      }
    },
    watch: {
      token(newToken, oldToken) {
        if (newToken !== '') {
          const user_id = this.$store.getters['auth/user_id'];
          this.$subscriber.subscribe('WorkChannel', this.handleWorkWebsocket, {
            user_id: user_id,
          });

          http.get(`/users/${user_id}`)
            .then((response) => {
              this.$subscriber.subscribe('TagChannel', (data) => {
                const {tag, work} = data.message;
                if(work.user_id !== user_id) {
                  const title = `A new project (${work.name}) was created with the tag ${tag.name} that you follow !`;
                  this.createAndDispatchNotification(title, '/works');
                }
              });
              this.$subscriber.perform('TagChannel', 'subscribe_all', {
                tags: response.data.tags,
              });
            })
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
