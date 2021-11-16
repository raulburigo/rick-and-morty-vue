import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchText: "",
    sortOrder: "asc",
  },
  mutations: {
    setSearchText(state, searchText) {
      state.searchText = searchText;
    },
    setSortOrder(state, order) {
      state.sortOrder = order;
    },
  },
  actions: {
    setSearch({ commit }, text) {
      commit("setSearchText", text);
    },
    clearSearch({ commit }) {
      commit("setSearchText", "");
    },
    setOrder({ commit }, order) {
      commit("setSortOrder", order);
    },
    clearOrder({ commit }) {
      commit("setSortOrder", "");
    },
  },
  modules: {},
});
