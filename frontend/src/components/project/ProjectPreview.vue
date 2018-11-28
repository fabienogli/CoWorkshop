<template>
  <div id="projectPreview" class="project-preview">
    <div  class="project container" @click="showModal = true">
      <div class="title"><h1 class="no-margin">{{project.name}}</h1></div>
        <div class="information creator">
          <div class="information label">Creator:</div> {{project.user.pseudo}}
        <div class="information creator">
          <div class="information label">Description:</div> {{project.desc}}
        </div>
      </div>
    </div>
    <Project v-if="showModal" @close="showModal = false" @deleteProject="deleteProject" :project="project"/>
  </div>
</template>

<script>
  import Project from '@/components/project/Project';
  export default {
    name: "ProjectPreview",
    components: { Project},
    props: [
      'project'
    ],
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      deleteProject(project) {
        this.$emit('deleteProject', project)
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "~@/styles/_variable";

  .project-preview {

  }
  .project:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    cursor: pointer;
  }

  .container {
    padding: 4px 16px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 23px;
    border: 2px solid $accentColor;
  }
</style>
