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
        <div v-if="users.length > 0" class="participants">
          Participants:
          <div class="participant" v-for="user in project.users">
            <p>
              {{user.pseudo}}
            </p>
          </div>
        </div>
        <div v-if="project.tags.length > 0" class="tag-container">
          <div class="subtitle">Tags:</div>
          <div class="tag" v-for="tag in project.tags">
            {{tag.name}}
          </div>
        </div>
      </div>
      <div slot="footer">
        <div v-if="isCreator" class="test">
          <button  @click="deleteProject" class="button delete">
            Delete
          </button>
          <button  @click="update" class="button update">
            Update
          </button>
        </div>
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
  import ProjectForm from '@/components/project/ProjectForm';
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
        users: [],
      }
    },
    methods: {
      update() {
        this.showModal = true;
      },
      close() {
        this.$emit('close');
      },
      checkIfParticipate() {
        if (this.project.users === undefined) {
          return;
        }
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
        http.post(addr, {
          "user_id": this.userId,
        }).then(response => {
          this.close();
        });
      },
      deleteProject() {
        console.log("deleteProject");
        console.log(this.project);

        let addr = "/works/" + this.project.id;
        http.delete(addr, {})
          .then(response => { //@TODO
            console.log(response);
            this.$emit("deleteProject", project);
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
  @import "~@/styles/_variable";

  .button {
    flex: 1;
  }
  .test {
    display: inline;
  }

  .tag {
    border: 1px solid $accentColor;
    background-color: $accentColor;
    border-radius: 4px;
    padding: 10px 10px;
  }
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
  }
  .subtitle {
    flex: 0 0 100%;
    font-weight: bold;
    padding: 1px ;
  }
</style>
