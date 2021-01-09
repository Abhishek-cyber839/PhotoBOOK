import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from './auth/auth'
import {album} from "@/store/albums/albums";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    album
  }
})
