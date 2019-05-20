<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <button
            type="button"
            @click="markersInicialesCat1"
            class="btn btn-block btn-outline-primary waves-effect"
          >R E S T A U R A N T E S</button>
        </div>

        <div class="col">
          <button
            type="button"
            @click="markersInicialesCat2"
            class="btn btn-block btn-outline-primary waves-effect"
          >G O L F</button>
        </div>

        <div class="col">
          <button
            type="button"
            @click="markersInicialesCat3"
            class="btn btn-block btn-outline-primary waves-effect"
          >T E A T R O S</button>
        </div>
      </div>
    </div>

    <div>
      <br>
      <!-- <label >
        <gmap-autocomplete class="input" @place_changed="setPlace"></gmap-autocomplete>
        <br>
        <button
          @click="buscarSitio"
          class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
        >Buscar</button>
      </label>
      -->
      <br>
    </div>

    <gmap-map :center="center" :zoom="17" style="width:100%;  height: 500px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="false"
        :draggable="false"
        :icon="m.position.icon"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>



    <ul>
      
      <li v-for="(m, index) in markers" v-bind:key="index">
        {{m.position.nombre}}
        
        DISTANCIA: {{getKilometros(center.lat,center.lng,m.position.lat,m.position.lng)}}
      </li>`
    </ul>
    <!--    <ul>
      <li v-for="(place, index) in places" v-bind:key="index">{{place.icon}}</li>
    </ul>
    -->

<b-table hover :items="markers"></b-table>
  </div>
</template>





<script>
import img_teatro from "../assets/teatro.png";
import img_resto from "../assets/resto.png";
import img_golf from "../assets/golf.png";
import img_posicion from "../assets/mapa.png";

export default {
  name: "GoogleMap",
  data() {
    return {
      //Coordenadas por default [[ORT]]
      center: { lat: -34.609953, lng: -58.4292301 },
      markers: [],
      places: [],
      //currentCoordinates: {lat: "", lng: ""},
      currentPlace: null
    };
  },
  //Una vez cargado el DOM se ejecuta lo que contiene mounted
  mounted() {
    //this.markersIniciales();
    //this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    buscarSitio() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          icon: img_posicion
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
      }
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          icon: image
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;

        this.currentPlace = null;
        //console.log(JSON.stringify(this.places));
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    markersInicialesCat1() {
      this.markers = [];
      const COTO = {
        lat: -34.6085476,
        lng: -58.4311811,
        icon: img_resto,
        nombre: "RESTO LA CANDELA"
      };
      this.markers.push({ position: COTO });
      const FABRICA = {
        lat: -34.6112837,
        lng: -58.4264576,
        icon: img_resto,
        nombre: "GRAN HOMER"
      };
      this.markers.push({ position: FABRICA });
      console.log(this.markers)
    },
    markersInicialesCat2() {
      this.markers = [];
      const ORT = {
        lat: -34.6100199,
        lng: -58.4322013,
        icon: img_golf
      };
      this.markers.push({ position: ORT });
      const DIA = {
        lat: -34.6116184,
        lng: -58.433263,
        icon: img_golf
      };
      this.markers.push({ position: DIA });
    },
    markersInicialesCat3() {
      this.markers = [];
      const TEATRO1 = {
        lat: -34.6093855,
        lng: -58.4343329,
        icon: img_teatro
      };
      this.markers.push({ position: TEATRO1 });
      const TEATRO2 = {
        lat: -34.608776,
        lng: -58.425912,
        icon: img_teatro
      };
      this.markers.push({ position: TEATRO2 });
      const TEATRO3 = {
        lat: -34.6088385,
        lng: -58.4286357,
        icon: img_teatro
      };
      this.markers.push({ position: TEATRO3 });
    },
    markersIniciales() {
      this.markers = [];
      const COTO = {
        lat: -34.6085476,
        lng: -58.4311811,
        icon: img_resto
      };
      this.markers.push({ position: COTO });
      const FABRICA = {
        lat: -34.6112837,
        lng: -58.4264576,
        icon: img_resto
      };
      this.markers.push({ position: FABRICA });

      const ORT = {
        lat: -34.609953,
        lng: -58.4292301,
        icon: img_teatro
      };
      this.markers.push({ position: ORT });
      const DIA = {
        lat: -34.6116184,
        lng: -58.433263,
        icon: img_golf
      };
      this.markers.push({ position: DIA });
    },
    eliminarUbicacion(indice) {
      this.markers.splice(indice, 1);
    },
    getKilometros(lat1, lon1, lat2, lon2) {
      const rad = function(x) {
        return (x * Math.PI) / 180;
      };
      var R = 6378.137; //Radio de la tierra en km
      var dLat = rad(lat2 - lat1);
      var dLong = rad(lon2 - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) *
          Math.cos(rad(lat2)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      //Devuelve el número procesado con 2 decimales
      return d.toFixed(2);
    }
  }
};
</script>

<style>
body {
  text-align: center;
}
.input {
  width: 500px;
}
</style>