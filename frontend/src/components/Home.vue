<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link :to="{ name: 'work' }">Créer projet</router-link>
    <router-link :to="{ name: 'workList' }">Liste des projets</router-link>
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
    mounted() {
      //do something after mounting vue instance
      //@TODO to remove, here for debug purpose
      var user = this.$cookies.get("currentUser");
      console.log(user);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
