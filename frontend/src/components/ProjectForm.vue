<template>
  <div id="projectForm">
    <transition name="modal" @keydown.esc="close">
      <div class="modal-mask" @click="close">
        <div class="modal-wrapper">
          <div class="modal-container" @click.stop="">

            <div class="modal-header">
              <slot name="header">
                <h3>Create a new Project ! </h3>
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
                <p>
                <label for="name">name</label>
                <input id="name" v-model="name" type="text" name="name">
                </p>
                <p>
                <label for="desc">Description</label>
                <input id="desc" v-model="desc" type="text" name="desc">
                </p>
              </slot>
            </div>

            <div class="modal-footer">
              Créer un Project {{name}}
              <slot name="footer">
                <button class="modal-default-button" @click="createProject">
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
    name: 'ProjectForm',
    data() {
      return {
        name: "",
        desc: "",
        password: "",
        userId: 0,
      }
    },
    methods: {
      checkForm() {
        return true;
      },
      close() {
        this.raz();
        this.$emit('close');
      },
      raz() {
        this.name = "";
        this.desc = "";
        this.password = "";
        this.userId = 0;
      },
      createProject() {
        http.post("/works", {
          "name": this.name,
          "desc": this.desc,
          "user_id": this.userId,
        }).then(response => {
          this.$emit('newProject', response.data);
          this.close();
        })
      }
    },
    mounted() {
      let user = this.$cookies.get("currentUser");
      this.userId = user.id;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
