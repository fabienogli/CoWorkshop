<template>
  <div id="tagList" class="tag-list">
    <table class="table">
      <tr>
        <th class="row label">Nom</th>
        <th class="row label">Created At</th>
        <th class="row label">Updated At</th>
        <th class="row label">Actions</th>
      </tr>
      <tr class="table-content" v-for="tag in tags">
        <td class="row">{{tag.name}}</td>
        <td class="row">{{tag.created_at}}</td>
        <td class="row">{{tag.updated_at}}</td>
        <td class="row"><button :class="['button', design]" @click="action(tag)">{{button}}</button></td>
      </tr>
    </table>
  </div>
</template>
<script>
  import http from '@/http';
  export default {
    name: "TagList",
    props: ['tags', 'button', 'design'],
    methods: {
      action(tag) {
        this.$emit('action', tag);
      },

    },
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/_variable";

  .table {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  .row {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .table-content:nth-child(even) {
    background-color: $primaryLightColor;
  }

  .table-content:hover {
    background-color: $primaryColor;
  }

  .label {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: $accentColor;
    color: $secondaryText;
  }
  .tag-list {
    padding: 7px;
  }
</style>
