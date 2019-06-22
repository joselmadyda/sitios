<template>
  <div>
    <!-- Botón Inicial - Comienzo de circuito realiza la geolocalización actual para posicionar las coordendas actuales en el mapa-->
    <button
      type="button"
      @click="geolocate()"
      class="btn btn-block btn-outline-primary waves-effect"
    >LOCALIZAME</button>
    <br>
    <!-- Si el indicador de Localización no se activó (true) no se muestra el mapa y la tabla de resultados -->
    <span v-if="indicadorLocalizacion == true">
      <div>
        <label for="range-2">
          Distancia Actual (km):
          <b>{{ distanciaRadial }}</b>
        </label>
        <b-form-input
          id="range-2"
          v-model="distanciaRadial"
          type="range"
          min="1"
          max="5"
          step="0.5"
        ></b-form-input>
      </div>
      <!-- Se muestran las categorías en un checkbox group leyendo un objeto de categorías [selectedCategories] en este caso-->
      <div>
        <b-form-group>
          <b-form-checkbox-group v-model="selectedCategories" :options="optionsCategorias" switches></b-form-checkbox-group>
        </b-form-group>
      </div>

      <br>
      <!--Mapa Google Maps-->
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
      <!--Tabla de Sitios -->
      <table border="0" style="width:100%">
        <tr>
          <th>Categoría</th>
          <th>Nombre</th>
          <th>URL</th>
          <th>Responsable</th>
          <th>Distancia</th>
          <th>Promoción</th>
        </tr>
        <!-- Se recorre el objeto markers, para listar todos los puntos en el mapa de acuerdo a sus coordenadas -->
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
          <td v-if="m.position.voucher == 1">
            <!--Envío de mail: se despliega una ventana modal para que se pueda ingrear una dirección de email -->
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
        <!--Envío de mail -->
        <b-button class="mt-2" variant="outline-info" block @click="enviarMail">Enviar</b-button>
      </b-modal>
    </span>
  </div>
</template>

<script>
//Se importan las imágenes que se representarán en el mapa y en las tablas
import img_teatro from "../../assets/teatro.png";
import img_resto from "../../assets/resto.png";
import img_golf from "../../assets/golf.png";
import img_posicion from "../../assets/mapa.png";
import img_email from "../../assets/mail.png";

export default {
  name: "GoogleMap",
  data() {
    return {
      //Se inicializan las propiedades de nuestro modelo

      //Coordenadas por default [[ORT]]
      center: { lat: -34.609953, lng: -58.4292301 },
      latActual: "",
      lngActual: "",
      markers: [],
      places: [],
      selectedCategories: [],
      optionsCategorias: [
        { text: "Restaurantes", value: "1" },
        { text: "Bares", value: "2" },
        { text: "Cines (próximamente)", value: "4", disabled: true },
        { text: "Teatros", value: "3" },
        { text: "Veterinarias (próximamente)", value: "5", disabled: true },
        { text: "Starbucks (próximamente)", value: "6", disabled: true }
      ],
      currentPlace: null,
      url: "http://localhost:8090/api/sitios",
      info: "",
      categoria: null,
      categoria1: false,
      categoria2: false,
      categoria3: false,
      distanciaRadial: 1,
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
  mounted() {
    this.showInitialMessage();
  },

  methods: {
    //Se setea el objeto currentPlace por medio de el ingreso manual de una dirección
    setPlace(place) {
      this.currentPlace = place;
    },
    //Método que recibe id de categoría y distancia (km). Por medio de axios, realiza una consulta al servidor por get y si se obtiene resultado
    //por el .then de la promesa, se listarán en una tabla desde el objeto sitios, caso contrario hace un console.log pero no devuelve nada en pantalla
    filtrarSitiosBD(id_cat, distancia) {
      let image = "";

      switch (id_cat) {
        case "1":
          image = img_resto;
          break;
        case "2":
          image = img_golf;
          break;
        case "3":
          image = img_teatro;
          break;
      }

      axios
        .get(`${this.url}/${distancia}/${id_cat}/${this.latitudActual}/${this.longituActual}`
        )
        .then(response => {
          // Obtenemos los datos que vienen desde el servidor
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
    },
    //Método que muestra la ventana modal para el envío de mail
    showModal(param) {
      this.emailCat = param;
      this.$refs["my-modal"].show();
    },
    //Método que oculta la ventana modal para el envío de mail
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    //Método que consume servicio de envío de mail por .get.
    enviarMail() {
      axios
        .get(this.url + "/email/" + this.email)
        .then(response => {
          alert("Email enviado");
          this.hideModal();
        })
        .catch(e => {
          alert (e.message) //ver para q muestre el mensaje de error y no solo el codigo
         // console.log(response.data.status);
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
      }
    },
    //Método que generar la geolocalización actual y el posicionamiento en el mapa de dichas coordenadas
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          icon: img_posicion
        };
        this.latitudActual = position.coords.latitude;
        this.longituActual = position.coords.longitude;

        this.markers.push({ position: this.marker });
      });
      this.indicadorLocalizacion = true;

      //Mensaje que se muestra cuando la distanciaRadial no se ha modificado valor 1
      if (this.distanciaRadial == 1) {
        this.$noty.info("Arrastrá el scroll para obtener más resultados!", {
          killer: true,
          timeout: 3000,
          layout: "topRight",
          progressBar: true
        });
      }
      //Mensaje que se muestra cuando aún nos e ha seleccionado ninguna categoría
      if (this.selectedCategories.length == 0) {
        this.$noty.info("Selecciona al menos una categoría!", {
          killer: true,
          timeout: 3000,
          layout: "topRight",
          progressBar: true
        });
      }
    },

    colocarSitiosEnMapa() {
      //Se limpian los marcadores existentes y se realiza la geolocalización
      this.markers = [];
      this.geolocate();
      //Se recorre el array de categorias seleccionadas para localizar los sitios en el mapa
      for (var i = 0; i < this.selectedCategories.length; i++) {
        this.filtrarSitiosBD(this.selectedCategories[i], this.distanciaRadial);
      }
    },
    showInitialMessage() {
      this.$noty.info("Por favor haz click en LOCALIZAME para comenzar!", {
        killer: true,
        timeout: 3000,
        layout: "topRight",
        progressBar: true
      });
    }
  },
  //Eventos que se capturan cuando a las propiedades se les modifica su valor
  watch: {
    //Cuando se modifica el valor de la propiedad distanciaRadial en el range, se dispara la acción que deseamos, en este caso se llama al método colocarSitiosEnMapa
    distanciaRadial() {
      this.colocarSitiosEnMapa();
    },
    selectedCategories() {
      //Cuando se modifica el array de categorias seleccionadas, disparamos el método colocarSitiosEnMapa
      this.colocarSitiosEnMapa();
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