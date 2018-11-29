<template>
    <div id="alert" class="alert" @click="">
        <div class="alert-body">
            {{text}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
      text: {
        default: ""
      }
    }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/_variable";
  .alert {
    position: absolute;
    background-color: $primaryDarkColor;
    border-radius: 5px;
    top: 7%;
    right: 3%;
    width: 200px;
    height: 25px;
    color: $capri;
    display: flex;
    padding: 3px;
    flex-flow: column wrap;
    justify-content: space-evenly;
  }
  .alert-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
