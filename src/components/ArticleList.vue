<template>
    <section class="section">
        <div class="block">
            <button class="button field is-danger" @click="selected = noData" :disabled="!Object.keys(selected).length">
                <b-icon icon="times"></b-icon>
                <span>Clear selected</span>
            </button>
        </div>

        <div class="columns">
            <div class="column is-one-quarter">
                <b-table :data="tableDataSimple" :selected.sync="selected">

                    <template scope="props">

                        <b-table-column label="Title">
                            {{ props.row.title }}
                        </b-table-column>

                        <b-table-column label="Date" centered>
                            {{ new Date(props.row.date).toLocaleDateString() }}
                        </b-table-column>
                    </template>
                </b-table>
            </div>

            <div class="column">
                <article-show :article="this.selected.content"></article-show>
            </div>
        </div>
    </section>
</template>

<script>
import debounce from 'lodash'
import ArticleShow from '@/components/ArticleShow'
export default {
    components: {
        ArticleShow
    },
    data() {
        const noData = {
            'content': '# Select an article to continue.'
        }
        const tableDataSimple = [
            { 'title': 'Sample Article 1', 'date': '2017-9-23 17:14:11', 'content': '## test1 \n test 2 fun' },
            { 'title': 'Sample Article 2', 'date': '2017-9-23 13:14:11', 'content': '## test2 ' },
            { 'title': 'Sample Article 3', 'date': '2017-9-13 17:14:11', 'content': '## test3 \n test 3' },
        ]

        return {
            tableDataSimple,
            selected: tableDataSimple[1],
            noData
        }
    },
}
</script>