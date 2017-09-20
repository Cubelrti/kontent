import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Signin from '@/components/Signin'

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
    }
  ],
  mode: 'history'
})
