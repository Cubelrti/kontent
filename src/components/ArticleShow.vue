<template>
  <div v-html="compiledMarkdown" class="content"></div>
</template>

<script>
import debounce from 'lodash'
import marked from 'marked'
export default {
    props: ['article'],
    computed: {
        compiledMarkdown: function() {
            return marked(this.article, { sanitize: true })
        }
    },
}
</script>