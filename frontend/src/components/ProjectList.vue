<template>
  <div id="projectList">
    <div v-for="project in projects">
      <Project :project="project" />
    </div>
  </div>
</template>
<script>
  import Project from '@/components/Project';
  export default {
    name: "ProjectList",
    props: ['projects'],
    components: {Project},
  }
</script>

<style scoped>
</style>
