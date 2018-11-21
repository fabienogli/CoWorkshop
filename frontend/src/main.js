// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './styles/global.scss'
import VueCookies from 'vue-cookies'
import Vuex from 'vuex'
import {setStateFromCookie} from "./utll";

Vue.use(VueCookies);
Vue.use(Vuex);
Vue.config.productionTip = false;

setStateFromCookie();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
