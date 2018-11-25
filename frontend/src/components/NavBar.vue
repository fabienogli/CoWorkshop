<template>
  <div id="navBar">
    <h1></h1>
    <ul>
      <li v-for="route in routes">
        <router-link v-if="connected" class="custom" :to="{ name: route.name }">{{ route.name }}</router-link>
      </li>
      <li>
        <a @click="out" href="#">
          Logout
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {logout} from "@/util";
  import {tokenExists} from "@/router";

  let forbiddenArray = [
    '/tags/new',
    '/works/new'
  ];

  export default {
    name: "NavBar",
    data() {
      return {
        routes: [],
      }
    },
    methods: {
      out() {
        logout();
      },
    },
    computed: {
      connected() {
        return this.$store.getters['auth/token']  !== '';
      }
    },
    mounted() {
      //Get the routers routes
      this.$router.options.routes.forEach(route => {
        if (route.meta === undefined) {
          return;
        }
        if (route.meta.guest !== undefined) {
          return
        }
        for (let i = 0; i < forbiddenArray.length; i ++) {
          if (route.path === forbiddenArray[i]) {
            return
          }
        }
        this.routes.push(route);
      });
    }
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
