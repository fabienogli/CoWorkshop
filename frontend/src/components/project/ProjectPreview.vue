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
    padding: 8px 8px;
  }
  .project:hover {
    box-shadow: 5px 12px 24px 6px $primaryLightColor;
    cursor: pointer;
  }

  .container {
    padding: 4px 16px;
    box-shadow: 4px 4px 8px 3px $primaryLightColor;
    transition: 0.3s;
    border-radius: 23px;
  }

</style>
