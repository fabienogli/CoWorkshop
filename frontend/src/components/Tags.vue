<template>
  <div id="tags">
    <button class="button create" id="show-modal" @click="showModal = true" >Créer un tag</button>
    <TagForm v-if="showModal" @close="showModal = false" @newTag="addTag"/>
    <Tag-list :tags="tags"/>
  </div>
</template>

<script>
  import TagList from '@/components/TagList';
  import TagForm from '@/components/TagForm';
  import http from '@/http';

  export default {
    name: "Tags",
    components: {
      TagList,
      TagForm,
    },
    data() {
      return {
        showModal: false,
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
      addTag(tag) {
          this.tags.push(tag);
      },
    },
    mounted() {
      this.getTags();
    },
  }
</script>

<style scoped>
</style>
