<template>
  <div id="tagForm">
    <transition name="modal" @keydown.esc="close">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                <h3>Create a new Tag !</h3>
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                  <p>
                    <label for="name">name</label>
                    <input id="name" v-model="name" type="text" name="name">
                  </p>
              </slot>
            </div>

            <div class="modal-footer">
              Créer un tag {{name}}
              <slot name="footer">
                <button class="modal-default-button" @click="createTag">
                  OK
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import http from '@/http';

  export default {
    name: 'TagForm',
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
          this.$emit('newTag', response.data);
          this.close();
        });
        // this.close();
      }
    },
  }
</script>

<style lang="scss">
</style>
