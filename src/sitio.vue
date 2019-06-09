<template>
  <div id="app">
    <div>
      
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">
          <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
          SitiosVip
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="/components/sitio/abm#/sitio/principal">Categorías</b-nav-item>
            <b-nav-item href="/components/sitio/abm#/sitio/consulta">Consulta</b-nav-item>
            <b-nav-item href="/components/sitio/abm#/sitio/graficos">Graficos</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Buscar Sitio"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0">Buscar</b-button>
            </b-nav-form>
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
