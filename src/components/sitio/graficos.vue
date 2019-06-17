<template>
<div>
  <!-- Se muestra el componente apexchart que distribuye los valores de lo objetos options (tipo de gráfico y barrio) y series (datos por categoría) -->
  <apexchart width="1200" type="bar" :options="options" :series="series"></apexchart>
</div>
</template>

<script>
export default {
 
  data: function() {
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: ['Almagro', 'Moron','Castelar','Microcentro','Ciudadela','Caballito','Palermo']
        }
      },
      series: [{
        name: 'Restaurantes',
        data: [150, 50, 68, 70, 5, 120, 85]
      },
      {
        name: 'Bares',
        data: [120, 90, 88, 25, 59, 49, 88]
      },
      {
        name: 'Cines',
        data: [155, 5, 68, 70, 35, 120, 85]
      }]
    }
  }
}
</script>