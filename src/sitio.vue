<template>
  <div id="app">
    <nav>
        <router-link to='./'>Home</router-link>
        <router-link to='./GoogleMap'>ABM</router-link>
        <router-link to='./consulta'>Consulta</router-link>
        <router-link to='./graficos'>Graficos</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import GoogleMap from "./components/GoogleMap";

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



