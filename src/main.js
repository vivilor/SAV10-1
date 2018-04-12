// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.content with an alias.
import Vue from 'vue'
import App from './App'
import Steps from './steps'
import Content from './locale/ru-ru'
import StoreFactory from './store/index'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: StoreFactory(Content, Steps),
  components: { App },
  template: '<App/>'
})
