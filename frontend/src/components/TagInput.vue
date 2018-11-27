<template>
  <div id="tagInput">
    <div class="tags">
      <label><h3>Tags</h3></label>
      <div class="input input-container">
        <div class="tag-selected" v-for="tag in tags">
          {{tag.name}} <i class="fas fa-times" @click="remove(tag)"></i>
        </div>
        <input class="tag-input" v-model="search" @blur="inputBlur" @focus="focus = true" @keydown.enter="select('clickonenter')" @keydown.down.prevent="selected ++">
      </div>
      <div class="input" v-if="focus && dbTags.length > 0">
        <div class="item" v-for="(tag, index) in matches" @click.prevent="select(tag)" >
          {{tag.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '@/http';

  export default {
    name: "TagInput",
    props: {
      usedTags: function () {
        return {
          default: [],
          type: Array,
        }
      }
    },
    data() {
      return {
        dbTags: [],
        search: '',
        selected: -1,
        test: "Tag",
        tags: [],
        focus: false,
      }
    },
    methods: {
      select(tag) {
        this.search = "";
        this.swap(tag, this.dbTags, this.tags);
        this.$emit('add', tag);
      },
      remove(tag) {
        this.swap(tag, this.tags, this.dbTags);
        this.$emit('remove', tag);
      },
      swap(tag, from, to) {
        let index = from.indexOf(tag);
        if (index < 0) {
          return;
        }
        to.push(tag);
        from.splice(index, 1);
      },
      inputBlur() {
        let self = this;
        setTimeout(function(){
          self.focus = false;
        }, 250);
      },
    },
    computed: {
      matches() {
        return this.dbTags.filter((obj) => {
          return obj.name.indexOf(this.search) >= 0
        });
      }
    },
    mounted() {
      window.addEventListener('keydown', (e) => {
        let key = e.which || e.keyCode;
      });
      http.get("/tags")
        .then(response => {
          this.dbTags = response.data;
        });
    },
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/_variable";

  .dropdown {
    border: 1px solid $lightGrey;
    padding: 5px;
    border-radius: 3px;
  }
  .item:hover {
    background-color: $accentColor;
    cursor: pointer;
  }
  .input-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: stretch;
  }
  .tag-selected {
    /*flex: 1;*/
    border: 1px solid $accentColor;
    border-radius: 4px;
    padding: 10px 10px;
  }
  .tag-input {
    border-radius: 4px;

  }
  .tag-input:focus {
  }
</style>
