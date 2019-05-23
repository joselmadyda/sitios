import Vue from 'vue'
import App from './sitio.vue'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps";
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'

//Permite realizar las llamadas por request $HTTP
window.axios = require('axios');

import routes from './routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(vueRouter);
Vue.use(vueResource);


Vue.use(BootstrapVue);

const router = new vueRouter({
  routes
})

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyASq8YmttACgZGX3HVwu-8eB37gtmhYqmY",
    libraries: "places,drawing"
  }}
  );

new Vue({
  el: '#app',  
  router,
  render: h => h(App)
  
})
