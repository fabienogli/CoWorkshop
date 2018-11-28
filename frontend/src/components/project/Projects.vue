<template>
  <div id="projects" class="projects">
    <h1>Projects Component</h1>
    <ProjectForm v-if="showModal" @close="showModal = false" @newProject="addWork"/>
    <ProjectList :projects="projects" @deleteProject="deleteProject"/>
    <br/>
    <button class="button create" id="show-modal" @click="showModal = true" >Create a project</button>
  </div>
</template>

<script>
  import ProjectList from '@/components/project/ProjectList';
  import ProjectForm from '@/components/project/ProjectForm';
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
        work.user = this.$store.getters['auth/user'];
        this.projects.push(work);
      },
      deleteProject(project) {
        this.projects.splice(this.projects.indexOf(project), 1);
      }
    },
    mounted() {
      this.getWorks();
    }
  }
</script>

<style lang="scss" scoped>
  .projects {
    height: 100%;
    width: 100%;
  }
</style>
