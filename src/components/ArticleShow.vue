<template>
  <div ref="artcleDisplayer" v-html="compiledMarkdown" class="content"></div>
</template>

<script>
import marked from "marked";
export default {
  props: ["article"],
  computed: {
    compiledMarkdown: function() {
      return marked(this.article, { sanitize: true, gfm:true });
    }
  },
};
</script>