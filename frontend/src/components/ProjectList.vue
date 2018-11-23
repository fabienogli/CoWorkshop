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
      this.getWorks();

      this.$socket.onopen(() => {
        const msg = {
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'subscribers',
          }),
        };

        this.$socket.send(JSON.stringify(msg));
      });
      this.$options.sockets.onmessage = (data) => console.log(data);
      this.$options.sockets.subscribers = (data) => console.log(data);
    }
  }
</script>

<style scoped>
</style>
