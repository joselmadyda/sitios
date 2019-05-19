import Vue from 'vue'
import App from './sitio.vue'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from "vue2-google-maps";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyASq8YmttACgZGX3HVwu-8eB37gtmhYqmY",
    libraries: "places,drawing" // necessary for places input
  }
});
new Vue({
  el: '#app',
  //render: h => h(App)
  components: { App },
  template: "<App/>"
})
