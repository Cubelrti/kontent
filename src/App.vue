<template>
  <div id="app">
    <section>
      <my-header></my-header>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
      <my-footer v-if="!($route.path === '/' || $route.path === '/compose')"></my-footer>
    </section>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyFooter from '@/components/MyFooter'
export default {
  name: 'app',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";
  $primary: hsl(171, 100%, 41%);
  $primary-invert: findColorInvert($primary);
  $colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert));

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
  $fa-font-path: "../node_modules/font-awesome/fonts";
  @import "../node_modules/font-awesome/scss/font-awesome.scss";


.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(40px);
  opacity: 0;
}
</style>

