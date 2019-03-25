import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import Cache from '@/assets/cache'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: Cache.getCache('user') || {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      axios.defaults.headers.common['token'] = state.user.token
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
      router.push('/admin/user/' + 1)
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
