<template>
  <div class="searching">
      <div class="central-box">
          <b-spinner class="my-3" style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
          <h3 class="my-3"><strong>Buscando...</strong></h3>
          <br>
          <br>
          <button class="btn btn-danger" @click="$router.back()">Cancelar</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        async conectarConDispositivo() {
            let ip = this.$store.getters['ip']
            await axios.get(`http://${ip}/?1`).then(res => {
                let data = res.data
                if(data == 'Success'){
                    this.$store.commit("setStatus", 1)
                this.$router.push('/success')
                } else {
                console.log(res)
                }
            }).catch(() => {
                this.$router.push("/notfound")
            })
        }
    },
    async mounted() {
        if(this.$store.getters['status']) {
            this.$router.push("/success")
        }else {
            await this.conectarConDispositivo()
        }
    }
}
</script>

<style>
.searching {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

</style>