<template>
  <div id="projectForm">
    <modal @close="close">
      <h1 slot="header" class="title">{{top}}</h1>
      <div slot="body">
        <div class="name">
          <label for="name"><h2>Name</h2></label>
          <input class="input" id="name" v-model="name" type="text" name="name">
        </div>
        <div class="description">
          <label for="desc"><h3>Description</h3></label>
          <input class="input" id="desc" v-model="desc" type="text" name="desc">
        </div>
        <TagInput :tags="project.tags" ref="tagInput"/>
      </div>
      <button v-if="project.userId==0" slot="footer" class="modal-default-button button create" @click="create">
        Create
      </button>
      <button v-if="project.userId!=0" slot="footer" class="modal-default-button button create" @click="update">
        Update
      </button>
    </modal>
  </div>
</template>

<script>
  import http from '@/http';
  import Modal from '@/components/Modal';
  import TagInput from '@/components/tag/TagInput';

  export default {
    name: 'ProjectForm',
    components: {
      Modal,
      TagInput
    },
    props: {
      header: {
        default: "Create a new Project !",
        type: String
      },
      project: {
        default: function () {
          return {
            name: "",
            desc : "",
            userId: 0,
            tags: [],
          }
        },
      },
    },
    data() {
      return {
        top : this.header,
        name: this.project.name,
        desc: this.project.desc,
        userId: this.project.user_id,
        tags: this.project.tags,
      }
    },
    watch: {
      name(newValue, old) {
        if (newValue === "") {
          this.top = "Project title";
          return;
        }
        this.top = newValue;
      },
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
        this.userId = 0;
      },
      create() {
        http.post("/works", {
          "name": this.name,
          "desc": this.desc,
          "user_id": this.userId
        }).then(response => { //@TODO notify user
          let project = response.data;
          let tags = this.$refs.tagInput.getTags();
          project.tags = this.saveTags(project.id, tags);
          this.$emit('newProject', project);
          this.close();
        });
      },
      update() {
        let addr = "/works/" + this.project.id;
        http.put(addr, {
          "name": this.name,
          "desc": this.desc,
        }).then(response => { //@TODO notify user
          let project = response.data;
          let diff = this.diffBetween(project.tags, this.$refs.tagInput.getTags());
          project.tags = this.saveTags(project.id, diff.new);
          diff.old.forEach(tag => {
              let addr = "/works/" + project.id + "/tags/" + tag.id;
              http.delete(addr, {}).then(e => { //@TODO notify user
                console.log(e)});
          });
          this.$emit('updateProject', project);
          this.close();
        });
      },
      diffBetween(_before, after) {
        let newItems = after.filter(it => _before.indexOf(it) === -1);
        let oldItems = _before.filter(it => after.indexOf(it) === -1);
        return {
          new: newItems,
          old: oldItems,
        }
      },
      saveTags(projectId, tags) {
        if (tags.length < 1) {
          return [];
        }
        let tagsId = tags.map(tag => {
          return tag.id;
        });
        let addr = "/works/" + projectId + "/tags";
        http.post(addr, {
          "tag_id": tagsId,
        });
        return tags
      },
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
