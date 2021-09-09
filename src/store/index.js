import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// import home from './modules/home'
// import user from './modules/user'
import modules from './modules';

export default new Vuex.Store({
    modules
})