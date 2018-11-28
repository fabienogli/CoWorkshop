<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    My Projects
    <project-list :projects="projects"></project-list>
    <div v-for="tag in tags" class="tag-container">
      <div class="information">
        My Tags
      </div>
      <div class="tag">
        {{tag.name}}
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
        msg: 'CoWorkshop'
      }
    },
    computed: {
      projects() {
        let projects = this.$store.getters['works/all'];
        return this.$store.getters['works/all'].filter(work => {
          return work.user_id === this.user.id;
        })
      },
      tags() {
        return this.$store.getters['subscriptions/all'];
      },
      user() {
        return this.$store.getters['auth/user'];
      }
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
