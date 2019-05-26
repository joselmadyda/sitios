//import home from './sitio.vue'
import principal from './components/sitio/principal.vue'
import consulta from './components/sitio/consulta.vue'
import graficos from './components/sitio/graficos.vue'
import agregar from './components/sitio/agregar.vue'
import abmvoucher from './components/sitio/abmvoucher.vue'

const routes = [
  { path: '/', component: consulta },
  { path: '/sitio/principal', component: principal },
  { path: '/sitio/agregar', component: agregar },
  { path: '/sitio/consulta', component: consulta },
  { path: '/sitio/abmvoucher', component: abmvoucher },
  { path: '/sitio/graficos', component: graficos }
];

export default routes;