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

      <div class="submit-container">
        <button type="submit" class="submit">Log in</button>
        <div class="empty"></div>
      </div>
    </form>
  </div>
</template>

<script>
  import {loginAndRedirectTo} from "../utll";
  import axios from 'axios';

  export default {
    name: "Register",
    date() {
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
        return email !== ''
          && pseudo !== ''
          && password !== ''
          && password_confirm !== ''
          && password === password_confirm;
      },
      register() {
        if(this.isValidForm()) {
          axios.post('/users', {
            "email": this.email,
            "pseudo": this.pseudo,
            "password": this.password,
            "password_confirm": this.password_confirm,
            "website": "website"
          }).then((response) => {
            const user = response.data;
            loginAndRedirectTo(user.email, this.password);
          });
        }
      }
    }
  }
</script>

<style scoped>

</style>
