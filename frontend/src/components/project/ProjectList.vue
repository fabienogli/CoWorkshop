<template>
  <div class="projectList">
    <div v-for="project in projects">
      <ProjectPreview :project="project" @deleteProject="deleteProject"/>
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
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
