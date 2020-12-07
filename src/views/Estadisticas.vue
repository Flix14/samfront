<template>
    <div>

      <h2>Estadísticas</h2>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Tipo</th>
      <th scope="col">Fecha</th>
      <th scope="col">Localización</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(estadistica, index) in estadisticas" :key="index">
      <td>{{estadistica.tipo}}</td>
      <td>{{estadistica.fecha}}</td>
      <td><button class="btn btn-success" @click="viewMap(estadistica.latitud, estadistica.longitud)">Ver</button></td>
    </tr>
  </tbody>
</table>
<div>

  <b-modal id="modal-1" ok-only centered title="Mapa">
    <div class="map-view">
            <iframe
                class="google-map col-md-8"
                :src="
                   `https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=${lat},%20${lon}+(Map)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`
                "
                width="100%"
                height="50%"
                frameborder="2"
                style="border:0;"
                allowfullscreen
                aria-hidden="false"
                tabindex="0"
            ></iframe>
        </div>
  </b-modal>
</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      estadisticas: [],
      lat: null,
      lon: null,
    }
  },
  methods: {
    viewMap(latitud, longitud) {
      this.lat = latitud
      this.lon = longitud
      this.$bvModal.show("modal-1")
    }
  },
  mounted(){
    this.estadisticas = this.$store.getters['arrayEstadisticas'].reverse()
  }
}
</script>

<style >

</style>