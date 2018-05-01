<template>
  <section class="hero is-primary is-bold is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          {{settings.displayTitle}}
        </h1>
        <hr/>
        <h2 class="subtitle">
          {{settings.slogan}}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["settings"]),
}
</script>

<style scoped>
</style>

