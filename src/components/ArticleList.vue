<template>
    <section class="section">
        <div class="block">
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
                <b-table :data="articles" :selected.sync="selected">
                    <template scope="props">
                        <b-table-column label="Title">
                            {{ props.row.title }}
                        </b-table-column>
                        <b-table-column label="Date" centered>
                            {{ new Date(parseInt(props.row.id)).toLocaleDateString() }}
                        </b-table-column>
                    </template>
                </b-table>
            </div>

            <div class="column">
                <article-show :article="this.selected.text"></article-show>
            </div>
        </div>
    </section>
</template>

<script>
import { find } from "lodash";
import ArticleShow from "@/components/ArticleShow";
import { mapState } from "vuex";
export default {
  components: {
    ArticleShow
  },
  computed: mapState(["articles"]),
  data() {
    const noData = {
      text: "# Select an article to continue."
    };
    let selected = noData;
    return {
      noData,
      selected
    };
  },
  mounted: function() {
    this.$store.dispatch("LOAD_ARTICLE_LIST").then(() => {
        if(this.$route.params.id){
            let id = this.$route.params.id
            this.selected = _.find(this.articles, {id: id});
        }
    }).catch(error => {
        console.log(error)
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
  methods:{
      remove:function () {
          this.$store.dispatch('REMOVE_ARTICLE', {articleId: this.selected.id});
          this.$store.dispatch("LOAD_ARTICLE_LIST");
          this.selected = this.noData;
      },
      edit: function () {
          this.$store.commit('SET_EDITING_ARTICLE', this.selected);
          this.$router.push('/compose')
      }
  }
};
</script>