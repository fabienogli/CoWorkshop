<template>
  <div class="login">
    <form @submit.prevent="login" class="form">
      <input type="text"
             placeholder="Email"
             class="input email"
             id="email"
             v-model.trim="email">

      <input type="password"
             placeholder="Password"
             class="input password"
             id="password"
             v-model.trim="password">
      <div class="submit-container">
        <button type="submit" class="submit">Log in</button>
        <div class="empty"></div>
      </div>
    </form>
  </div>
</template>

<script>
  // TODO irindul 2018-11-21 : Handle login errors
  // TODO irindul 2018-11-21 : Validation


  import {loginAndRedirectTo} from "@/utll";

  export default {
    name: "Login",
    data() {
      return {
        email: "test@test.com",
        password: "azerty",
        errors: [],
      }
    },
    methods: {
      login() {
        if (this.email !== '' && this.password !== '') {
          loginAndRedirectTo(this.email, this.password);
        }
      },
    },
  }
</script>

<style lang="scss">
  .login {
    //margin: auto;
    max-width: 40%;
    max-height: 20%;
    padding: 3px;
    .form {
      padding-bottom: 2px;
      display: flex;
      flex-direction: column;
      max-width: 50%;
      margin: auto;

      .email {
        flex: 1;
      }

      .password {
        flex: 1;
      }

      .submit-container {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .submit {
          flex: 1
        }
        .empty {
          flex: 4
        }
      }
    }
  }
</style>
