<template>
  <div class="modal_box">
    <div class="row gx-1">
      <span>鑽探機型號 :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>套管尺寸/吋 :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>套管長度/公尺 :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>劈管尺寸/公分 :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>劈管擊錘重量/公斤 :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>Drop/公分 :</span>
      <input type="text" class="form-control" />
    </div>
    <MakeButton btn_class="btn_blue" class="long_btn" @click="addAuger">新增</MakeButton>
  </div>
</template>

<script setup>
import MakeButton from '@/views/MakeComponents/MakeButton.vue'

const emit = defineEmits(['closeEvent'])
const addAuger = () => {
  emit('closeEvent')
}
</script>

<style scoped>
.modal_box {
  width: 20vw;
  min-width: 300px;
}
.row {
  margin-bottom: 1rem;
}
.row span {
  color: black;
  font-size: 16px;
  padding-bottom: 0.5rem;
}
.position {
  padding: 0 1rem;
}
.long_btn {
  border: 0;
  width: 100%;
}
</style>
