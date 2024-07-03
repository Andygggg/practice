<template>
  <div class="modal_box">
    <div class="row gx-1">
      <span>孔位名稱：</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>孔位位置：</span>
      <input type="text" class="form-control" />
    </div>
    <MakeButton btn_class="btn_blue" class="long_btn">儲存</MakeButton>
  </div>
</template>

<script setup>
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
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
