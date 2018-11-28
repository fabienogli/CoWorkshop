<template>
  <div id="tagForm">
    <modal @close="close">
      <h1 class="title" slot="header">Create a new Tag !</h1>
      <div slot="body">
        <div>
          <input id="name" placeholder="Enter the tag name" class="input" v-model="name" type="text" name="name">
        </div>
      </div>
      <button slot="footer" class="button create" @click="createTag">
        OK
      </button>
    </modal>
  </div>
</template>

<script>
  import http from '@/http';
  import Modal from '@/components/Modal';

  export default {
    name: 'TagForm',
    components: {
      Modal
    },
    data() {
      return {
        name: "",
      }
    },
    methods: {
      checkForm: function (e) {
        return true;
      },
      close() {
        this.raz();
        this.$emit('close');
      },
      raz() {
        this.name = "";
      },
      createTag() {
        // this.$emit('newTag');
        //
        http.post("/tags", {
          "name": this.name,
        }).then(response => {
          let tag = response.data;
          this.$store.dispatch('tags/addTag', tag);
          this.$store.dispatch('availableTags/add', tag);
          this.close();
        });
      }
    },
  }
</script>

<style lang="scss">
  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .button {
    flex: 1;
  }
  .modal-container {
    align-items: center;
    flex-direction: column;

  }

</style>
