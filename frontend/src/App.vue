<template>
  <div class="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";

  export default {
    name: 'App',
    components: {
      NavBar,
    },
  }
</script>

<style lang="scss">
.app {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
