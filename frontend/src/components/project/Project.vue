<template>
  <div id="project">
    <modal @close="close">
      <div slot="header">
        <h1>
          {{project.name}}
        </h1>
      </div>
      <div slot="body">
        <div class="information-container">
          <div class="information label">Creator</div>
          <div class="information">{{project.user.pseudo}}</div>
        </div>
        <div class="information-container">
          <div class="information label">Description</div>
          <div class="information">
            {{project.desc}}
          </div>
        </div>
        <div v-if="project.users.length > 0" class="information-container">
          <div class="information label">Participants</div>
          <div class="participants">
            <div class="item-container" v-for="user in project.users">
              <div class="participant">
                {{user.pseudo}}
              </div>
            </div>
          </div>
        </div>
        <div v-if="project.tags.length > 0" class="information-container">
          <div class="information">
            <div class="label">
              Tags
            </div>
          </div>
          <div class="item-container">
            <div class="tags">
              <div class="tag-container" v-for="tag in project.tags">
                <div class="tag">
                  {{tag.name}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button v-if="!participate" @click="joinWork" class="button create">
          Join
        </button>
        <button v-if="participate" @click="quitWork" class="button quit">
          Leave
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
        isCreator: false,
        userId: 0,
        users: [],
      }
    },
    computed: {
      participate() {
        if (this.project.users === undefined) {
          return false;
        }
        return this.project.users.some( user => user.id === this.userId);
      }
    },
    methods: {
      update() {
        this.showModal = true;
      },
      close() {
        this.$emit('close');
      },
      joinWork() {
        http.post(`/works/${this.project.id}/users`, {
          "user_id": this.userId,
        }).then(response => {
          this.$store.dispatch('works/updateWork', response.data);
          this.close();
        });
      },
      quitWork() {
        http.delete(`/works/${this.project.id}/users/${this.userId}`, {}).then(response => {
          this.$store.dispatch('works/updateWork', response.data);
          this.close();
        });
      },
      deleteProject() {
        let addr = "/works/" + this.project.id;
        http.delete(addr).then(response => {
          //Yeah deleted
        });
      },
    },
    mounted() {
      let user = this.$cookies.get("currentUser");
      this.userId = user.id;
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
    background-color: $capri;
    color: $primaryDarkColor;
    font-size: 18px;
    border-radius: 4px;
    padding: 10px 10px;
  }

  .tag-container {
    padding: 2px 2px;
  }

  .participants {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  .participant {
    text-align: center;
    font-size: 17px;
  }

  .content {
    flex: 1;
  }

  .information-container {
    flex: 1;
    border-radius: 4px;
    padding: 10px 0;
    .label {
      font-size: 22px;
      font-weight: bold;
    }
  }

  .modal-body{
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    text-align: center;
    
  }
  .button-container {
    display: inline;
  }

  .tags{
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  .quit{
    background-color: #f89406;
  }
</style>
