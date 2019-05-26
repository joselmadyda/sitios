<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <span v-if="categoria == null || categoria != 1 || mapa == true">
            <button
              type="button"
              @click="listarCategoria(1)"
              class="btn btn-block btn-outline-primary waves-effect"
            >R E S T A U R A N T E S</button>
          </span>
          <span v-else>
            <button
              type="button"
              @click="cargarsitiosBD(1)"
              class="btn btn-block btn-outline-primary waves-effect"
            >M A P S</button>
          </span>
        </div>

        <div class="col">
          <span v-if="categoria == null || categoria != 2 || mapa == true">
            <button
              type="button"
              @click="listarCategoria(2)"
              class="btn btn-block btn-outline-primary waves-effect"
            >B A R E S</button>
          </span>
          <span v-else>
            <button
              type="button"
              @click="cargarsitiosBD(2)"
              class="btn btn-block btn-outline-primary waves-effect"
            >M A P S</button>
          </span>
        </div>

        <div class="col">
          <span v-if="categoria == null || categoria != 3 || mapa == true">
            <button
              type="button"
              @click="listarCategoria(3)"
              class="btn btn-block btn-outline-primary waves-effect"
            >T E A T R O S</button>
          </span>
          <span v-else>
            <button
              type="button"
              @click="cargarsitiosBD(3)"
              class="btn btn-block btn-outline-primary waves-effect"
            >M A P S</button>
          </span>
        </div>
      </div>
    </div>
    <br>
    <div v-if="categoria == null"></div>
    <div v-else>
      <span v-if="mapa != false">
        <gmap-map :center="center" :zoom="17" style="width:100%;  height: 500px;">
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="false"
            :draggable="false"
            :icon="m.position.icon"
            @click="toggleInfoWindow(m,index)"
          ></gmap-marker>

          <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen=false"
          >
            <div v-html="infoContent"></div>
          </gmap-info-window>
        </gmap-map>
      </span>
      <span v-else>
        <vue-bootstrap4-table
          :rows="rows"
          :columns="columns"
          :config="config"
          :actions="actions"
          @on-eliminar="eliminar"
          @on-agregar="agregar"
        ></vue-bootstrap4-table>
      </span>
    </div>
  </div>
</template>

<script>
import img_teatro from "../../assets/teatro.png";
import img_resto from "../../assets/resto.png";
import img_golf from "../../assets/golf.png";
import img_posicion from "../../assets/mapa.png";
import VueBootstrap4Table from "vue-bootstrap4-table";

export default {
  name: "App",

  data: function() {
    return {
      categoria: null,
      mapa: false,
      rows: [],
      columns: [],
      action: [],
      url: "http://localhost:8090/api/sitios",
      config: {
        checkbox_rows: true,
        rows_selectable: true,
        card_title: "",
        per_page: 5,
        selected_rows_info: true
      },
      center: { lat: -34.609953, lng: -58.4292301 },
      markers: [],
      places: [],
      //currentCoordinates: {lat: "", lng: ""},
      currentPlace: null,
      url: "http://localhost:8090/api/sitios",
      info: "",
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  methods: {
    listarSitiosBD(id_cat) {
      (this.rows = []),
        axios
          .get(this.url + "/" + id_cat)
          .then(response => {
            // Obtenemos los datos

            let sitios = response.data;

            for (var i = 0; i < sitios.length; i++) {
              let sitio = {
                id: sitios[i].id_sitio,
                nombre: sitios[i].nombre_sitio,
                barrio: sitios[i].barrio,
                url: sitios[i].url,
                apertura: sitios[i].hora_apertura,
                cierre: sitios[i].hora_cierre
              };

              this.rows.push(sitio);
            }
          })
          .catch(e => {
            // Capturamos los errores
            console.log(2);
          });
    },

    listarCategoria(id_cat) {
      this.mapa = false;
      this.categoria = id_cat;
      //Setear Card Title
      if (id_cat == 1) {
        this.config.card_title = "RESTAURANTES";
      }
      if (id_cat == 2) {
        this.config.card_title = "BARES";
      }
      if (id_cat == 3) {
        this.config.card_title = "TEATROS";
      }
      this.listarSitiosBD(id_cat),
        (this.columns = [
          {
            label: "NOMBRE",
            name: "nombre",
            sort: true
          },
          {
            label: "BARRIO",
            name: "barrio",
            sort: true
          },
          {
            label: "URL",
            name: "url",
            sort: true
          },
          {
            label: "APERTURA",
            name: "apertura"
          },
          {
            label: "CIERRE",
            name: "cierre"
          }
        ]),
        (this.actions = [
          {
            btn_text: "Eliminar",
            event_name: "on-eliminar",
            class: "btn btn-primary my-custom-class",
            event_payload: {
              msg: "my custom msg"
            }
          },
          {
            btn_text: "Agregar",
            event_name: "on-agregar",
            class: "btn btn-primary my-custom-class",
            event_payload: {
              msg: "my custom msg"
            }
          }
        ]);
    },

    agregar(payload) {
      this.$router.push("../sitio/agregar");
    },
    eliminar(payload) {
      //PROBANDO AGREGAR UNA CATEGORIA

      axios
        .post(this.url, {
          nombre_cat: "POLO"
        })
        .then(function(response) {
          console.log(response.status);
        })
        .catch(function(error) {
          console.log(response.status);
        });
    },
    cargarsitiosBD(id_cat) {
      this.mapa = true;
      this.markers = [];
      axios
        .get(this.url + "/" + id_cat)
        .then(response => {
          // Obtenemos los datos

          let sitios = response.data;
          console.log(sitios);

          let image = "";

          if (this.categoria == 1) {
            image = img_resto;
          }
          if (this.categoria == 2) {
            image = img_golf;
          }
          if (this.categoria == 3) {
            image = img_teatro;
          }

          for (var i = 0; i < sitios.length; i++) {
            const marker = {
              lat: sitios[i].latitud,
              lng: sitios[i].longitud,
              icon: image,
              nombre: sitios[i].nombre_sitio,
              name: "House of Potgieter",
              description: "description 2",
              date_build: ""
            };
            this.markers.push({ position: marker });
          }
        })
        .catch(e => {
          // Capturamos los errores
          console.log(2);
        });
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    getInfoWindowContent: function(marker) {
      return `<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">${marker.name}</p>
      </div>
    </div>
    <div class="content">
      ${marker.description}
      <br>
      <time datetime="2016-1-1">${marker.date_build}</time>
    </div>
  </div>
</div>`;
    }
  },

  components: {
    VueBootstrap4Table
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