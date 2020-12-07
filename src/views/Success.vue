<template>
<div>
    <div class="col-4 offset-8">
      <b-form-checkbox name="check-button" v-model="alertas" switch>
        Alertas
      </b-form-checkbox>
    </div>
    <div class="searching">
      <div class="row">
          <div class="central-box col-10 offset-1">
            <i class="bx bx-check-circle big-icon-color-green"></i>
            <h3>Conectado correctamente</h3>
        </div>

        <div class="w-100 my-5">
            <button class="btn btn-danger" @click="desconectar">
                Desconectar
            </button>
        </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      alertas: false
    }
  },
    methods: {
        desconectar() {
            this.$store.commit("setStatus", 0)
            this.$router.push("/")
        }
    },
    watch: {
      alertas(newVal) {
        this.$store.commit("setAlertas", newVal)
      }
    },
    mounted() {
        console.log(this.$store.getters['status'])
        if(this.$store.getters['status']) {
            this.$store.commit("setStatus", 1)
            this.alertas = this.$store.getters['alertas']

        }else {
            this.$store.commit("setIp", null)
            this.$router.push("/")
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

.big-icon-color-green {
    display: flex;
  justify-content: center;
  font-size: 150px;
  color: green ;
}

.central-box {
    width: 70%;
}

.btn-back {
    border: 1px solid #ccc!important;
  border-radius: 16px;
}
</style>