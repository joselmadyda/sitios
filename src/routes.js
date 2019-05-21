import home from './sitio.vue'
import googleMap from './components/GoogleMap.vue'
import consulta from './components/consulta.vue'
import graficos from './components/graficos.vue'

const routes = [
  { path: '/', component: home },
  { path: '/GoogleMap', component: googleMap },
  { path: '/consulta', component: consulta },
  { path: '/graficos', component: graficos }
];

export default routes;