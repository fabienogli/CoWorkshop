<template>
  <div id="projectPreview">
    <div  class="project container" @click="update">
      <h2>{{project.name}}</h2>
      <div class="modal-body">
        <b>Créateur:</b> {{project.user_id}}
        <br/>
        <b>Description:</b> {{project.desc}}
      </div>
    </div>
    <ProjectForm v-if="showModal" @close="showModal = false" :header="project.name" :title="project.name" :description="project.desc" :creator="project.userId"/>
  </div>
</template>

<script>
  import ProjectForm from '@/components/project/ProjectForm';
  export default {
    name: "ProjectPreview",
    components: {ProjectForm},
    props: [
      'project'
    ],
    data() {
      return {
        showModal: false,
      }
    },
    methods: {
      update() {
        console.log("dans update");
        this.showModal = true;
      }
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
