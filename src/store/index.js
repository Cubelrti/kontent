import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    articles: [],
    checkLists: [],
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
      checkList: [],
      url: ''
    }
  },
  actions: {
    LOAD_ARTICLE_LIST: function ({ commit }) {
      return axios.get('/api/article').then((response) => {
        commit('SET_ARTICLE_LIST', _.reverse(response.data))
      }).catch((error) => {
        return Promise.reject(new Error('failed'))
      })
    },
    LOAD_CHECKLIST_LIST: function ({ commit }) {
      return axios.get('/api/checklist').then((response) => {
        commit('SET_CHECKLIST_LIST', _.reverse(response.data))
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
    SUBMIT_ARTICLE: function ({ commit, state, dispatch }) {
      let { text, title, id, isCheckList, checkList, url } = state.editingArticle;
      let payload = {
        title: title ? title : "untitled",
        text: text,
        checkList: checkList,
        url: url
      }
      if (isCheckList) {
        let checklistPayload = {
          title: title ? title : "untitled",
          checkList: checkList
        };
        return axios.post('/api/checklist', payload).then(() => dispatch('LOAD_ARTICLE_LIST'));
      }

      if (id) { // id only when editing
        return axios.post(`/api/article/${id}`, payload).then(() => dispatch('LOAD_ARTICLE_LIST'));
      }
      return axios.post('/api/article', payload).then(() => dispatch('LOAD_ARTICLE_LIST'));
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
    },
    ADD_CHECKLIST_ROW: function ({ commit, state }) {
      return commit('ADD_CHECKLIST_ROW', {
        id: Date.now(),
        title: "",
        isChecked: false,
        additionalInfo: "",
      });
    },
    REMOVE_CHECKLIST_ROW: function ({ commit, state }, checkList) {
      return commit('REMOVE_CHECKLIST_ROW', checkList);
    },
    SET_CHECKLIST_STATE: function ({ commit, state, dispatch }, { id, checkList }) {
      let article = _.find(state.articles, (t) => t.id === id);
      let { text, title, isCheckList } = article;
      let payload = {
        title: title ? title : "untitled",
        text: text,
        checkList: checkList
      }
      commit('EDIT_CHECKLIST', { id, checkList });
      return axios.post(`/api/article/${id}`, payload).then(() => dispatch('LOAD_ARTICLE_LIST'));
    },
    ADD_CHECKLIST_TEMPLATE: function ({ commit, state }, { checkList }) {
      return commit('ADD_TO_CURRENT_CHECKLIST', checkList);
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
      state.editingArticle = Object.assign({ checkList: [] }, data);
    },
    SET_CHECKLIST_STATE: (state, data) => {
      state.editingChecklist = data;
    },
    SET_SETTINGS: (state, data) => {
      state.settings = data;
    },
    ADD_CHECKLIST_ROW: (state, data) => {
      state.editingArticle.checkList.push(data);
    },
    EDIT_CHECKLIST: (state, data) => {
      let article = _.find(state.articles, (t) => t.id === data.id);
      article.checkList = data.checkList;
    },
    SET_CHECKLIST_LIST: (state, data) => {
      state.checkLists = data;
    },
    ADD_TO_CURRENT_CHECKLIST: (state, data) => {
      state.editingArticle.checkList.push(data);
    },
    REMOVE_CHECKLIST_ROW: (state, data) => {
      state.editingArticle.checkList = state.editingArticle.checkList.filter(t => t.title !== data.title);
    }
  },
  getters: {

  },
})

export default store