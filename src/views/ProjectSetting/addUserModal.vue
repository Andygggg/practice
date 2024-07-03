<template>
  <div class="modal_box">
    <div class="row gx-1">
      <span>姓名 :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>E-mail :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>電話 :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>部門 :</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>系統權限 :</span>
      <input type="text" class="form-control" />
    </div>
    <MakeButton btn_class="btn_blue" class="long_btn" @click="addUser">新增</MakeButton>
  </div>
</template>

<script setup>
import MakeButton from '@/views/MakeComponents/MakeButton.vue'

const emit = defineEmits(['closeEvent'])
const addUser = () => {
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
