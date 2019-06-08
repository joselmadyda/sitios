<template>
  <div>
    <button
      type="button"
      @click="geolocate()"
      class="btn btn-block btn-outline-primary waves-effect"
    >LOCALIZAME</button>
    <br>

    <span v-if="indicadorLocalizacion == true">
      <div>
        <label for="range-2">Example range with step value</label>
        <b-form-input
          id="range-2"
          v-model="distanciaRadial"
          type="range"
          min="0"
          max="5"
          step="0.5"
        ></b-form-input>
        <div class="mt-2">Distancia (km): {{ distanciaRadial }}</div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <input v-model="distanciaRadial" class="btn btn-block btn-outline-primary waves-effect">
          </div>

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
            >C I N E S</button>
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
      <gmap-map :center="center" :zoom="14" style="width:100%;  height: 500px;">
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
      <br>
      <table border="1" style="width:100%">
        <tr>
          <th>Categoría</th>
          <th>Nombre</th>
          <th>URL</th>
          <th>Responsable</th>
          <th>Distancia</th>
          <th>Horarios</th>
          <th>Promoción</th>
        </tr>

        <tr v-for="m in markers" :key="m.index">
          <td v-if="m.position.id_cat == 1">
            <img :src="imagenResto" width="25">
          </td>
          <td v-if="m.position.id_cat == 2">
            <img :src="imagenCine" width="25">
          </td>
          <td v-if="m.position.id_cat == 3">
            <img :src="imagenTeatro" width="25">
          </td>

          <td>{{m.position.nombre}}</td>
          <td>{{m.position.url}}</td>
          <td>{{m.position.responsable}}</td>
          <td>{{m.position.distancia}}</td>
          <td>{{m.position.abiertoCerrado}}</td>
          <td v-if="m.position.voucher == 1">
            <b-button id="show-btn" @click="showModal(m.position.id_cat)">
              <img :src="imagenEmail" width="20">
            </b-button>
          </td>
          <td v-else></td>
        </tr>
      </table>

      <b-modal ref="my-modal" hide-footer title="Recibir Promoción">
        <div class="d-block text-center">
          <h3>Ingresar correo</h3>
          <input type="text" v-model="email">
        </div>
        <b-button class="mt-2" variant="outline-warning" block @click="enviarMail">Enviar</b-button>
      </b-modal>
    </span>
  </div>
</template>





<script>
import img_teatro from "../../assets/teatro.png";
import img_resto from "../../assets/resto.png";
import img_golf from "../../assets/golf.png";
import img_posicion from "../../assets/mapa.png";
import img_email from "../../assets/mail.png";

export default {
  name: "GoogleMap",
  data() {
    return {
      //Coordenadas por default [[ORT]]
      center: { lat: -34.609953, lng: -58.4292301 },
      latActual: "",
      lngActual: "",
      markers: [],
      places: [],
      //currentCoordinates: {lat: "", lng: ""},
      currentPlace: null,
      url: "http://localhost:8090/api/sitios",
      emailUrl: "http://localhost:3000/api/email",
      info: "",
      categoria: null,
      categoria1: false,
      categoria2: false,
      categoria3: false,
      distanciaRadial: 0.1,
      latitudActual: "",
      longituActual: "",
      indicadorLocalizacion: false,
      imagenResto: img_resto,
      imagenCine: img_golf,
      imagenTeatro: img_teatro,
      imagenEmail: img_email,
      emailCat: "",
      email: ""
    };
  },

  //Una vez cargado el DOM se ejecuta lo que contiene mounted
  mounted() {},

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

          .get(
            this.url +
              "/" +
              //"/barrio/" +
              this.distanciaRadial +
              "/" +
              id_cat +
              "/" +
              this.latitudActual +
              "/" +
              this.longituActual
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
                id_cat: id_cat,
                voucher: sitios[i].voucher,
                distancia: sitios[i].distancia,

                abiertoCerrado: true,

                url: sitios[i].url,
                responsable: sitios[i].responsable
              };
              this.markers.push({ position: marker });
            }
          })
          .catch(e => {
            console.log(response.data);
          });
      } else {
        this.markers = this.markers.filter(m => m.position.id_cat != id_cat);
      }
    },
    showModal(param) {
      this.emailCat = param;
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    identificarHorario() {
      var f = new Date();
      cad = f.getHours();

      return cad;
    },

    enviarMail() {
      axios
        .get(this.emailUrl + "/" + this.email)
        .then(response => {
          alert("Email enviado");
          this.hideModal();
        })
        .catch(e => {
          console.log(2);
        });
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
          lat: -34.609953,
          lng: -58.4292301
        };
        //-34.609953, lng: -58.4292301
        this.marker = {
          lat: -34.609953,
          lng: -58.4292301,
          icon: img_posicion
        };

        this.latitudActual = -34.609953;
        this.longituActual = -58.4292301;

        this.markers.push({ position: this.marker });
      });
      this.indicadorLocalizacion = true;
    }
  },
  watch: {
    
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