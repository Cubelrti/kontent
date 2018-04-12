import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    articles: [],
    username: '',
    settings: {
      displayTitle: 'Kontent',
      slogan: 'A file-based lightweight CMS.',
    },
    editingArticle: {
      text: '',
      title: '',
      id: '',
      isCheckList: false,
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
    LOAD_USER_STATE: function ({ commit, state }) {
        return axios.get('/api/userstate').then((response) => {
          commit('SET_USERNAME', response.data)
        })
      
    },
    REMOVE_ARTICLE: function ({ commit, state }, { articleId }) {
      return axios.get(`/api/article/${articleId}/remove`);
    },
    SUBMIT_ARTICLE: function ({ commit, state }) {
      let { text, title, id, isCheckList } = state.editingArticle;
      let payload = {
        title: title ? title : "untitled",
        text: text,
        isCheckList: isCheckList
      };
      // is editing?
      if (id) {
        return axios.post(`/api/article/${id}`, payload)
      }
      return axios.post('/api/article', payload)
    },
    LOAD_ARTICLE: function ({ commit, state }, { articleId }) { 
      return axios.get(`/api/article/${articleId}`).then((response) => {
        commit('SET_EDITING_ARTICLE',response.data)
      })
    },
    LOAD_SETTINGS: function ({commit, state}) {
      return axios.get(`/api/config`).then((response) => {
        commit('SET_SETTINGS', response.data);
      });
    },
    SUBMIT_SETTINGS: function ({ commit, state }) {
      return axios.post('/api/config', state.settings);
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
    },
    SET_CHECKLIST_STATE: (state, data) => {
      state.editingChecklist = data;
    },
    SET_SETTINGS: (state, data) => {
      state.settings = data;
    }
  },
  getters: {

  },
})

export default store