<template>
  <div class="flex">
    <iframe v-if="this.article.url" :src="this.article.url" ref="artcleDisplayer" class="content" height="600px" width="555px"/>
    <div ref="artcleDisplayer" v-else v-html="this.article.text" class="content"></div>
  </div>
</template>

<script>
export default {
  props: ["article"],
};
</script>
<style scoped>
  .content{
    max-width: 555px;
  }
  .flex{
    display: flex
  }
  .status{
    margin-left: 20px
  }
</style>
