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
      </div>
      <button slot="footer" class="modal-default-button" @click="createProject">
        OK
      </button>
    </modal>
  </div>
</template>

<script>
  import http from '@/http';
  import Modal from '@/components/Modal'
  let defaultString = {
    default: "",
    type: String,
  };

  export default {
    name: 'ProjectForm',
    components: {
      Modal
    },
    props: {
      header: {
        default: "Create a new Project !",
        type: String
      },
      title: defaultString,
      description: defaultString,
      creator: {
        default: 0,
        type: Number
      }

    },
    data() {
      return {
        top : this.header,
        name: this.title,
        desc: this.description,
        userId: this.creator,
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
      createProject() {
        http.post("/works", {
          "name": this.name,
          "desc": this.desc,
          "user_id": this.userId,
        }).then(response => {
          this.$emit('newProject', response.data);
          this.close();
        })
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
