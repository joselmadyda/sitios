<template>
  <div>
    <div class="container-fluid">
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
      </div>
    </div>
    <br>
    <div v-if="categoria == null"></div>
    <div v-else>
      <vue-bootstrap4-table
        :rows="rows"
        :columns="columns"
        :config="config"
        :actions="actions"
        @on-eliminar="eliminar"
        @on-agregar="agregar"
      ></vue-bootstrap4-table>
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
      rows: [],
      columns: [],
      action: [],
      url: "http://localhost:8090/api/sitios",
      config: {
        checkbox_rows: true,
        rows_selectable: true,
        card_title: "",
        per_page: 5, 
      }
    };
  },
  methods: {
    listarSitiosBD(id_cat) {
      (this.rows = []),
        axios
          .get(this.url)
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
      console.log(payload);
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