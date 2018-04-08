// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.content with an alias.
import Vue from 'vue'
import App from './App'
import Content from './locale/ru-ru'
import StoreFactory from './store/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: StoreFactory(Content),
  components: { App },
  template: '<App/>'
})
