
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import state from './state'


export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})