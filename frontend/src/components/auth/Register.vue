<template>
  <div class="register">
    <form @submit.prevent="register" class="form">

      <input type="text"
             placeholder="Pseudo"
             class="input pseudo"
             id="pseudo"
             v-model.trim="pseudo">

      <input type="text"
             placeholder="Email"
             class="input email"
             id="email"
             v-model.trim="email">

      <input type="text"
             placeholder="Website"
             class="input website"
             id="website"
             v-model.trim="website">

      <input type="password"
             placeholder="Password"
             class="input password"
             id="password"
             v-model.trim="password">

      <input type="password"
             placeholder="Password"
             class="input password"
             id="password_confirm"
             v-model.trim="password_confirm">

      <div>
        Already have an account ?
        <router-link  class="login-link" to="/login"> Sign in now !</router-link>
      </div>

      <div class="submit-container">
        <button type="submit" class="submit">Register</button>
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
          && this.password !== ''
          && this.password_confirm !== ''
          && this.password === this.password_confirm;
      },
      register() {
        if(this.isValidForm()) {
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
        } else {
          console.error('not valid');
        }
      }
    }
  }
</script>

<style scoped>

</style>
