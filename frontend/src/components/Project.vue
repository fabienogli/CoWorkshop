<template>
  <div id="project">
    <modal @close="close">
      <h1 class="title" slot="header">
        {{project.name}}
      </h1>
      <div slot="body">
        <p>
          <b>Créateur:</b> {{project.user_id}}
          <br/>
          <b>Description:</b> {{project.desc}}
        </p>
        <div v-if="project.users.length > 0" class="participants">
          Participants:
          <div class="participant" v-for="user in project.users">
            <p>
              {{user.pseudo}}
            </p>
          </div>
        </div>
        <div v-if="project.tags.length > 0" class="tags">
          Tags:
          <div class="tags" v-for="tag in project.tags">
            {{tag}}
          </div>
        </div>
        <button v-if="isCreator" @click="update" class="button update">
          Update
        </button>
        <button v-if="!participate" @click="joinWork" class="button create">
          Join the Project
        </button>
      </div>
    </modal>
    <ProjectForm v-if="showModal" @close="showModal = false" :header="project.name" :project="project"/>
  </div>
</template>

<script>
  import Modal from '@/components/Modal';
  import ProjectForm from '@/components/ProjectForm';
  import http from '@/http';

  export default {
    name: "Project",
    components: {Modal, ProjectForm},
    props: [
      'project'
    ],
    data() {
      return {
        showModal: false,
        participants: [],
        tags: [],
        participate: false,
        isCreator : false,
        userId: 0,
      }
    },
    methods: {
      update() {
        this.showModal = true;
      },
      close() {
        this.$emit('close');
        console.log(this.project);
      },
      checkIfParticipate() {
        let users = this.project.users;
        for (let i= 0; i < users.length; i ++) {
          if (users[i].id === this.userId) {
            this.participate = true;
            return;
          }
        }
      },
      joinWork() {
        let addr = "/works/" + this.project.id + "/users";
        console.log(addr);
        http.post(addr, {
          "user_id": this.userId,
        }).then(response => {
          this.close();
        });
      },
    },
    mounted() {
      let user = this.$cookies.get("currentUser");
      this.userId = user.id;
      this.checkIfParticipate();
      this.isCreator = this.userId === this.project.user_id;
    }
  }

</script>

<style lang="scss" scoped>

  .button {
    float: right;
  }
</style>
