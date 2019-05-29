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

    <div v-if="formSitio == true">
      <label for>Nombre:</label>
      <input type="text" id="nombre_sitio" class="form-control" v-model="sitio.nombre_sitio">
      <br>
      <label for>Url:</label>
      <input type="text" id="nombre_sitio" class="form-control" v-model="sitio.url">
      <br>
      <label for>Responsable:</label>
      <input type="text" id="nombre_sitio" class="form-control" v-model="sitio.responsable">
      <br>
      <label for>Hora Apertura:</label>
      <input type="text" id="nombre_sitio" class="form-control" v-model="sitio.hora_apertura">
      <br>
      <label for>Hora Cierre:</label>
      <input type="text" id="nombre_sitio" class="form-control" v-model="sitio.hora_cierre">
      <br>
      <label for>Voucher:</label>
      <input type="text" id="nombre_sitio" class="form-control" v-model="sitio.voucher">
      <br>

      <gmap-autocomplete class="input" @place_changed="setPlace"></gmap-autocomplete>
      <br>
      <button
        @click="buscarSitio"
        class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
      >Buscar</button>
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

      <button class="btn btn-primary" @click="agregarSitio">Agregar</button>
    </div>
    <div v-else>
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
    <button
      @click="obtenerCategoria"
      class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
    >Obtener categoria 1</button>
    <button
      @click="obtenerCategorias"
      class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
    >Obtener categorias</button>
    <button
      @click="agregarCategoria"
      class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
    >Agregar categoria</button>

    <button
      @click="obtenerSitios"
      class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
    >Obtener Sitios</button>
    <button
      @click="obtenersitiosxCategoria"
      class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
    >Obtener Sitios por Categoria</button>
    <button
      @click="obtenerSitiosxCatBarrio"
      class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
    >Consulta Triangulada: Obtener Sitios por Categoria/Barrio</button>
    <button
      @click="agregarSitio"
      class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
    >Agregar sitio</button>
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
      categoria_seleccionada: null,
      formSitio: false,
      mapa: false,
      rows: [],
      columns: [],
      action: [],
      url: "http://localhost:8090/api/sitios",
      urlCategorias: "http://localhost:8090/api/categorias",
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
      currentPlace: null,
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
      },
      sitio: {
        nombre_sitio: "",
        barrio: "",
        latitud: "",
        longitud: "",
        url: "",
        responsable: "",
        hora_apertura: "",
        hora_cierre: "",
        voucher: 0
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
    setPlace(place) {
      this.currentPlace = place;
    },
    buscarSitio() {
      if (this.currentPlace) {
        //console.log(JSON.stringify(this.currentPlace));
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          icon: img_posicion
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        //Se agregan los datos de latitud, longitud y barrio que se enviarán por servicio
        this.sitio.barrio = this.currentPlace.vicinity;
        this.sitio.latitud = this.currentPlace.geometry.location.lat();
        this.sitio.longitud = this.currentPlace.geometry.location.lng();
      }
    },
    listarCategoria(id_cat) {
      this.mapa = false;
      this.formSitio = false;
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
      //PARA REDIRECCIONAR A OTRA PÁGINA
      //this.$router.push("../sitio/agregar");
      this.formSitio = true;
      this.categoria_seleccionada = this.categoria;
      this.categoria = null;
      this.geolocate();
    },
    agregarSitio() {
     
      axios
        .post(this.url, {
          id_categoria: this.categoria_seleccionada,
          nombre_sitio: this.sitio.nombre_sitio,
          barrio: this.sitio.barrio,
          latitud: this.sitio.latitud,
          longitud: this.sitio.longitud,
          url: this.sitio.url,
          responsable: this.sitio.responsable,
          hora_apertura: this.sitio.hora_apertura,
          hora_cierre: this.sitio.hora_cierre,
          voucher: this.sitio.voucher
        })
        .then(function(response) {
          console.log(response.status);
        })
        .catch(function(error) {
          console.log(response.status);
        });
    },
    eliminar(payload) {
      //console.log(payload);

      axios
        .delete(this.url, {
          id_sitio: 16
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
          console.log(response.data);
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
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },

    //PREPARANDO DATOS PARA PRUEBA TP2
    obtenerCategorias() {
      axios
        .get(this.urlCategorias)
        .then(response => {
          // Obtenemos los datos

          alert(JSON.stringify(response.data));
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        });
    },
    obtenerCategoria() {
      axios
        .get(this.urlCategorias + "/1")
        .then(response => {
          // Obtenemos los datos

          alert(JSON.stringify(response.data));
        })
        .catch(e => {
          // Capturamos los errores
          alert(console.log(e));
        });
    },
    agregarCategoria() {
      axios
        .post(this.urlCategorias, {
          nombre_cat: "POLO"
        })
        .then(function(response) {
          alert(JSON.stringify(response.data));
        })
        .catch(function(error) {
          alert(response.status);
        });
    },
    obtenerSitios() {
      axios
        .get(this.url)
        .then(response => {
          // Obtenemos los datos

          alert(JSON.stringify(response.data));
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        });
    },
    obtenersitiosxCategoria() {
      axios
        .get(this.url + "/3")
        .then(response => {
          // Obtenemos los datos
          
          alert(JSON.stringify(response.data));
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        });
    },
    
    agregarSitio() {
      axios
        .post(this.url, {
          id_categoria: 3,
          nombre_sitio: "PRUEBA",
          barrio: "almagro",
          latitud: "-54.88889898",
          longitud: "-88.55558548",
          url: "www.prueba.com.ar",
          responsable: "PEPITO",
          hora_apertura: "08:00",
          hora_cierre: "19:00",
          voucher: 1
        })
        .then(function(response) {
          //console.log(response.status);
          alert(JSON.stringify(response.data));
        })
        .catch(function(error) {
          console.log(response.status);
        });
    },
    obtenerSitiosxCatBarrio() {
      axios
        .get(this.url + "/barrio/1/Almagro/-34.609953/-58.4292301")
        .then(response => {
          // Obtenemos los datos
          //console.log(response)
          alert(JSON.stringify(response.data));
        })
        .catch(e => {
          // Capturamos los errores
          console.log(e);
        });

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