<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
     
      <b-form-group id="label-titulopromo" label="Titulo de la Promocion:" label-for="titulopromo">
        <b-form-input
          id="titulopromo"
          v-model="form.titulopromo"
          required
          placeholder="Titulo Promocion"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="label-categoria" label="Categoria Sitio:" label-for="categoria">
        <b-form-select
          id="categoria"
          v-model="form.categoria"
          :options="categoria"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="label-sitio" label="Sitio:" label-for="sitio">
        <b-form-select
          id="sitio"
          v-model="form.sitios"
          :options="sitios"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="label-fechainicio" label="Fecha inicio vigencia:" label-for="fechainicio">
        <b-form-input
          id="fechainicio"
          v-model="form.fechainicio"
          required
          placeholder="Fecha de inicio vigencia"
        ></b-form-input>
      </b-form-group>
      
       <b-form-group id="label-fechafin" label="Fecha fin vigencia:" label-for="fechafin">
        <b-form-input
          id="fechafin"
          v-model="form.fechafin"
          required
          placeholder="Fecha de fin vigencia"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.habilitado" id="checkboxes-4">
          <b-form-checkbox>Habilitado</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Agregar Promo</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>




<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          categoria: null,
          habilitado: 'No'
        },
          categoria: [{ text: 'Seleccionar Categoria', value: null }, 'Restaurant','Cine','Golf','Otro'],
        show: true
      }
    },
    methods: {

      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },

      // metodo para reset 
      onReset(evt) {
        evt.preventDefault()

        this.form.email = ''
        this.form.name = ''
        this.form.categoria = null
        this.form.habilitado = 'No'

        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {  this.show = true    })
      }
    }
  }
</script>