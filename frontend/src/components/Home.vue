<template>
  <div class="home">
    <h1 class="title">{{ msg }}</h1>
    <div class="item-container">
      <div class="information">
        My Projects
      </div>
      <project-list :projects="projects"/>
    </div>
    <div class="item-container">
      <div class="information">
        My Subscriptions
      </div>
      <div class="tags-container">
        <div v-for="tag in tags" class="tag-container">
        <div class="tag">
          {{tag.name}}
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '@/http';
  import ProjectList from '@/components/project/ProjectList'
  import TagList from "@/components/tag/TagList";

  export default {
    name: 'Home',
    components: {ProjectList, TagList},
    data() {
      return {
        msg: 'CoWorkshop',
        projects: [],
        user: {},
      }
    },
    computed: {
      tags() {
        return this.$store.getters['subscriptions/all'];
      },
    },
    methods: {
      fetchSubscriptions() {
        let addr = `/users/${this.user.id}`;
        http.get(addr)
          .then(response => {
            this.$store.dispatch('subscriptions/set', response.data.tags);
          });
      },
      fetchWorks() {
        http.get("/works")
          .then(response => {
            this.projects = response.data.filter(work => {
              return work.user_id === this.user.id;
            });
          });
      }
    },
    mounted() {
      this.user = this.$store.getters['auth/user']; //Need to retrieve works -> problem is the user is not set yet
      this.fetchWorks();
      this.fetchSubscriptions();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~@/styles/_variable";

  .home {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
  }
  .title {
    font-size: 50px;
  }
  .tags-container {
    display: flex;
    flex-basis: auto;
    flex-flow: row wrap;
  }
  .information {
    flex: 0 0 100%;
    font-size: 40px;
  }
  .tag-container {
    padding: 2px 2px;
    flex: 1;
  }
  .tag {
    border: 1px solid $accentColor;
    background-color: $accentColor;
    border-radius: 4px;
    padding: 10px 10px;
    color: $primaryColor;
    font-size: 30px;
    text-align: center;
    box-shadow: 5px 8px 16px 0 $primaryLightColor;
  }
  .item-container {
    padding: 10px 10px;
  }
</style>
