<template>
  <div id="project" class="project">
    <h1>{{project.name}}</h1>
    Mis à jour le: {{project.updated_at}}
    <br>
    Créer le : {{project.created_at}}
    <p>
      Créateur: {{project.user_id}}
      Description:
      {{project.desc}}
    </p>
  </div>
</template>

<script>
  export default {
    name: "Project",
    props: [
      'project'
    ],
    data() {
      return {}
    },
    mounted() {

    },
  }

</script>

<style lang="scss" scoped>
  .project {
    /*background-color: #abaf65;*/
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
  .project:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .container {
    padding: 2px 16px;
  }
</style>
