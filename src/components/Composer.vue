<template>
  <section class="hero is-large">
    <div id="toolbar" class="columns">
        <b-field class="column">
            <b-input v-model="editingArticle.title" placeholder="Article Title"></b-input>
        </b-field>
        <div class="column">
          <button class="button field is-success" @click="submit">
          <b-icon icon="floppy-o"></b-icon>
          <span>Save Changes</span>
        </button>
        <button class="button field is-danger">
          <b-icon icon="times"></b-icon>
          <span>Dismiss Changes</span>
        </button>
        </div>
    </div>
    <div id="editor">
      <textarea v-model="editingArticle.text" placeholder="Write down your thoughts in Markdown... "/>
      <article-show :article="editingArticle.text"></article-show>
    </div>
  </section>
</template>

<script>
import debounce from "lodash";
import Vue from "vue";
import ArticleShow from "@/components/ArticleShow";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    ArticleShow
  },
  computed: mapState(["editingArticle"]),
  methods: {
    submit: function() {
      this.$store.dispatch("SUBMIT_ARTICLE").then(() => {
        this.$snackbar.open("Article saved.")
      }).catch((error) => {
        this.$snackbar.open({
          message: 'Failed to commit changes. Please sign in first.',
          type: 'is-danger',
          actionText: 'Sign in',
          onAction: () => {
              this.$router.push("/signin")
          }
        })
      })
    },
  }
};
</script>

<style scoped>
html,
body,
#editor {
  height: 80vh;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

#toolbar{
  margin:0;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 20px 20px;
  overflow: auto;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}

#toolbar {
  padding: 20px;
}
</style>
