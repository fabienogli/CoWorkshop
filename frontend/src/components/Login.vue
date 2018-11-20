<template>
  <div class="login">
    <form @submit.prevent="login">
      <input type="text"
             placeholder="Email"
             class="form-input email"
             id="email"
             v-model.trim="email">

      <input type="password"
             placeholder="Password"
             class="form-input password"
             id="password"
             v-model.trim="password">
      <button type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        errors: [],
      }
    },
    methods: {
      login() {
        console.log('Logging in');
        //Do something to log in
      },
    },
  }
</script>

<style scoped>
</style>
