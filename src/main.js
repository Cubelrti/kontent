// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import Vuex from 'vuex'
import store from '@/store'
import wysiwyg from "vue-wysiwyg";


Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconPack: 'fa',
});

Vue.use(Vuex);
Vue.use(wysiwyg, {}); 

Object.defineProperty(document, "referrer", {get : function(){ return "xiumi.us"; }});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
