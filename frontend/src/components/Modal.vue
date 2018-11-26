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

</style>
