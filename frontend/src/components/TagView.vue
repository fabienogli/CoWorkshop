<template>
  <div>
    <Tag-list :tet="'list'" :tags="tags" id="test">
      <button slot='action' class="button create" @click="subscribeTag(tag.id)">S'abonner</button>
    </Tag-list>
  </div>
</template>

<script>
  import TagList from '@/components/TagList';
  import http from '@/http';

  export default {
    name: "TagView",
    components: {
      TagList
    },
    data() {
      return {
        tags: [],
      }
    },
    methods: {
      getTags() {
        http.get("/tags")
          .then(response => {
            this.tags = response.data;
          });
      },
    },
    mounted() {
      this.getTags();
    }
  }
</script>

<style scoped>

</style>
