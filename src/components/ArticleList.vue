<template>
    <section class="section">
        <div class="block">
            <button class="button field is-danger" @click="selected = noData" :disabled="selected == noData">
                <b-icon icon="times"></b-icon>
                <span>Clear selected</span>
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
import debounce from 'lodash'
import ArticleShow from '@/components/ArticleShow'
import { mapState } from 'vuex'
export default {
    components: {
        ArticleShow
    },
    computed: mapState([
        'articles'
    ]),
    data(){
        const noData = {
            'text': '# Select an article to continue.'
        }
        let selected = noData;
        return {
            noData,
            selected
        }
    },
      mounted: function () {
    this.$store.dispatch('LOAD_ARTICLE_LIST')
  }
}
</script>