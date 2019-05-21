import Vue from 'vue'
import App from './sitio.vue'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps";
import vueRouter from 'vue-router'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import VueFunnelGraph from 'vue-funnel-graph-js';


Vue.use(vueRouter);
//Vue.use(VueFunnelGraph);
Vue.use(BootstrapVue);

const rutas = new vueRouter({
  routes: Routes
})

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyASq8YmttACgZGX3HVwu-8eB37gtmhYqmY",
    libraries: "places,drawing"
  }}
  );

new Vue({
  el: '#app',  
  render: h => h(App),
  router: rutas
})
