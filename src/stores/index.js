import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import Cache from '@/assets/cache'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: Cache.getCache('user') || {},
    token: 'this is a token'
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      axios.defaults.headers.common['Authorization'] = state.token
      Cache.setCache('user', user)
    },
    clearCache(state) {
      state.user = {};
      localStorage.clear()
    }
  },
  actions: {
    login({commit}, user) {
      commit('setUser', user)
      router.push('/admin/user/' + user.id)
    },
    logout({commit,state}) {
      commit('clearCache', state)
      router.push('/')
    }
  },
  getters: {
    getUser: (state) => state.user
  }
})
export default store
