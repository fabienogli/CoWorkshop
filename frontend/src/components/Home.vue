<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link :to="{ name: 'work', params: {} }">Projet</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome  to Your Vue.js App'
    }
  },
  mounted() {
    //do something after mounting vue instance
    let user = {
        token : "token",
        id: 1
    }

    this.$cookies.config('1d')
    this.$cookies.set("currentUser", user)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
