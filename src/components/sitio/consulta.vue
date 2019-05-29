<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <button
            type="button"
            @click="buscarSitiosBD(1)"
            class="btn btn-block btn-outline-primary waves-effect"
          >R E S T A U R A N T E S</button>
        </div>

        <div class="col">
          <button
            type="button"
            @click="buscarSitiosBD(2)"
            class="btn btn-block btn-outline-primary waves-effect"
          >G O L F</button>
        </div>

        <div class="col">
          <button
            type="button"
            @click="buscarSitiosBD(3)"
            class="btn btn-block btn-outline-primary waves-effect"
          >T E A T R O S</button>
        </div>
      </div>
    </div>

    <br>
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
  </div>
</template>





<script>
import img_teatro from "../../assets/teatro.png";
import img_resto from "../../assets/resto.png";
import img_golf from "../../assets/golf.png";
import img_posicion from "../../assets/mapa.png";

export default {
  name: "GoogleMap",
  data() {
    return {
      //Coordenadas por default [[ORT]]
      center: { lat: -34.609953, lng: -58.4292301 },
      markers: [],
      places: [],
      //currentCoordinates: {lat: "", lng: ""},
      currentPlace: null,
      url: "http://localhost:8090/api/sitios",
      info: "",
      categoria: null,
      categoria1: false,
      categoria2: false,
      categoria3: false
    };
  },

  //Una vez cargado el DOM se ejecuta lo que contiene mounted
  mounted() {
    //this.markersIniciales();
    //this.geolocate();
    //this.cargarsitiosBD();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    buscarSitiosBD(id_cat) {
      let image = "";
      let consultar = false;

      if (id_cat == 1) {
        image = img_resto;
        if (this.categoria1 == false) {
          this.categoria1 = true;
          consultar = true;
        } else {
          this.categoria1 = false;
          consultar = false;
        }
      }
      if (id_cat == 2) {
        image = img_golf;
           if (this.categoria2 == false) {
          this.categoria2 = true;
          consultar = true;
        } else {
          this.categoria2 = false;
          consultar = false;
        }
      }
      if (id_cat == 3) {
        image = img_teatro;
           if (this.categoria3 == false) {
          this.categoria3 = true;
          consultar = true;
        } else {
          this.categoria3 = false;
          consultar = false;
        }
      }

      if (consultar) {
        axios
          //.get(this.url + "/"+id_cat)
          .get(
            this.url + "/barrio/" + id_cat + "/Almagro/-34.609953/-58.4292301"
          )
          .then(response => {
            // Obtenemos los datos
            let sitios = response.data;
            for (var i = 0; i < sitios.length; i++) {
              const marker = {
                lat: sitios[i].latitud,
                lng: sitios[i].longitud,
                icon: image,
                nombre: sitios[i].nombre_sitio,
                id_cat: id_cat
              };
              this.markers.push({ position: marker });
            }
          })
          .catch(e => {
            console.log(response.data);
          });
      } else {
        console.log('no')
        this.markers = this.markers.filter(m => m.position.id_cat != id_cat);
        console.log(2);
        console.log(this.markers);
      }
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