<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <project-list :projects="projects"></project-list>
    <!--<tag-list></tag-list>-->

  </div>
</template>

<script>

  import ProjectList from '@/components/project/ProjectList'
  // import TagList from "@/tag/TagList";

  export default {
    name: 'Home',
    components: {ProjectList},
    data() {
      return {
        msg: 'CoWorkshop'
      }
    },
    computed: {
      projects() {
        return this.$store.getters['works/all'].filter(work => {
          return work.user_id === this.user.id;
        })
      },
      tags() {
        return this.$store.getters['tags/all'].filter(tag => {
          return tag.user_id === this.user.id;
        })
      },
      user() {
        return this.$store.getters['auth/user'];
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
