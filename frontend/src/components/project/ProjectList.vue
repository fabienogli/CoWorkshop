<template>
  <div class="projectList">
    <div v-for="project in projects" class="project-preview-container">
      <div >
        <ProjectPreview :project="project" @deleteProject="deleteProject"/>
      </div>
    </div>
  </div>
</template>
<script>
  import ProjectPreview from '@/components/project/ProjectPreview';
  export default {
    name: "ProjectList",
    props: ['projects'],
    components: {ProjectPreview},
    methods: {
      deleteProject(project) {
        this.$emit('deleteProject', project);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .projectList {
    display: flex;
    justify-content: flex-start;
  }
  .project-preview-container {
    padding: 2px 4px;
    flex: 1;
    max-width: 162px;
  }
</style>
