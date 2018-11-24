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
      this.$subscriber.subscribe('WorkChannel',  1,(message) => {
        console.log('In callback :', message);
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
