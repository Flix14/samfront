<template>
  <div class="home">
    <br>
    <br>
    <br>
    <br>
    <br>
    <button class="btn btn-search-device" v-b-modal.modal-1>
      <i class="bx bx-bluetooth big-icon"></i>
      <br>
      <strong>Detectar dispositivo</strong>

      <div>
        <b-modal id="modal-1" title="IP del dispositivo" centered @ok="conectarConDispositivo">
          <b-input-group prepend="IP:" class="mt-3">
            <b-form-input v-model="ip"></b-form-input>
          </b-input-group>
        </b-modal>
      </div>

      
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ip: null
    }
  },
  methods: {
    async conectarConDispositivo() {
      this.$store.commit("setIp", this.ip)
      this.$router.push('/searching')
    }
  },
  mounted() {
    if(this.$store.getters['status']) {
      this.$router.push("/success")
    }
  }
}
</script>

<style>
.home {
  height: 80vh;
}
.btn-search-device {
  border: 1px solid #ccc!important;
  border-radius: 16px;
  width: 70%;
  height: 50%;
  background-color: rgba(0, 0, 0, .05)!important;
}
.big-icon {
  display: flex;
  justify-content: center;
  font-size: 50px;
}
</style>