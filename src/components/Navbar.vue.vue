  <template>
    <div class="hidden">
      <vs-navbar shadow square center-collapsed >
        <template #left>
          <button class="btn" @click="activeSidebar = !activeSidebar" flat icon>
            <i class='bx bx-menu'></i>
          </button>
        </template>

        <template #right>
          <p>{{distancia*1000}} metros</p>
          <button class="btn"><i class="bx bx-brightness" @click="() => { $bvModal.show('modal-11'); activeSidebar = false; }"></i></button>

        </template>
      </vs-navbar>
      <vs-sidebar
        absolute
        :open.sync="activeSidebar"
        >
        <template #logo>
          <!-- ...img logo -->
          <br>
        </template>
        <vs-sidebar-item id="home">
          <template #icon>
            <i class='bx bx-home'></i>
          </template>
          <div @click="() => { $router.push('/'); activeSidebar = false; }">
          Inicio
          </div>
        </vs-sidebar-item>
        <vs-sidebar-item id="market" >
          <template #icon>
            <i class='bx bx-user'></i>
          </template>
          <div @click="() => { $bvModal.show('modal-11'); activeSidebar = false; }">
            Localización actual
          </div>
        </vs-sidebar-item>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="1"/>
        <vs-sidebar-item id="Estadisticas">
          <template #icon>
            <i class='bx bx-station'></i>
          </template>
          <div @click="() => { $router.push('/estadisticas'); activeSidebar = false; }">
          Estadísticas
          </div>
          
        </vs-sidebar-item>
        <template #footer>
          <vs-row justify="space-between">
            <vs-avatar>
              <strong> ? </strong>
            </vs-avatar>

            <vs-avatar badge-color="danger" badge-position="top-right">
              <i class='bx bx-bell' ></i>
            </vs-avatar>
          </vs-row>
        </template>
      </vs-sidebar>
      <b-modal id="modal-11" ok-only centered title="Mapa">
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

  <b-alert v-if="alerta" class="app-footer" variant="danger" show>
      ¡El dispositivo se alejó demasiado!
    </b-alert>
    </div>
  </template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      activeSidebar: false,
      watchID: null,
      geoLoc: null,
      latitude: null,
      longitude: null,
      distancia: null,
      lat: null,
      lon: null,
      alerta: false
    }
  },
  watch: {
    distancia(newVal, oldVal){
      if(newVal != oldVal){
        let result="";
        let d = new Date();
        result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate() + 
                  " "+ d.getHours()+":"+d.getMinutes();
        this.$store.commit("addEstadistica", {tipo: 'Conexion', fecha: result, latitud: this.lat, longitud: this.lon})
        console.log(result)
      }
      if(newVal > 0.010) {
        this.alerta = true
      } else {
        this.alerta = false
      }
    }
  },
  methods: {
    calDistancia(lat, lon){
      let rad = function(x) {return x*Math.PI/180;}
      var R = 6378.137; //Radio de la tierra en km
      var dLat = rad( lat - this.latitude );
      var dLong = rad( lon - this.longitude );
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(this.latitude)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      //console.log("Distancia" + d.toFixed(3)); //Retorna tres decimales
      this.distancia = d.toFixed(3)
    },
    showLocation(position) {
      console.log(position)
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            //console.log("Latitude : " + this.latitude + " Longitude: " + this.longitude);
         },
         errorHandler(err) {
            if(err.code == 1) {
               console.log("Error: Access is denied!");
            } else if( err.code == 2) {
               console.log("Error: Position is unavailable!");
            }
         },
         getLocationUpdate(){
            
            if(navigator.geolocation){
               
               // timeout at 60000 milliseconds (60 seconds)
               var options = {enableHighAccuracy: true, timeout:60000};
               this.geoLoc = navigator.geolocation;
               this.watchID = this.geoLoc.watchPosition(this.showLocation, this.errorHandler, options);
            } else {
               console.log("Sorry, browser does not support geolocation!");
            }
         }
  },
  async mounted() {
    this.getLocationUpdate()
    const interval = setInterval(async () => {
      let latPrel
      let lonPrel
   if(this.$store.getters['status']) {

          await axios.get(`http://${this.$store.getters['ip']}/?2`).then(res => {
            
            latPrel = res.data.split(":").pop().split(",")[1]/100
            lonPrel = res.data.split(":").pop().split(",")[2]/-100
          }).catch(e => {
            console.log(e)
          }) 
          let latMin = latPrel.toString().split(".")[1]/60
          let lonMin = lonPrel.toString().split(".")[1]/60
          this.lat = latPrel.toString().split(".")[0] + "." + latMin.toString().replace(".", "")
          this.lon = lonPrel.toString().split(".")[0] + "." + lonMin.toString().replace(".", "")
          //console.log("Lat: " + this.lat)
         // console.log("Lon: " + this.lon)
          this.calDistancia(this.lat, this.lon)
        }
 }, 5000);

interval
//clearInterval(interval);
  }
}
</script>

<style >
.app-footer {
        height: 40px;
        bottom: 0;
        min-width: 100%;
        z-index: 100 !important;
        border-top: 1px solid rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0 7px 8px rgba(0, 0, 0, 0.12);
        -moz-box-shadow: 0 7px 8px rgba(0, 0, 0, 0.12);
        box-shadow: 0 7px 8px rgba(0, 0, 0, 0.12);
    }
</style>