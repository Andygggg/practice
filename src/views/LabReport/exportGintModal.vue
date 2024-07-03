<template>
  <div class="modal_box">
    <div class="row gx-1">
      <span>鑽探日報表：</span>
      <select class="form-select" aria-label="Default select example">
        <option selected>請選擇報表</option>
        <option v-for="item in reportList" :key="item.value" :value="item.value">
          {{ item.text }}
        </option>
      </select>
    </div>
    <div class="row gx-1">
      <span>試驗室報表：</span>
      <select class="form-select" aria-label="Default select example">
        <option selected>請選擇報表</option>
        <option v-for="item in reportList" :key="item.value" :value="item.value">
          {{ item.text }}
        </option>
      </select>
    </div>
    <MakeButton btn_class="btn_blue" class="long_btn">匯出</MakeButton>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'

const reportList = reactive([
  { value: 0, text: 's-1-1' },
  { value: 1, text: 'q-1-1' },
  { value: 2, text: 'a-1-1' },
])
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
