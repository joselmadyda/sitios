//Se importan los componentes de sitio
import principal from './components/sitio/principal.vue'
import consulta from './components/sitio/consulta.vue'
import graficos from './components/sitio/graficos.vue'

//Se genera la constante routes con las rutas de los componenetes a listar en el sitio
const routes = [
  { path: '/', component: consulta },
  { path: '/sitio/principal', component: principal },
  { path: '/sitio/consulta', component: consulta },
  { path: '/sitio/graficos', component: graficos }
];

export default routes;