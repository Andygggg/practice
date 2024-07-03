<template>
  <!-- 工作表標題 -->
  <div class="title_box">
    <span>鑽孔基本資料</span>
  </div>
  <!-- 工作表內容 -->
  <div class="basicInformation_box">
    <div class="row gx-5 gy-5">
      <div class="col-6">
        <span>Project：</span>
        <span>{{ initData.No }}</span>
      </div>
      <div class="col-6">
        <span>Report By：</span>
        <span>陳冠宇</span>
      </div>
      <div class="col-6">
        <span>DATE：</span>
        <input type="date" class="form-control" :disabled="isEdit" />
      </div>
      <div class="col-6">
        <span>Checked By：</span>
        <input type="text" class="form-control" :disabled="isEdit" />
      </div>
      <div class="col-6">
        <span>Location：</span>
        <span>514 彰化縣溪湖鎮富貴十五街28號</span>
      </div>
      <div class="col-6">
        <span>Weather：</span>
        <select class="form-select" aria-label="Default select example" :disabled="isEdit">
          <option v-for="item in dateOption" :key="item.value" :value="item.value">
            {{ item.text }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <span>Hole No.：</span>
        <select class="form-select" aria-label="Default select example" :disabled="isEdit">
          <option v-for="item in dateOption" :key="item.value" :value="item.value">
            {{ item.text }}
          </option>
        </select>
      </div>
      <div class="col-4">
        <span>EL：</span>
        <input type="text" class="form-control" :disabled="isEdit" />
      </div>
      <div class="col-4">
        <span>G.W.L：</span>
        <input type="text" class="form-control" :disabled="isEdit" />
      </div>
      <div class="col-4">
        <span>Crew：</span>
        <input type="text" class="form-control" :disabled="isEdit" />
      </div>
      <div class="col-4">
        <span>Working Time：</span>
        <input type="text" class="form-control" :disabled="isEdit" />
      </div>
      <div class="col-4">
        <span>Sheet No.：</span>
        <input type="text" class="form-control" :disabled="isEdit" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// 判斷儲存編輯狀態
const isEdit = ref(false)
const dateOption = reactive([
  { value: 0, text: '當日' },
  { value: 1, text: 'all' },
])
// 初始化資料(array)
const initData = ref({
  id: null,
  No: '21030',
})

defineExpose({
  isEdit,
})
</script>

<style scoped>
/* 標題 */
.title_box {
  height: auto;
  width: 100%;
  border-bottom: 3px rgb(156, 155, 155) solid;
  margin-bottom: 1rem;
}
.title_box span {
  font-size: 22px;
  font-weight: 600;
}
/* 內容 */
.basicInformation_box {
  padding: 0rem 1.5rem;
}
.row {
  align-items: center;
}
.row div span:first-child {
  color: black;
  font-size: 16px;
  font-weight: 600;
}
/* 輸入框 */
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
.form-select{
  width: 80%;
}
.form-select:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
</style>
