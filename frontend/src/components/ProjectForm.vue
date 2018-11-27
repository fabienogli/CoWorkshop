<template>
  <div id="projectForm">
    <modal @close="close">
      <h1 slot="header" class="title">{{top}}</h1>
      <div slot="body">
        <div class="name">
          <label for="name"><h2>Name</h2></label>
          <input class="input" id="name" v-model="name" type="text" name="name">
        </div>
        <div class="description">
          <label for="desc"><h3>Description</h3></label>
          <input class="input" id="desc" v-model="desc" type="text" name="desc">
        </div>
        <TagInput :tags="project.tags" @add="addTag" @remove="removeTag"/>
      </div>
      <button v-if="userId===0" slot="footer" class="modal-default-button button create" @click="create">
        OK
      </button>
      <button v-if="userId!==0" slot="footer" class="modal-default-button button create" @click="update">
        Update
      </button>
    </modal>
  </div>
</template>

<script>
  import http from '@/http';
  import Modal from '@/components/Modal';
  import TagInput from '@/components/TagInput';

  export default {
    name: 'ProjectForm',
    components: {
      Modal,
      TagInput
    },
    props: {
      header: {
        default: "Create a new Project !",
        type: String
      },
      project: {
        default: function () {
          return {
            name: "",
            desc : "",
            userId: {
              default: 0,
              type: Number
            },
            tags: [],
          }
        },
      },
    },
    data() {
      return {
        top : this.header,
        name: this.project.name,
        desc: this.project.desc,
        userId: this.project.user_id,
        tags: [],
      }
    },
    watch: {
      name(newValue, old) {
        if (newValue === "") {
          this.top = "Project title";
          return;
        }
        this.top = newValue;
      },
    },
    methods: {
      onChildUpdate(value) {
        console.log(value);
      },
      checkForm() {
        return true;
      },
      close() {
        this.raz();
        this.$emit('close');
      },
      raz() {
        this.name = "";
        this.desc = "";
        this.userId = 0;
      },
      create() {
        http.post("/works", {
          "name": this.name,
          "desc": this.desc,
          "user_id": this.userId,
        }).then(response => {
          this.$emit('newProject', response.data);
          this.close();
        });
      },
      update() {
        console.log("dans update de project");
        console.log(this.getTags())
      },
      addTag(e) {
        console.log("dans projectForm dans add tag");
        this.tags.push(e);
        console.log(this.tags);
      },
      removeTag(e) {
        let index = this.tags.indexOf(e);
        if (this.tags.length === 1) {
          this.tags = [];
          return;
        }
        this.tags.slice(index, 1);
      }
    },
    mounted() {
      let user = this.$cookies.get("currentUser");
      this.userId = user.id;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
