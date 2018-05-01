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
          <button class="button field is-danger" @click="dismiss" v-if="editingArticle.id">
            <b-icon icon="times"></b-icon>
            <span>Dismiss Changes</span>
          </button>
          <b-checkbox class="field scrollChecker" v-model="editingArticle.isCheckList" v-if="!(editingArticle.text || editingArticle.url)">
            Save as CheckList template
          </b-checkbox>
        </div>
    </div>
    <div class="columns">
      <div class="column is-one-half">
        <b-tabs v-model="activeTab" class="toolbar">
          <b-tab-item label="文案">
            <b-field class="link">
              <input v-model="editingArticle.url" name="url" class="input" type="url" placeholder="秀米/微信预览连接">
            </b-field>
            <div class="editor" @scroll="scrollSync" >
              <wysiwyg id="editor" v-model="editingArticle.text" />
            </div>
          </b-tab-item>
          <b-tab-item label="检查单" class="checklist-editor">
              <button class="button field left-btn" @click="addRow">
                  <b-icon icon="close"></b-icon>
                  <span>Add Row</span>
              </button>
              <button class="button field" @click="removeRow">
                  <b-icon icon="close"></b-icon>
                  <span>Remove Row</span>
              </button>
              <b-dropdown>
                <button class="button is-primary" slot="trigger">
                    <span>Avalible Template</span>
                </button>
                <b-dropdown-item v-for="checkList in checkLists" v-bind:key="checkList.id" @click="addCheckLists(checkList)">{{checkList.title}}</b-dropdown-item>
            </b-dropdown>
            <b-table :data="editingArticle.checkList" :selected.sync="selected" >
              <template scope="props">
                  <b-table-column label="Check Item">
                    <b-field>
                        <b-input placeholder="No label" v-model="props.row.title"></b-input>
                    </b-field>
                  </b-table-column>
                  <b-table-column label="通过" centered>
                    <b-switch :value="props.row.selected"></b-switch>
                  </b-table-column>
              </template>
            </b-table>
          </b-tab-item>
        </b-tabs>

      </div>
        <div class="column live-displayer"  ref="articleComponent">
          <b-checkbox class="field scrollChecker" v-model="autoscroll">
            Auto Scroll
          </b-checkbox>
           <article-show :article="editingArticle"></article-show>
        </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import ArticleShow from "@/components/ArticleShow";
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      autoscroll: true,
      activeTab: 0,
      selected: null
    };
  },
  components: {
    ArticleShow
  },
  mounted: function() {
    this.$store.dispatch("LOAD_CHECKLIST_LIST");
  },
  computed: mapState(["editingArticle", "checkLists"]),
  methods: {
    scrollSync: function(event) {
      if (!this.autoscroll) return;
      const _left = event.target;
      const _right = this.$refs.articleComponent;
      const _lH = _left.scrollHeight - _left.clientHeight;
      const _rH = _right.scrollHeight - _right.clientHeight;
      const multiplier = _lH / _rH;

      this.$refs.articleComponent.scrollTop =
        event.target.scrollTop / multiplier;
    },
    submit: function() {
      this.$store
        .dispatch("SUBMIT_ARTICLE")
        .then(() => {
          this.$snackbar.open("Article saved.");
        })
        .catch(error => {
          console.log(error)
          this.$snackbar.open({
            message: "Failed to commit changes. Please sign in first.",
            type: "is-danger",
            actionText: "Sign in",
            onAction: () => {
              this.$router.push("/signin");
            }
          });
        });
    },
    dismiss: function() {
      this.$store.dispatch("LOAD_ARTICLE", {
        articleId: this.editingArticle.id
      });
    },
    addRow: function () {
      this.$store.dispatch("ADD_CHECKLIST_ROW")
    },
    removeRow: function () {
      this.$store.dispatch("REMOVE_CHECKLIST_ROW", this.$data.selected);
    },
    addCheckLists: function(checkList) {
      this.$store.dispatch("ADD_CHECKLIST_TEMPLATE", { checkList })
    }
  }
};
</script>

<style scoped>
html,
body,{
  height: 80vh;
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}
#toolbar{
  margin:0;
}


.left-btn{
  margin-left: 15px;
}
.editor{
  height: 80vh;
  padding: 10px;
  overflow-y: scroll
}

.live-displayer{
  height: 85vh;
  overflow-y: scroll;
  
  padding: 30px;
}

.link{
  padding: 20px
}

.scrollChecker {
  height: 2.25em;
}

.checklist-editor{
  min-height: 80vh
}
</style>
