<template>
  <div class="modal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper" @click.prevent="close">
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

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-header {
    font-size: 25px;
    color: $primaryText;
    text-align: center;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    width: 650px;
    min-height: 400px;
    padding: 20px 30px;
    background-color: $primaryColor;
    border-radius: 23px;
    // Allow to center the modal
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: space-around;
    transition: all .3s ease;
  }

  .modal-mask {
    width: 100%;
    min-height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-default-button {
    float: right;
  }

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
    width: 80%;
    font-size: 15px;
  }
  .modal-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    font-size: 10px;
  }

</style>
