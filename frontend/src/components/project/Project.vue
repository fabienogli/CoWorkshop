<template>
  <div id="project">
    <modal @close="close">
      <div class="title" slot="header">
        <h1 class="no-margin">
          {{project.name}}
        </h1>
      </div>
      <div slot="body">
        <div class="information creator">
          <div class="information label">Creator</div>
          {{project.user.pseudo}}
        </div>
        <div class="information creator">
          <div class="information label">Description</div>
          {{project.desc}}
        </div>
        <div v-if="project.users.length > 0" class="participants-container information">
          <div class="information label">Participants</div>
          <div class="participants">
            <div class="item-container" v-for="user in project.users">
              <div class="participant">
                {{user.pseudo}}
              </div>
            </div>
          </div>
        </div>
        <div v-if="project.tags.length > 0" class="tags-container">
          <div class="information">
            <div class="label">
              Tags
            </div>
          </div>
          <div class="item-container" v-for="tag in project.tags">
            <div class="tag">
              {{tag.name}}
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button v-if="!participate" @click="joinWork" class="button create">
          Join the Project
        </button>
        <div v-if="isCreator" class="button-container">
          <button  @click="update" class="button update">
            Update
          </button>
          <button  @click="deleteProject" class="button delete">
            Delete
          </button>
        </div>

      </div>
    </modal>
    <ProjectForm v-if="showModal" @close="showModal = false" :header="project.name"
                 :project="project"/>
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
        isCreator: false,
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
        for (let i = 0; i < users.length; i++) {
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
        http.delete(addr).then(response => {
          //Yeah deleted
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

  .tag {
    border: 1px solid $accentColor;
    background-color: $accentColor;
    border-radius: 4px;
    padding: 10px 10px;
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    text-align: center;
  }

  .participants {
    display: flex;
    flex-direction: row;
  }

  .information {
    flex: 0 0 100%;
  }
  .button-container {
    display: inline;
  }
</style>
