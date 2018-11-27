<template>
  <div id="projectForm">
    <transition name="modal" @keydown.esc="close">
      <div class="modal-mask">
        <div class="modal-wrapper"@click.prevent="close">
          <div class="modal-container" @click.stop="">
            <div class="modal-header">
              <slot name="header">
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
              </slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  let defaultString = {
    default: "",
    type: String,
  };

  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "~@/styles/_variable";

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 20px 30px;
    background-color: $primaryColor;
    border-radius: 23px;
    border: 2px solid $accentColor;
    // Allow to center the modal
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    transition: all .3s ease;

  }
  .modal-mask {
    position: absolute;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
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
  .modal-body {
    padding: 5px 2px;
  }

</style>
