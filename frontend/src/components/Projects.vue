<template>
  <div id="projects">
    <h1>Projects Component</h1>
    <button class="button create" id="show-modal" @click="showModal = true" >Créer un projet</button>
    <ProjectForm v-if="showModal" @close="showModal = false" @newProject="addWork"/>
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
        showModal: false,
      }
    },
    methods: {
      getWorks() {
        http.get("/works")
          .then(response => {
            this.projects = response.data;
          });
      },
      addWork(work) {
        this.projects.push(work);
      },
    },
    mounted() {
      this.getWorks();
    }
  }
</script>

<style lang="scss" scoped>
</style>
