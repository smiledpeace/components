import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import * as actions from './actions.js';
import * as mutations from './mutations.js';
import * as getters from './getters.js'
const state = {
    notes: []
};
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});

export default store;
