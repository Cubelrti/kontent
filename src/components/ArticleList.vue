<template>
    <section class="section">
        <div class="block">
            <button class="button field is-info" @click="refresh">
                <span>Refresh Article</span>
            </button>
            <button class="button field is-info" @click="edit" :disabled="selected == noData">
                <span>Edit Article</span>
            </button>
            <button class="button field is-danger" @click="remove" :disabled="selected == noData">
                <b-icon icon="times"></b-icon>
                <span>Remove Article</span>
            </button>
        </div>

        <div class="columns">
            <div class="column is-one-quarter">
              <b-tabs v-model="activeTab">
                <b-tab-item label="检查单">
                  <b-table :data="articles" :selected.sync="selected" @select="select" :loading="loading">
                    <template scope="props">
                        <b-table-column label="推送列表">
                            <div class="card">
                              <div class="card-content">
                                <p class="title">
                                  {{ props.row.title }}
                                </p>
                                <p class="subtitle">
                                  {{ new Date(parseInt(props.row.id)).toLocaleDateString() }}
                                </p>
                              </div>
                              <footer class="card-footer">
                                <p class="card-footer-item">
                                  <span>
                                    同意推送
                                  </span>
                                </p>
                                <p class="card-footer-item">
                                  <span>
                                    修改
                                  </span>
                                </p>
                              </footer>
                            </div>
                        </b-table-column>
                    </template>
                  </b-table>
                </b-tab-item>
                <b-tab-item label="文案">
                  <b-table :data="articles" :selected.sync="selected" @select="select(row)" :loading="loading">
                    <template scope="props">
                        <b-table-column label="Title">
                            {{ props.row.title }}
                        </b-table-column>
                        <b-table-column label="Date" centered>
                            {{ new Date(parseInt(props.row.id)).toLocaleDateString() }}
                        </b-table-column>
                    </template>
                  </b-table>
                </b-tab-item>
              </b-tabs>
                
            </div>

            <div class="column" v-if="this.selected">
                <h1 class="title">{{this.selected.title}}</h1>
                <span>ArticleID: {{ this.selected.id }} / AuthorID: {{ this.selected.userId }}</span>
                <hr/>
                <div class="wrapper">
                  <article-show :article="this.selected"></article-show>
                  <checklist-display class="checklist-display" :article="this.selected"></checklist-display>
                </div>
            </div>
        </div>
        
      <template slot="detail" slot-scope="props">
        <textarea></textarea>
      </template>
    </section>
</template>

<script>
import { find } from "lodash";
import ArticleShow from "@/components/ArticleShow";
import ChecklistDisplay from "@/components/Checklist"
import { mapState } from "vuex";
export default {
  components: {
    ArticleShow,
    ChecklistDisplay
  },
  computed: mapState(["articles"]),
  data() {
    const noData = {
      text: "",
      title: 'not selected',
      id: '0'
    };
    let selected = noData;
    let loading = true;
    return {
      activeTab: 0,
      noData,
      selected,
      loading,
      defaultOpenedDetails: []
    };
  },
  mounted: function() {
    if (this.articles.length !== 0) {
      this.loading = false;
      return;
    }
    this.refresh().then(() => {
      if (this.$route.params.id) {
        let id = this.$route.params.id;
        this.selected = _.find(this.articles, { id: id });
      }
    });
  },
  methods: {
    remove: function() {
      this.$store.dispatch("REMOVE_ARTICLE", { articleId: this.selected.id });
      this.$store.dispatch("LOAD_ARTICLE_LIST");
      this.selected = this.noData;
    },
    edit: function() {
      this.$store.commit("SET_EDITING_ARTICLE", this.selected);
      this.$router.push("/compose");
    },
    refresh: function() {
      this.loading = true;
      return this.$store
        .dispatch("LOAD_ARTICLE_LIST")
        .then(() => {
          this.loading = false;
          this.$snackbar.open("Article loaded.");
        })
        .catch(error => {
          this.$snackbar.open({
            message: "Failed to get articles. Please sign in first.",
            type: "is-danger",
            actionText: "Sign in",
            onAction: () => {
              this.$router.push("/signin");
            }
          });
        });
    },
    select: function(row) {
      if(!this.selected) return;
      this.$router.push(`/article/${row.id}`)
    }
    
  }
};
</script>

<style>
  .wrapper{
    display:flex;
  }
  .checklist-display{
    width:100%;
    padding: 30px;
  }
</style>
