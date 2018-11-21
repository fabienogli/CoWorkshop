<template>
  <div id="project">
    <h1>Composant Projet</h1>
    <h3>Projet </h3><span>{{project.name}}</span> Mis à jour le: {{project.updated_at}}
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

<style scoped>

</style>
