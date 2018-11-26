<template>
  <div id="project" class="project container" @click="update">
    <!--Mis à jour le: {{project.updated_at}}-->
    <!--<br>-->
    <!--Créer le : {{project.created_at}}-->
    <p>
      <h2>{{project.name}}</h2>
      <b>Créateur:</b> {{project.user_id}}
      <br/>
      <b>Description:</b> {{project.desc}}
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
    methods: {
    }
  }

</script>

<style lang="scss" scoped>
  .project {
    /*background-color: #abaf65;*/
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    flex: 0 1 24%;
    transition: 0.3s;
    border-radius: 23px;
    border: 2px solid #73AD21;

  }
  .project:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    cursor: pointer;
  }

  .container {
    padding: 2px 16px;
  }

</style>
