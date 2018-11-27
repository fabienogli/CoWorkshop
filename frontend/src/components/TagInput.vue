<template>
  <div id="tagInput">
    <div class="tags">
      <label><h3>Tags</h3></label>
      <div class="input input-container" @click="setFocus">
        <div class="tag-selected" v-for="tag in tags">
          {{tag.name}} <i class="fas fa-times" @click="remove(tag)"></i>
        </div>
        <input class="tag-input" ref="input"
               v-model="search"
               @focus="focus = true"
               @blur="inputBlur"
               @keydown.enter="keySelect" @keydown.tab.prevent="keySelect"
               @keyup.up.prevent="up" @keyup.down.prevent="down" @keyup.delete="deleteTag"
        >
      </div>
      <div class="input" v-if="focus && dbTags.length > 0">
        <div :class="{item: true, selected: index === selected}" v-for="(tag, index) in matches"
             @mousedown.prevent="select(tag)"
             @mouseover="setSelected(index)"
        >
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
      tags: {
        default: function() {
            return [];
        }
      },
    },
    data() {
      return {
        dbTags: [],
        search: '',
        selected: 0,
        focus: false,
      }
    },
    methods: {
      keySelect() {
        let matches = this.filterTag();
        this.select(matches[this.selected]);
      },
      select(tag) {
        this.search = "";
        this.swap(tag, this.dbTags, this.tags);
        this.setFocus()
      },
      remove(tag) {
        this.swap(tag, this.tags, this.dbTags);
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
      getTags() {
        return this.tags;
      },
      setFocus() {
        this.focus = true;
        this.$refs.input.focus();
      },
      filterTag() {
        return this.dbTags.filter((tag) => {
          return tag.name.indexOf(this.search) >= 0
        });
      },
      down() {
        if (this.selected === this.dbTags.length - 1) {
          return;
        }
        this.selected ++;
      },
      up() {
        if (this.selected === -1) {
          return;
        }
        this.selected --;
      },
      setSelected(index) {
        this.selected = index;
        this.setFocus();
      },
      deleteTag() {
        let lastTag = this.tags.length - 1;
        if (this.search !== "" && lastTag > -1) {
          return;
        }
        this.remove(this.tags[lastTag]);
      }
    },
    computed: {
      matches() {
        return this.filterTag();
      }
    },
    mounted() {
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
  .item.selected{
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
    padding: 10px 10px;
    -webkit-appearance: none;
    border: none;

  }
  .tag-input:focus {
    outline: none;
  }
</style>
