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
        showModal: false,
      }
    },
    computed: {
      projects() {
        return this.$store.getters['works/all'];
      }
    },
    methods: {
      getWorks() {
        http.get("/works")
          .then(response => {
            this.$store.dispatch('works/setWorks', response.data);
          });
      },
      addWork(work) {
        this.$store.dispatch('works/addWork', work);
      },
      deleteProject(project) {
        this.$store.dispatch('works/removeWork', project);
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
