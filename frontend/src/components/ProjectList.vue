<template>
  <div class="projectList">
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

<style lang="scss" scoped>
  .projectList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
