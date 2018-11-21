<!-- source :
https://monterail.github.io/vuelidate/#sub-data-nesting
-->
<template>
    <div>
        <h1>Project form page</h1>
        <form
          @submit="checkForm"
              action="https://localhost:3000/works/"
          method="post"
        >
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>

          <p>
            <label for="pseudo">Pseudo</label>
            <input
              id="pseudo"
              v-model="pseudo"
              type="text"
              name="pseudo"
            >
          </p>
          <p>
            <label for="desc">Description</label>
            <input
              id="desc"
              v-model="desc"
              type="text"
              name="desc"
            >
          </p>
          <p>
            <input
              type="submit"
              value="Submit"
            >
          </p>
      </form>
    </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
export default {

  name: 'ProjectForm',
  data () {
    return {
      errors: [],
      pseudo: "",
      desc: "",
      password: ""
    }
  },
  validations: {
      pseudo:{
          required,
          minLength: minLength(4)
      },
      password: {
          required,
          minLength: minLength(4)
      }
  },
  methods: {
    checkForm: function(e) {
       //  if (this.name && this.pseudo) {
       //   return true;
       // }
       //
       // this.errors = [];
       //
       // if (!this.email) {
       //   this.errors.push('Email required.');
       // }
       // if (!this.password) {
       //   this.errors.push('password required.');
       // }
       return true;
       e.preventDefault();
    }
},
mounted() {
  console.log("Dans ProjectUser")
  //do something after mounting vue instance
  let user = this.$cookies.get("currentUser")
  console.log(user)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
