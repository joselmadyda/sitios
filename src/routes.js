import home from './sitio.vue'
import googleMap from './components/GoogleMap.vue'
import consulta from './components/consulta.vue'


const routes = [
  { path: '/', component: home },
  { path: '/GoogleMap', component: googleMap },
  { path: '/consulta', component: consulta }
];

export default routes;