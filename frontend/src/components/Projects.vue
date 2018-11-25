<template>
  <div id="projects">
    <h1>Projects Component</h1>
    <button class="button create" id="show-modal" @click="showModal = true" >Créer un projet</button>
    <ProjectForm v-if="showModal"/>
    <ProjectList :projects="projects"/>
  </div>
</template>

<script>
  import ProjectList from '@/components/ProjectList';
  import ProjectForm from '@/components/ProjectForm';
  import http from '@/http';

  export default {
    name: "Projects",
    components: {ProjectList, ProjectForm},
    data() {
      return {
        projects: [],
        showModal: true,
      }
    },
    methods: {
      getWorks() {
        http.get("/works")
          .then(response => {
            this.projects = response.data;
          });
      },
      addTag(work) {
        console.log("Dans add taf");
        this.tags.push(work);
      },
    },
    mounted() {
      this.getWorks();
    }
  }
</script>

<style scoped>

</style>
