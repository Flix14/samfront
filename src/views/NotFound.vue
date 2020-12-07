<template>
  <div class="searching">
      <div class="row">
          <div class="central-box col-10 offset-1">
            <i class="bx bx-x-circle big-icon-color"></i>
            <h3>No se encontró el dispositivo</h3>
        </div>

        <div class="w-100 my-5">
            <button class="btn btn-back" @click="$router.push('/')">
                <p>Regresar a inicio</p>
                <i class="bx bx-arrow-back"></i>
            </button>
        </div>
      </div>
  </div>
</template>

<style>
.searching {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.big-icon-color {
    display: flex;
  justify-content: center;
  font-size: 150px;
  color: #dc3545 ;
}

.central-box {
    width: 70%;
}

.btn-back {
    border: 1px solid #ccc!important;
  border-radius: 16px;
}
</style>