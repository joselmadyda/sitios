import Vue from 'vue'
import App from './sitio.vue'
import BootstrapVue from 'bootstrap-vue'
import VueNoty from 'vuejs-noty'



import * as VueGoogleMaps from "vue2-google-maps";
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
//Permite realizar las llamadas por request $HTTP
window.axios = require('axios');
import routes from './routes'
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'vuejs-noty/dist/vuejs-noty.css'

import Link from 'bootstrap-vue/es/components/link'

import bootstrap4 from 'vue-bootstrap4-table'


Vue.use(Link)
Vue.use(vueRouter);
Vue.use(vueResource);
Vue.use(BootstrapVue);
Vue.use(bootstrap4)
Vue.use(VueNoty)



const router = new vueRouter({
  routes
})

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyASq8YmttACgZGX3HVwu-8eB37gtmhYqmY",
    libraries: "places,drawing"
  }
}
);


new Vue({
  el: '#app',
  router,
  render: h => h(App)


})
