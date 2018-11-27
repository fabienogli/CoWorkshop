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
        <TagInput :usedTags="project.tags" ref="tagInput"/>
      </div>
      <button v-if="project.userId==0" slot="footer" class="modal-default-button button create" @click="create">
        Create
      </button>
      <button v-if="project.userId!=0" slot="footer" class="modal-default-button button create" @click="update">
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
            userId: 0,
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
        tags: this.project.tags,
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
          "tags": this.tags,
        }).then(response => {
          this.$emit('newProject', response.data);
          this.close();
        });
      },
      update() {
        console.log("dans Update ProjectForm");
        console.log(this.$refs.tagInput.getTags());

        // let addr = "/works/" + this.userId + "/users";
        // let tags_id = [];
        // this.tags.forEach(tag => {
        //   tags_id.push(tag.id);
        // });
        // http.post(addr, {
        //   "tags_id": this.tags_id,
        // }).then(response => {
        //   // this.$emit('newProject', response.data);
        //   this.close();
        // });
      },
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
