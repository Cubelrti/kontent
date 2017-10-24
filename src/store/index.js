import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    articles: [],
    userState: {
      username: "",
      userId: ""
    }
  },
  actions: {
    LOAD_ARTICLE_LIST: function ({ commit }) {
      axios.get('/api/article').then((response) => {
        commit('SET_ARTICLE_LIST', response.data)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mutations: {
    SET_ARTICLE_LIST: (state, data) => {
      state.articles = data
    }
  },
  getters: {

  },
})

export default store