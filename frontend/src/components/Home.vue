<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components:{
    },
    data() {
      return {
        msg: 'CoWorkshop'
      }
    },

    methods: {
      handleWorkWebsocket(data) {
        const {work, user, subscribe } = data.message;
        if(subscribe === true) {
          this.onSubscribe(work, user);
        } else if(subscribe === false) {
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
    mounted() {
      this.$subscriber.subscribe('WorkChannel', this.handleWorkWebsocket, {
        user_id: this.$store.getters['auth/user_id'],
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
