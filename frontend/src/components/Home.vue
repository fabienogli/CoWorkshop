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
    mounted() {
      this.$subscriber.subscribe('WorkChannel',  1, (message) => {
        console.log('In callback :', message);
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
