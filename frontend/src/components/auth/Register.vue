<template>
  <div class="register">
    <form @submit.prevent="register" class="form">

      <div class="form-group" :class="{'has-error': errors.has('pseudo') }">
        <input type="text"
               placeholder="Pseudo"
               class="input pseudo"
               id="pseudo"
               v-validate="'required'"
               name="pseudo"
               v-model.trim="pseudo">
        <span class="error">{{errors.first('pseudo')}}</span>
      </div>


      <div class="form-group" :class="{'has-error': errors.has('email') }">
        <input type="text"
               v-validate="'required|email'"
               placeholder="Email"
               class="input email"
               id="email"
               name="email"
               v-model.trim="email">
        <span class="error">{{errors.first('email')}}</span>
      </div>

      <div class="form-group" :class="{'has-error': errors.has('website')}">
        <input type="text"
               placeholder="Website"
               class="input website"
               id="website"
               v-validate="{regex: /^((?:http(?:s)?\:\/\/)?[a-zA-Z0-9_-]+(?:.[a-zA-Z0-9_-]+)*.[a-zA-Z]{2,4}(?:\/[a-zA-Z0-9_]+)*(?:\/[a-zA-Z0-9_]+.[a-zA-Z]{2,4}(?:\?[a-zA-Z0-9_]+\=[a-zA-Z0-9_]+)?)?(?:\&[a-zA-Z0-9_]+\=[a-zA-Z0-9_]+)*)$/ }"
               name="website"
               v-model.trim="website">
        <span class="error">{{errors.first('website')}}</span>
      </div>


      <div class="form-group" :class="{'has-error': errors.has('password')}">
        <input type="password"
               v-validate="'required'"
               placeholder="Password"
               class="input password"
               id="password"
               name="password"
               v-model.trim="password">
        <span class="error">{{errors.first('password')}}</span>
      </div>

      <div class="form-group" :class="{'has-error': errors.has('password_confirm')}">
        <input type="password"
               v-validate="'required|confirmed:password'"
               placeholder="Confirm password"
               class="input password"
               id="password_confirm"
               name="password_confirm"
               data-vv-as="password"
               v-model.trim="password_confirm">
        <span class="error">{{errors.first('password_confirm')}}</span>
      </div>

      <div class="message">
        Already have an account ?
        <router-link class="login-link" to="/login"> Sign in</router-link>
      </div>

      <div class="submit-container">
        <button type="submit" class="submit button">Register</button>
        <div class="empty"></div>
      </div>
    </form>
  </div>
</template>

<script>
  import {loginAndRedirectTo} from "@/util";
  import env from '@/env';
  import axios from 'axios';

  export default {
    name: "Register",
    data() {
      return {
        email: '',
        pseudo: '',
        website: '',
        password: '',
        password_confirm: '',
      }
    },
    methods: {
      isValidForm() {
        return this.email !== ''
        && this.pseudo !== ''
        && this.website !== ''
        && this.password !== ''
        && this.password_confirm === this.password
        && !this.errors.any();
      },
      register() {
        if (this.isValidForm()) {
          const url = `${env.url}/users`;
          axios.post(url, {
            "email": this.email,
            "pseudo": this.pseudo,
            "password": this.password,
            "password_confirm": this.password_confirm,
            "website": this.website
          }).then((response) => {
            const user = response.data;
            loginAndRedirectTo(user.email, this.password);
          });
        } 
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~@/styles/_variable";

  .register {
    padding: 30px;
    .form {
      padding: 30px;
      border: 1px solid black;
      box-shadow: 10px 10px 10px $accentColor;
      border-radius: 7px;
      display: flex;
      flex-direction: column;
      max-width: 30%;
      margin: auto;


      .form-group {
        flex: 1;
        display: flex;
        flex-direction: column;
        .error {
          flex: 1;
          color: crimson;
          padding-left: 3px;
          padding-bottom: 5px;
        }

        &.has-error {
          .input {
            &:focus {
              box-shadow: 0 0 1px 1px crimson;
            }
          }
        }
      }

      .input {
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

        .login-link {
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
