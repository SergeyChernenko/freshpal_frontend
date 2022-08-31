import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    async fetchCount(ctx, limit = 0){
      var count = limit;
      ctx.commit('updateCount', count)
    },
    async fetchLike(ctx, limit = 0){
      var count = limit;
      ctx.commit('updateLike', count)
    },
    async fetchSub(ctx, limit = 0){
      var count = limit;
      ctx.commit('updateSub', count)
    },
    async fetchMention(ctx, limit = 0){
      var count = limit;
      ctx.commit('updateMention', count)
    }
  },
  mutations: {
    updateCount(state, count){
      state.count = count
    },
    updateLike(state, count){
      state.like = count
    },
    updateSub(state, count){
      state.sub = count
    },
    updateMention(state, count){
      state.mention = count
    }
  },
  state: {
    count: null,
    like: null,
    sub: null,
    mention: null,
  },
  getters: {
    getCount(state){
      return state.count
    },
    getLike(state){
      return state.like
    },
    getSub(state){
      return state.sub
    },
    getMention(state){
      return state.mention
    }
  },
})