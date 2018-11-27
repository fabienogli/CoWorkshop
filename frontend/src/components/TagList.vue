<template>
  <div id="tagList">
    <table>
      <tr>
        <th>Nom</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th/>
      </tr>
      <tr v-for="tag in tags">
        <td>{{tag.name}}</td>
        <td>{{tag.created_at}}</td>
        <td>{{tag.updated_at}}</td>
      </tr>
    </table>
  </div>
</template>
<script>

  export default {
    name: "TagList",
    props: ['tags'],
    data() {
      return {
      }
    },
    methods: {
    },
  }
</script>

<style lang="scss" scoped>
  table {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }
</style>
