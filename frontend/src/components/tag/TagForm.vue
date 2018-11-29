<template>
  <div id="tagForm">
    <modal @close="close">
      <h1 class="title" slot="header">Create a new Tag !</h1>
      <div slot="body">
        <div class="input-wrapper">
          <input id="name" placeholder="Enter the tag name" class="input" v-model="name" type="text" name="name">
          <span v-if="error" class="error">The tag name already exists !</span>
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
        error: "",
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
        http.post("/tags", {
          "name": this.name,
        }).then(response => {
          this.close();
        }).catch(() => {
          this.error = true;
        })
      }
    },
    watch: {
      name(newValue, old) {
       this.error = false;
      }
    }
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

  .input-wrapper {
    display: flex;
    flex-direction: column;

    .error {
      color: crimson;
      font-size: 15px;
      padding-bottom: 10px;
    }
  }

</style>
