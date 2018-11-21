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
  import axios from 'axios';
  import env from '@/env';

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
          axios.post(`${env.url}/login`, {
           auth: {
             "email": this.email,
             "password": this.password
           }
          }).then((response) => {
            const auth = response.data;
            this.$store.dispatch('auth/setTokenAndUserId', auth);
            this.$cookies.set("currentUser", {
              token: auth.token,
              id: auth.user.id,
            });
            this.$router.push({ name: "home" });
          }).catch((error) => {
            console.log(error);
          })
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
