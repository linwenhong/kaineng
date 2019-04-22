import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import Cache from '@/assets/cache'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    user: Cache.getCache('user') || {},
    identity: Cache.getCache('identity') || 1 // 1 商户, 2 管理员
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      axios.defaults.headers.common['token'] = state.user.token
      Cache.setCache('user', user)
    },
    setIdentity(state, identity) {
      state.identity = identity;
      Cache.setCache('identity', identity)
    },
    clearCache(state) {
      state.user = {};
      state.identity = 1;
      localStorage.clear()
    }
  },
  actions: {
    login({commit,state}, user) {
      commit('setUser', user)
      if (state.identity == 1) {
        router.push('/merchant')
      } else {
        router.push('/admin')
      }
    },
    logout({commit,state}) {
      if (state.identity == 1) {
        router.push('/login')
      } else {
        router.push('/admin-login')
      }
      commit('clearCache', state)
    },
    identity({commit}, identity) {
      commit('setIdentity', identity)
    }
  },
  getters: {
    getUser: (state) => state.user,
    getIdentity: (state) => state.identity
  }
})
export default store
