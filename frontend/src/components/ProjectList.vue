<template>
  <div id="projectList">
    <div v-for="project in projects">
      <Project :project="project" />
    </div>
  </div>
</template>
<script>
  import Project from '@/components/Project';
  import http from '@/http';
  export default {
    name: "ProjectList",
    components: {Project},
    component: {
      Project,
    },
    data() {
      return {
        projects: [],
      }
    },
    methods:{
      getWorks() {
        http.get("/works")
          .then(response => {
            this.projects = response.data;
          });
      }
    },
    mounted() {
      this.$subscriber.subscribe('WorkChannel', (message) => {
        console.log('subscribed');
        console.log(message);
      })
    }
  }
</script>

<style scoped>
</style>
