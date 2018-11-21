<template>
  <div id="navBar">
    <h1></h1>
    <ul>
      <li v-for="route in routes"><router-link class="custom" :to="{ name: route.page }">{{route.text}}</router-link></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {
        routes: [
          {
            id: 0,
            text: 'Home',
            page: 'home',
          },
          {
            id: 1,
            text: 'Create Project',
            page: 'work',
          },
          {
            id: 2,
            text: 'Project List',
            page: 'workList',
          },
        ],
      }
    },
  }
</script>

<style scoped>

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #40a6d1;
  }

  li {
    float: left;
    display: inline;
  }

  li a {
    display: block;
    color: #fff5fd;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  li a:hover {
    background-color: #111;
  }

</style>
