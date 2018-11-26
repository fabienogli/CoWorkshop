<template>
  <div id="navBar">
    <h1></h1>
    <ul>
      <li v-for="route in routes">
        <router-link active-class="active" v-if="connected" class="custom"
                     :to="{ name: route.name }">{{ route.text }}
        </router-link>
      </li>
      <li class="notification">
        <a class="notification-icon fa fa-bell" @click="openNotifications"></a>
        <span class="badge" v-if="notifCount > 0">{{notifCount}}</span>
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
      openNotifications() {

      }
    },
    computed: {
      connected() {
        return this.$store.getters['auth/token'] !== '';
      },
      notifCount() {
        return 0;
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
        for (let i = 0; i < forbiddenArray.length; i++) {
          if (route.path === forbiddenArray[i]) {
            return
          }
        }
        this.routes.push(route);
      });
    }
  }
</script>

<style lang="scss">

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
    a {
      display: block;
      color: #fff5fd;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      &:hover {
        background-color: #111;
      }
    }
    &:nth-last-child(-n+2) {
      float: right;
    }
  }

  .notification {
    position: relative;

    .badge {
      position: absolute;
      top: 1px;
      right: 1px;
      padding: 2px 5px;
      border-radius: 50%;
      background: red;
      color: white;

    }
  }

  .router-link-exact-active.active {
    background-color: black;
  }

</style>
