<template>
  <div id="tagForm">
    <transition name="modal" @keydown.esc="close">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header">
                Tag
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
          this.$emit('close');
        });
        // this.close();
      }
    },
  }
</script>

<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
