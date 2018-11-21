<template>
  <div id="projectForm">
    <h1>Project form page</h1>
    <form @submit.prevent="createProject">
      <p>
        <label for="name">name</label>
        <input id="name" v-model="name" type="text" name="name">
      </p>
      <p>
        <label for="desc">Description</label>
        <input id="desc" v-model="desc" type="text" name="desc">
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  </div>
</template>

<script>
  import http from '@/http';

  export default {
    name: 'ProjectForm',
    data() {
      return {
        name: "",
        desc: "",
        password: "",
        userId: 0,
      }
    },
    methods: {
      checkForm: function (e) {
        return true;
      },
      createProject: function () {
        http.post("/works", {
          "name": this.name,
          "desc": this.desc,
          "user_id": this.userId,
        }).then(response => {
          const project = response.data;
          this.$router.push({ name:"workList"})
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
