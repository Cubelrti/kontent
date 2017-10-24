import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    articles: [],
    username: ""
  },
  actions: {
    LOAD_ARTICLE_LIST: function ({ commit }) {
      return axios.get('/api/article').then((response) => {
        commit('SET_ARTICLE_LIST', response.data)
      }).catch((error) => {
        return Promise.reject(new Error('failed'))
      })
    },
    LOAD_USER_STATE: function ({ commit }) {
      return axios.get('/api/userstate').then((response) => { 
        commit('SET_USERNAME',response.data)
      }).catch((error) => {
        return Promise.reject(new Error('failed'))
      })
    },
    REMOVE_ARTICLE: function ({ commit, state }, { articleId }) {
      return axios.get(`/api/article/${articleId}/remove`);
    }
  },
  mutations: {
    SET_ARTICLE_LIST: (state, data) => {
      state.articles = data
    },
    SET_USERNAME: (state, data) => {
      state.username = data
    },
  },
  getters: {

  },
})

export default store