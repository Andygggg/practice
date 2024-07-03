<template>
  <div class="modal_box">
    <div class="row gx-1">
      <span>廠商名稱 :</span>
      <input type="text" class="form-control" :disabled="isEdit" />
    </div>
    <div class="row gx-1">
      <span>聯絡地址 :</span>
      <input type="text" class="form-control" :disabled="isEdit" />
    </div>
    <div class="row gx-1">
      <span>連絡人 :</span>
      <input type="text" class="form-control" :disabled="isEdit" />
    </div>
    <div class="row gx-1">
      <span>連絡電話 :</span>
      <input type="text" class="form-control" :disabled="isEdit" />
    </div>
    <div class="row gx-1">
      <span>聯絡信箱 :</span>
      <input type="text" class="form-control" :disabled="isEdit" />
    </div>
    <div class="btn_row">
      <MakeButton btn_class="btn_red" class="long_btn" @click="delCompany"> 刪除 </MakeButton>
      <MakeButton btn_class="btn_blue" class="long_btn" @click="changeStatus">
        <span v-if="isEdit">編輯</span>
        <span v-else>儲存</span>
      </MakeButton>
    </div>
  </div>
</template>

<script setup>
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import { ref } from 'vue'

const isEdit = ref(true)
const changeStatus = () => {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    console.log('save')
  } else {
    console.log('edit')
  }
}

const emit = defineEmits(['closeEvent'])
const delCompany = () => {
  const check = confirm('確定刪除?')
  if (check) {
    alert('廠商刪除成功')
    emit('closeEvent')
  } else {
    alert('廠商刪除取消')
    return
  }
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
.btn_row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.long_btn {
  border: 0;
  width: 100%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
</style>
