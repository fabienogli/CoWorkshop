<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  import Project from "@/components/Project";
  export default {
    name: 'Home',
    components:{
      Project,
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
        console.log(user.pseudo + ' is participating to your work ' + work.name);
      },
      onUnsubscribe(work, user) {
        console.log(user.pseudo + ' is not participating anymore to your work ' + work.name);
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
