<template>
  <div>
    <div class="container-fluid">
      
      <!-- fila1 --->
      <div class="row">
        
        <div class="col">
          <span v-if="categoria == null || categoria != 1 || mapa == true"> 
          <button type="button" @click="listarCategoria(1)" class="btn btn-block btn-outline-primary waves-effect">R E S T A U R A N T E S</button> </span>
          <span v-else>
            <button type="button" @click="cargarsitiosBD(1)" class="btn btn-block btn-outline-primary waves-effect">M A P S</button></span>
        </div>
        <div class="col">
          <span v-if="categoria == null || categoria != 2 || mapa == true">
            <button type="button"  @click="listarCategoria(2)" class="btn btn-block btn-outline-primary waves-effect" >B A R E S</button></span>
          <span v-else>
            <button  type="button" @click="cargarsitiosBD(2)"  class="btn btn-block btn-outline-primary waves-effect"  >M A P S</button></span>
        </div>
        <div class="col">
          <span v-if="categoria == null || categoria != 3 || mapa == true">
            <button type="button"  @click="listarCategoria(3)" class="btn btn-block btn-outline-primary waves-effect">T E A T R O S</button></span>
          <span v-else>
            <button type="button" @click="cargarsitiosBD(3)" class="btn btn-block btn-outline-primary waves-effect">M A P S</button></span>
        </div>
      </div>

      <!-- fila2 --->
      <div class="row">
        <button type="button"  @click="formAddSitio()" class="btn btn-block btn-outline-primary waves-effect">Crear nuevo sitio</button>
      </div>

      <!-- fila3 --->
      <div class="row">
        <table class="table table-hover table-sm"  v-if="tablaSitios == true">
          <thead>
              <td v-for="column in columns">{{column}}</td>
              <td></td><td></td>
          </thead>
          <tbody>
            <tr v-for="row in rows">
              <td>{{row.id}}</td>
              <td>{{row.nombre}}</td>
              <td>{{row.barrio}}</td>
              <td>{{row.url}}</td>
              <td>{{row.apertura}}</td>
              <td>{{row.cierre}}</td>
              <td><button type="button" @click="formModSitio(row.id)" >Modificar </button></td>
              <td><button type="button" @click="delSitio(row.id)" >Borrar    </button></td>
            </tr>
          </tbody>

        </table>
      </div>

    <!-- fila4 --->
      <div v-if="formTipo =='add' || formTipo == 'mod' " class="row">
        <div class="col">
          <b-card class="mt-3" v-bind:header="this.titulo">
              <div> 
                <form id="frm1_upd">
                    <label for="frm1_idsitio">IdSitio:</label>
                    <input type="text" id="frm1_idsitio" class="form-control" v-model="this.formUpd.idSitio" readonly>
                    <br>
                    <label for="frm1_nombresitio">Nombre:</label>
                    <input type="text" id="frm1_nombresitio" class="form-control" v-model="this.formUpd.nombre_sitio">
                    <br>
                    <label for="frm1_url">Url:</label>
                    <input type="text" id="frm1_url" class="form-control" v-model="this.formUpd.url">
                    <br>
                    <label for="frm1_responsable">Responsable:</label>
                    <input type="text" id="frm1_responsable" class="form-control" v-model="this.formUpd.responsable">
                    <br>
                    
                    <label for="frm1_latitud">Latitud:</label>
                    <input type="text" id="frm1_latitud" class="form-control" v-model="this.formUpd.latitud">
                    <br>
                    <label for="frm1_longitud">Longitud:</label>
                    <input type="text" id="frm1_longitud" class="form-control" v-model="this.formUpd.longitud">
                    <br>

                    <label for="frm1_apertura">Hora Apertura:</label>
                    <input type="text" id="frm1_apertura" class="form-control" v-model="this.formUpd.hora_apertura">
                    <br>
                    <label for="frm1_cierre">Hora Cierre:</label>
                    <input type="text" id="frm1_cierre" class="form-control" v-model="this.formUpd.hora_cierre">
                    <br>

                    <label for="frm1_voucher">Voucher:</label>
                    <input type="text" id="frm1_voucher" class="form-control" v-model="this.formUpd.voucher">
                    <br>

                    <div v-if="formTipo=='add'" class="form-group col-sm-12">
                    <button type="button" @click="addSitio()" > Agregar Sitio    </button>
                    </div>

                    <div v-if="formTipo=='mod'" class="form-group col-sm-12">
                    <button type="button" @click="modSitio(row.id)" >Modificar Sitio    </button>
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
          <button @click="buscarSitio" class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"> Buscar </button>

          <gmap-map :center="center" :zoom="17" style="width:100%;  height: 350px;">
            <gmap-marker   :key="index" v-for="(m, index) in markers"
              :position="m.position" :clickable="false"  :draggable="false"
              :icon="m.position.icon"  @click="center=m.position" >
            </gmap-marker>
          </gmap-map>

          </b-card>
        </div>
      <br>

      </div>

    </div>
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
      categoria: null,
      categoria_seleccionada: null,


      formTipo: '',
      tablaSitios: true,

      formUpd: {
        nombreSitio: "Test",
        url: "url"
      },

      mapa: false,
      campoTest: "Test",
      rows: [],
      columns: ['Id','Nombre','Barrio','URL','Hora Apertura','Hora Cierre'],
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

              //Se agregan los datos de latitud, longitud y barrio que se enviarán por servicio
              this.sitio.barrio = this.currentPlace.vicinity;
              this.sitio.latitud = this.currentPlace.geometry.location.lat();
              this.sitio.longitud = this.currentPlace.geometry.location.lng();
            
            }
          },

      ubicarSitio(pLat,pLon) {

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
          }
          )
    },
        
    listarCategoria(id_cat) {
      this.mapa = false;
      this.formSitio = false;
      this.categoria = id_cat;

      //Setear Card Title
      switch(id_cat){
        case 1: this.config.card_title = "RESTAURANTES";
        break;
        case 2: this.config.card_title = "BARES";
        break;       
        case 3: this.config.card_title = "TEATROS";
        break;          
      }
      this.listarSitiosBD(id_cat)
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

          switch(this.categoria) {
            case 1:image = img_resto;
            break;
            case 2:image = img_golf;
            break;
            case 3:image = img_teatro;
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

    delSitio(idSitio){
      alert("borrar: "+idSitio)
      axios
        .post(this.url + "/del/" + idSitio)
        .then(response => {
        })    
    },

    formAddSitio() {
      this.formTipo = 'add'
      this.titulo = 'Alta de Nuevo Sitio'
    },
    formModSitio(idSitio) {
      this.selSitio(idSitio)
      this.formTipo = 'mod'  
      this.titulo = 'Modificacion de Sitio'  
    },

    addSitio() {
      axios
        .post(this.url + "/add/", 
                    {
                      id_categoria:     this.categoria_seleccionada,
                      nombre_sitio:     this.formUpd.nombre_sitio,
                      barrio:           this.formUpd.barrio,
                      latitud:          this.formUpd.latitud,
                      longitud:         this.formUpd.longitud,
                      url:              this.formUpd.url,
                      responsable:      this.formUpd.responsable,
                      hora_apertura:    this.formUpd.hora_apertura,
                      hora_cierre:      this.formUpd.hora_cierre,
                      voucher:          this.formUpd.voucher
        })
        .then(function(response) {
          console.log(response.status);
        })
        .catch(function(error) {
          console.log(response.status);
        });
    },
    updSitio(){
      axios
        .post(this.url + "/upd/", 
                    {
                      id_sitio:         idSitio,
                      id_categoria:     this.categoria_seleccionada,
                      nombre_sitio:     this.formUpd.nombre_sitio,
                      barrio:           this.formUpd.barrio,
                      latitud:          this.formUpd.latitud,
                      longitud:         this.formUpd.longitud,
                      url:              this.formUpd.url,
                      responsable:      this.formUpd.responsable,
                      hora_apertura:    this.formUpd.hora_apertura,
                      hora_cierre:      this.formUpd.hora_cierre,
                      voucher:          this.formUpd.voucher
        })
        .then(function(response) {
          console.log(response.status);
        })
        .catch(function(error) {
          console.log(response.status);
        }); 
    },

    selSitio(idSitio) {
      (this.rows = []),
        axios
          .get(this.url + "/sel/" + idSitio)
          .then(response => {

            this.sitioUpd = response.data;   
            this.formUpd.idSitio       =      idSitio
            this.formUpd.nombre_sitio  =      this.sitioUpd[0].nombre_sitio
            this.formUpd.url           =      this.sitioUpd[0].url
            this.formUpd.responsable   =      this.sitioUpd[0].responsable
            this.formUpd.latitud       =      this.sitioUpd[0].latitud
            this.formUpd.longitud      =      this.sitioUpd[0].longitud
            this.formUpd.hora_apertura =      this.sitioUpd[0].hora_apertura
            this.formUpd.hora_cierre   =      this.sitioUpd[0].hora_cierre
            this.formUpd.voucher       =      this.sitioUpd[0].voucher
            
            ubicarSitio(this.sitioUpd[0].latitud, this.sitioUpd[0].longitud)

            })

          .catch(e => {
            // Capturamos los errores
            console.log(2);
          });
    }

  }
}
    
</script>

<style>
body {
  text-align: center;
}
.input {
  width: 500px;
}
</style>