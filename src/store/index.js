import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    articles: [],
    username: "",
    editingArticle: {
      text: '',
      title: '',
      id:''
    }
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
      })
    },
    REMOVE_ARTICLE: function ({ commit, state }, { articleId }) {
      return axios.get(`/api/article/${articleId}/remove`);
    },
    SUBMIT_ARTICLE: function ({ commit, state }) {
      let { text, title, id } = state.editingArticle;
      let payload = {
        title: title ? title : "untitled",
        text: text
      };
      //if editingArticle
      if (id) {
        return axios.post(`/api/article/${id}`, payload)
      }
      return axios.post('/api/article', payload)
    },
    LOAD_ARTICLE: function ({ commit, state }, { articleId }) { 
      return axios.get(`/api/article/${articleId}`).then((response) => {
        commit('SET_EDITING_ARTICLE',response.data)
      })
    }
  },
  mutations: {
    SET_ARTICLE_LIST: (state, data) => {
      state.articles = data
    },
    SET_USERNAME: (state, data) => {
      state.username = data
    },
    SET_EDITING_ARTICLE: (state, data) => {
      state.editingArticle = data
    }
  },
  getters: {

  },
})

export default store