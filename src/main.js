//Importación libreria vue sobre Componenete principal sitio.vue
import Vue from 'vue'
import App from './sitio.vue'

//Framework bootstrap
import BootstrapVue from 'bootstrap-vue'
import bootstrap4 from 'vue-bootstrap4-table'

//VueNoty: muestra los mensajes en ventanas emergentes
import VueNoty from 'vuejs-noty'

//Gráficos APEX
import VueApexCharts from 'vue-apexcharts'

//Uso de Google Maps
import * as VueGoogleMaps from "vue2-google-maps";

//Router
import vueRouter from 'vue-router'

//Vue-Resource
import vueResource from 'vue-resource'

//Links
import Link from 'bootstrap-vue/es/components/link'

//Permite realizar las llamadas por request $HTTP
window.axios = require('axios');

//Importación de rutas
import routes from './routes'

//Librería  css de Bootstrap
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'vuejs-noty/dist/vuejs-noty.css'

//Uso de componentes vue
Vue.use(Link)
Vue.use(vueRouter);
Vue.use(vueResource);
Vue.use(BootstrapVue);
Vue.use(bootstrap4)
Vue.use(VueNoty)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueApexCharts)

//Asignación de rutas a constante router
const router = new vueRouter({
  routes
})

//Uso de librería GoogleMaps + Key Original
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyASq8YmttACgZGX3HVwu-8eB37gtmhYqmY",
    libraries: "places,drawing"
  }
}
);

//Generación de objeto VUE
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
