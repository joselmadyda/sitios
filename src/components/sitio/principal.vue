<template>
  <div>
    <div class="container-fluid">
      <!-- fila1 --->
      <div class="row">
        <div class="col">
          <button
            type="button"
            @click="listarCategoria(1)"
            class="btn btn-block btn-outline-primary waves-effect"
          >R E S T A U R A N T E S</button>
        </div>
        <div class="col">
          <button
            type="button"
            @click="listarCategoria(2)"
            class="btn btn-block btn-outline-primary waves-effect"
          >B A R E S</button>
        </div>
        <div class="col">
          <button
            type="button"
            @click="listarCategoria(3)"
            class="btn btn-block btn-outline-primary waves-effect"
          >T E A T R O S</button>
        </div>
        <div class="col">
          <button
            type="button"
            @click="listarCategoria(4)"
            class="btn btn-block btn-outline-primary waves-effect"
          >C A F E T E R I A S</button>
        </div>
      </div>
      <br>

      <!-- fila2 --->
      <div class="row">
        <button
          type="button"
          @click="formAddSitio()"
          class="btn btn-block btn-outline-primary waves-effect"
        >Crear nuevo sitio</button>
        <br>
        <br>
      </div>

      <!-- fila3 --->
      <div v-show="tablaSitios == true" class="row">
        <table class="table table-hover table-sm">
          <thead>
            <td v-for="(column,index) in columns" :key="index">{{column}}</td>
            <td></td>
            <td></td>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td>{{row.id}}</td>
              <td>{{row.nombre}}</td>
              <td>{{row.barrio}}</td>
              <td>{{row.url}}</td>
              <td>{{row.apertura}}</td>
              <td>{{row.cierre}}</td>
              <td>
                <button
                  type="button"
                  @click="formModSitio(row.id)"
                  class="btn btn-block btn-outline-primary waves-effect"
                >Modificar</button>
              </td>
              <td>
                <button
                  type="button"
                  @click="modal(row.id,row.nombre,'d')"
                  class="btn btn-block btn-outline-primary waves-effect"
                >Borrar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 
      <input type="text" id="frm1_url" class="form-control"  v-model="test_mensaje">
      <button type="button"  @click="showMessages(test_mensaje)"  class="btn btn-block btn-outline-primary waves-effect" >Mensaje</button>-->

      <!-- fila4--->
      <div v-show="formTipo =='add' || formTipo == 'mod' " class="row">
        <button
          type="button"
          @click="formVolver()"
          class="btn btn-block btn-outline-primary waves-effect"
        >Cerrar</button>
      </div>

      <!-- fila5 --->
      <div v-show="formTipo =='add' || formTipo == 'mod' " class="row">
        <div class="col">
          <b-card class="mt-3" v-bind:header="this.titulo">
            <div>
              <form id="frm1_upd">
                <label for="frm1_radio">Categoria:</label>
                <b-form-radio-group v-model="selected" :options="options" name="radio-inline"></b-form-radio-group>
                <br>

                <div v-show="formTipo == 'mod'">
                  <label for="frm1_idsitio">IdSitio:</label>
                  <input
                    type="text"
                    id="frm1_idsitio"
                    class="form-control"
                    v-model="formUpd.idSitio"
                    readonly
                  >
                  <br>
                </div>

                <label for="frm1_nombresitio">Nombre:</label>
                <input
                  type="text"
                  id="frm1_nombresitio"
                  class="form-control"
                  v-model="formUpd.nombre_sitio"
                >
                <br>
                <label for="frm1_url">Url:</label>
                <input type="text" id="frm1_url" class="form-control" v-model="formUpd.url">
                <br>
                <label for="frm1_responsable">Responsable:</label>
                <input
                  type="text"
                  id="frm1_responsable"
                  class="form-control"
                  v-model="formUpd.responsable"
                >
                <br>
                <label for="frm1_apertura">Hora Apertura:</label>
                <input
                  type="text"
                  id="frm1_apertura"
                  class="form-control"
                  v-model="formUpd.hora_apertura"
                >
                <br>
                <label for="frm1_cierre">Hora Cierre:</label>
                <input
                  type="text"
                  id="frm1_cierre"
                  class="form-control"
                  v-model="formUpd.hora_cierre"
                >
                <br>

                <b-form-checkbox
                  id="frm1_voucher"
                  v-model="formUpd.voucher"
                  name="checkbox-1"
                  value="true"
                  unchecked-value="false"
                >Voucher</b-form-checkbox>

                <br>

               <div v-show="formTipo=='add'" class="form-group col-sm-12">
                  <button type="button" @click="modal(null,null,'a')" class="btn btn-info">Agregar Sitio</button>
                </div>
                <div v-show="formTipo=='mod'" class="form-group col-sm-12">
                  <button type="button" @click="updSitio(row.id)" class="btn btn-info" >Modificar Sitio</button>
                </div>
              </form>
            </div>
          </b-card>
        </div>

        <!-- Columna Mapa -->
        <div class="col">
          <b-card class="mt-3" header="Mapa">
            <gmap-autocomplete class="input" @place_changed="setPlace"></gmap-autocomplete>
            <br>
            <button
              @click="buscarSitio"
              class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
            >Buscar</button>

            <gmap-map :center="center" :zoom="17" style="width:100%;  height: 350px;">
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
          </b-card>
          <input
            type="text"
            id="frm1_idsitio"
            class="form-control"
            v-model="this.formUpd.coordenadas"
            readonly
          >
          <b-card>{{formUpd}}</b-card>
        </div>
        <br>
      </div>
    </div>
   
   <!-- Carteles de confirmacion -->

    <b-modal ref="my-modal-del" id="modal-del" hide-footer title="Confirmar borrado">
      <div class="d-block text-center">
        <h3>¿Seguro que desea borrar el sitio: <b><em>{{sitioDel_Nombre}}</em></b>?</h3>
      </div>
      <b-button class="mt-2" variant="outline-info" block @click="deleteSitio()">Si</b-button>
      <b-button class="mt-2" variant="outline-info" block @click="hideModal('d')">No</b-button>
    </b-modal>

    <b-modal ref="my-modal-add" hide-footer title="Confirmar alta">
      <div class="d-block text-center">
        <h3>¿Dar de alta el Nuevo Sitio: <b><em>{{this.formUpd.nombre_sitio}}</em></b> ?</h3>
      </div>
      <b-button class="mt-2" variant="outline-info" block @click="addSitio()"    >Si</b-button>
      <b-button class="mt-2" variant="outline-info" block @click="hideModal('a')">No</b-button>
    </b-modal>

    <b-modal ref="my-modal-mod" hide-footer title="Confirmar modificacion">
      <div class="d-block text-center">
        <h3>¿Modificar Sitio?</h3>
      </div>
      <b-button class="mt-2" variant="outline-warning" block @click="addSitio()"    >Si</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="hideModal('m')">No</b-button>
    </b-modal>

  </div>
</template>

<script>
import img_teatro from "../../assets/teatro.png";
import img_resto from "../../assets/resto.png";
import img_golf from "../../assets/golf.png";
import img_posicion from "../../assets/mapa.png";

export default {
  name: "App",

  data: function() {
    return {
      test_mensaje: "",

      sitioDel_Id: null,
      sitioDel_Nombre:'',

      nombreSitioABorrar: "",
      categoria: null,
      categoria_seleccionada: null,
      selected: null,
      options: [
        { text: "Restaurant", value: 1 },
        { text: "Bar", value: 2 },
        { text: "Teatro", value: 3 },
        { text: "Cafeteria", value: 4 }
      ],
      formTipo: "",
      tablaSitios: true,

      formUpd: {
        nombre_sitio: "",
        url: "",
        latitud: "",
        longitud: "",
        responsable: "",
        hora_apertura: "",
        hora_cierre: "",
        voucher: ""
      },

      mapa: false,
      campoTest: "Test",
      rows: [],
      columns: [
        "Id",
        "Nombre",
        "Barrio",
        "URL",
        "Hora Apertura",
        "Hora Cierre"
      ],
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
      titulo: "",
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
      },
      sitioUpd: {
        nombre_sitio: null,
        barrio: null,
        latitud: null,
        longitud: null,
        url: null,
        responsable: null,
        hora_apertura: null,
        hora_cierre: null,
        voucher: null
      }
    };
  },
  mounted() {
    let message="Aquí puedes: <br>-> Seleccionar una categoría para listar sus sitios. <br>-> Ingresar un sitio nuevo"
    this.showMessages(message);
  },
  methods: {
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

        // Se agregan los datos de latitud, longitud y barrio que se enviarán por servicio
        this.sitio.barrio = this.currentPlace.vicinity;
        this.sitio.latitud = this.currentPlace.geometry.location.lat();
        this.sitio.longitud = this.currentPlace.geometry.location.lng();

        // Se agrega propiedad del form
        this.formUpd.latitud = this.sitio.latitud;
        this.formUpd.longitud = this.sitio.longitud;
        this.formUpd.barrio = this.sitio.barrio;

        this.formUpd.coordenadas =
          "Lat: " +
          this.sitio.latitud +
          " || Long: " +
          this.sitio.longitud +
          " || Barrio: " +
          this.sitio.barrio;
      }
    },

    ubicarSitio(pLat, pLon) {
      const marker = {
        lat: pLat,
        lng: pLon,
        icon: img_posicion
      };

      this.markers.push({ position: marker });
      this.places.push(this.currentPlace);
      this.center = marker;
    },

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
      this.formSitio = false;
      this.categoria = id_cat;
      this.formVolver();

      //Setear Card Title
      switch (id_cat) {
        case 1:
          this.config.card_title = "RESTAURANTES";
          break;
        case 2:
          this.config.card_title = "BARES";
          break;
        case 3:
          this.config.card_title = "TEATROS";
          break;
      }
      this.listarSitiosBD(id_cat);
    },

    // ALERTAS Y MODALES

    modal(IdSitio,NomSitio,modo) {
      this.sitioDel_Id= IdSitio;
      this.sitioDel_Nombre = NomSitio;

      switch(modo){
        case 'a': this.$refs["my-modal-add"].show(); break;
        case 'm': this.$refs["my-modal-mod"].show(); break;
        case 'd': this.$refs["my-modal-del"].show(); break;
      }
    },

    hideModal(modo){
      switch(modo){
          case 'a': this.$refs["my-modal-add"].hide(); break;
          case 'm': this.$refs["my-modal-mod"].hide(); break;
          case 'd': this.$refs["my-modal-del"].hide(); break;
        }
    },
  
    showMessages(mensaje) {
      this.$noty.info(mensaje, {
        killer: true,
        timeout: 3000,
        layout: "topRight",
        progressBar: true
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
          let image = "";

          switch (this.categoria) {
            case 1:
              image = img_resto;
              break;
            case 2:
              image = img_golf;
              break;
            case 3:
              image = img_teatro;
              break;
          }

          for (var i = 0; i < sitios.length; i++) {
            const marker = {
              lat: sitios[i].latitud,
              lng: sitios[i].longitud,
              icon: image,
              nombre: sitios[i].nombre_sitio,
              name: "",
              description: "",
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

    deleteSitio() {
      axios
        .post(this.url + "/del/" + this.sitioDel_Id)
        .then(response => {
          this.$refs["my-modal-del"].hide();
          this.showMessages(response.data.status);
          this.listarCategoria(this.categoria);
        })
        .catch(function(error) {
          this.showMessages(response.data.status);
        });
    },

    formVolver() {
      this.tablaSitios = true;
      this.formTipo = "";
      // Reset Campos
      this.formUpd.idSitio = "";
      this.formUpd.nombre_sitio = "";
      this.formUpd.url = "";
      this.formUpd.latitud = "";
      this.formUpd.longitud = "";
      this.formUpd.hora_apertura = "";
      this.formUpd.hora_cierre = "";
      this.formUpd.voucher = "";
    },

    formAddSitio() {
      this.tablaSitios = false;
      this.formTipo = "add";
      this.titulo = "Alta de Nuevo Sitio";

      // Reset Campos
      this.selected = null;
      this.formUpd.idSitio = "";
      this.formUpd.nombre_sitio = "";
      this.formUpd.responsable = "";
      this.formUpd.url = "";
      this.formUpd.latitud = "";
      this.formUpd.longitud = "";
      this.formUpd.hora_apertura = "";
      this.formUpd.hora_cierre = "";
      this.formUpd.voucher = "";
    },
    formModSitio(idSitio) {
      this.tablaSitios = true;
      this.selSitio(idSitio);
      this.formTipo = "mod";
      this.titulo = "Modificacion de Sitio";
    },

    addSitio() {
      axios
        .post(this.url + "/add/", {
          id_categoria: this.selected,
          nombre_sitio: this.formUpd.nombre_sitio,
          barrio: this.formUpd.barrio,
          latitud: this.formUpd.latitud,
          longitud: this.formUpd.longitud,
          url: this.formUpd.url,
          responsable: this.formUpd.responsable,
          hora_apertura: this.formUpd.hora_apertura,
          hora_cierre: this.formUpd.hora_cierre,
          voucher: this.formUpd.voucher
        })
        .then(response => {
          //console.log(response.data.status);
          this.$refs["my-modal-add"].hide();
          this.showMessages(response.data.status);  
        })
        .catch(function(error) {
          this.$refs["my-modal-add"].hide();
          this.showMessages(response.data.status);
        });
    },

    showMessages(mensaje) {
      this.$noty.info(mensaje, {
        killer: true,
        timeout: 5000,
        theme: 'sunset',
        layout: "topRight",
        progressBar: true
      });
    },
    updSitio() {
      axios
        .post(this.url + "/upd/", {
          idSitio: this.formUpd.idSitio
          /*
          id_categoria: this.selected,
          nombre_sitio: this.formUpd.nombre_sitio,
          barrio: this.formUpd.barrio,
          latitud: this.formUpd.latitud,
          longitud: this.formUpd.longitud,
          url: this.formUpd.url,
          responsable: this.formUpd.responsable,
          hora_apertura: this.formUpd.hora_apertura,
          hora_cierre: this.formUpd.hora_cierre,
          voucher: this.formUpd.voucher  */
        })
        .then(response => {
          console.log(response.status);
          this.showMessages("Test");
        })
        .catch(function(error) {
          console.log(response.status);
        });
    },

    selSitio(idSitio) {
      axios
        .get(this.url + "/sel/" + idSitio)
        .then(response => {
          this.sitioUpd = response.data;
          this.selected = this.sitioUpd[0].id_categoria;
          this.formUpd.idSitio = idSitio;
          this.formUpd.nombre_sitio = this.sitioUpd[0].nombre_sitio;
          this.formUpd.url = this.sitioUpd[0].url;
          this.formUpd.responsable = this.sitioUpd[0].responsable;
          this.formUpd.latitud = this.sitioUpd[0].latitud;
          this.formUpd.longitud = this.sitioUpd[0].longitud;
          this.formUpd.hora_apertura = this.sitioUpd[0].hora_apertura;
          this.formUpd.hora_cierre = this.sitioUpd[0].hora_cierre;
          this.formUpd.voucher = this.sitioUpd[0].voucher;
          this.formUpd.coordenadas =  "Lat: " + this.sitioUpd[0].latitud + " || Long: " + this.sitioUpd[0].longitud; 
          ubicarSitio(this.sitioUpd[0].latitud, this.sitioUpd[0].longitud);
        })

        .catch(e => {
          // Capturamos los errores
          console.log(2);
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