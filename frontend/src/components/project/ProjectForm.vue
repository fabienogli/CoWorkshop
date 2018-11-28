<template>
  <div id="projectForm">
    <modal @close="close">
      <h1 slot="header" class="title">{{top}}</h1>
      <div slot="body" class="modal-body">
        <div class="input-container">
          <input class="input" placeholder="Name" id="name" v-model="name" type="text" name="name">
        </div>
        <div class="input-container">
          <input class="input" placeholder="Description" id="desc" v-model="desc" type="text" name="desc">
        </div>
        <TagInput :tags="tags" ref="tagInput"/>
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
       // tags: this.project.tags,
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
    computed: {
      tags() {
        return JSON.parse(JSON.stringify(this.project.tags));
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
        this.userId = 0;
      },
      create() {
        http.post("/works", {
          "name": this.name,
          "desc": this.desc,
          "user_id": this.userId
        }).then(response => {
          let project = response.data;
          let tags = this.$refs.tagInput.getTags();
          project.tags = this.saveTags(project.id, tags);
          project.users = [];
          this.$emit('newProject', project);
          this.close();
        });
      },
      saveTags(projectId, tags) {
        let tagsId = tags.map(tag => {
          return tag.id;
        });
        let addr = "/works/" + projectId + "/tags";
        http.post(addr, {
          "tag_id": tagsId,
        });
        return tags
      },
      update() {
        let addr = "/works/" + this.project.id;
        http.put(addr, {
          "name": this.name,
          "desc": this.desc,
        }).then(response => { //@TODO notify user
          const project = response.data;
          const oldTags = project.tags;
          const oldTagsId = oldTags.map(tag => tag.id);
          const newTags = this.$refs.tagInput.getTags();
          const newTagsId = newTags.map(tag => tag.id);

          const toRemove = this.diff(oldTagsId, newTagsId);
          const toAdd = this.diff(newTagsId, oldTagsId);

          toRemove.forEach(tagId => {
            http.delete(`/works/${project.id}/tags/${tagId}`)
              .then(() => { /* Yeah */ });
          });

          http.post(`/works/${project.id}/tags/`, {
            tag_id: toAdd,
          }).then(() => { /* Yeah */});

          project.tags = newTags;
          this.$store.dispatch('works/updateWork', project);
          this.close();
        }).catch((error) => {
          console.log(error);
        })
      },
      diff(first, second) {
        return first.filter(it => second.indexOf(it) === -1);
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

  .input {
    width: 80%;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
