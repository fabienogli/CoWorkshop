<template>
  <div class="login">
    <form @submit.prevent="login" class="form">
      <div v-for="error in formErrors" class="errors">
        {{error}}
      </div>
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

      <div class="message">
        Don't have an account ?
        <router-link  class="register-link" to="/register"> Register now</router-link>
      </div>
      <div class="submit-container">
        <button type="submit" class="submit button">Log in</button>
        <div class="empty"></div>
      </div>
    </form>
  </div>
</template>

<script>
  // TODO irindul 2018-11-21 : Handle login errors
  // TODO irindul 2018-11-21 : Validation

  import {loginAndRedirectTo} from "@/util";

  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        formErrors: [],
      }
    },
    methods: {
      isValidForm() {
        return this.email !== '' && this.password !== '';
      },
      login() {
        if (this.isValidForm()) {
          loginAndRedirectTo(this.email, this.password)
            .catch((error) => {
              if (error.response) {
                if (error.response.status === 404) {
                  this.formErrors.push('Invalid username/password, check the credentials');
                }
              }
            })
        }
      },
      resetFormErrors() {
        this.formErrors = [];
      }
    },
    watch: {
      email() {
        this.resetFormErrors();
      },
      password() {
        this.resetFormErrors();
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/styles/_variable";
  .login {
    padding: 30px;
    .errors {
      font-size: 18px;
      color: #f44336;
      padding-bottom: 5px;
    }
    .form {
      padding: 30px;
      border: 1px solid black;
      box-shadow: 10px 10px 10px $accentColor;
      border-radius: 7px;
      display: flex;
      flex-direction: column;
      max-width: 30%;
      margin: auto;

      .email, .password {
        flex: 1;
        border: 1px solid $lightGrey;
        padding: 5px;

        border-radius: 5px;
        outline-width: 0;
        min-height: 30px;
        font-size: 15px;
        margin: 3px;
        &:focus {
          box-shadow: 0 0 1px 1px $accentColor;
        }
      }

      .message {
        padding: 5px;
        font-size: 18px;

        .register-link {
          color: #008CBA;
          text-decoration: none;
        }
      }

      .submit-container {
        flex: 1;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-around;
        .submit {
          flex: 1;

          padding: 10px;
          background-color: $accentColor;
        }
        .empty {
          flex: 4
        }
      }
    }
  }
</style>
