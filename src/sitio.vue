<template>
  <div id="app">
    <div>
      
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">
          <img src="../src/assets/icono.png" width="50px" class="d-inline-block align-top" alt="Kitten">

        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/components/sitio/abm#/sitio/principal">Categorías</b-nav-item>
            <b-nav-item href="/components/sitio/abm#/sitio/consulta">Consulta</b-nav-item>
            <b-nav-item href="/components/sitio/abm#/sitio/graficos">Graficos</b-nav-item>
          </b-navbar-nav>

    
        </b-collapse>
      </b-navbar>
    </div>
    <br>
    <router-view/>
    
  </div>
  
</template>

<script>
import GoogleMap from "./components/sitio/principal";

export default {
  name: "App",
  components: {
    GoogleMap
  }
};
</script>

<style>
body {
  text-align: center;
}
</style>
