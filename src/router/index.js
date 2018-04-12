import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Signin from '@/components/Signin'
import List from '@/components/ArticleList'
import Composer from '@/components/Composer'
import Configuration from '@/components/Configuration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: "/article",
      name: 'DefaultList',
      component: List
    },
    {
      path: "/compose",
      name: "Composer",
      component: Composer
    },
    {
      path: "/article/:id",
      name: "ArticleShow",
      component: List
    },
    {
      path: "/config",
      name: "Configuration",
      component: Configuration
    }
  ],
  mode: 'history'
})
