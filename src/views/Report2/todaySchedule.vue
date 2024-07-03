<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>當日行程</span>
    <div class="time_row">
      <span>上午：</span>
      <select class="form-select" aria-label="Default select example" :disabled="isEdit">
        <option v-for="item in weatherOption" :key="item.value" :value="item.value">
          {{ item.text }}
        </option>
      </select>
      <span>下午：</span>
      <select class="form-select" aria-label="Default select example" :disabled="isEdit">
        <option v-for="item in weatherOption" :key="item.value" :value="item.value">
          {{ item.text }}
        </option>
      </select>
    </div>
  </div>
  <!-- 內容 -->
  <div class="schedule_box">
    <MakeTable :table_header="scheduleHeader" :table_data="scheduleList" table_scroll="60vh">
      <template #cell(time)="data">
        <input type="time" class="form-control" :disabled="isEdit" v-model="data.item.time" name="time" />
      </template>
      <template #cell(content)="data">
        <textarea
          type="text"
          class="form-control content"
          :disabled="isEdit"
          v-model="data.item.content"
        />
      </template>
      <template #cell(icon)="data">
        <div v-show="!isEdit">
          <span v-if="data.index === scheduleList.length - 1" @click="addTableItem"
            ><i class="bx bxs-plus-circle"></i
          ></span>
          <span v-else class="trash_icon" @click="delTableItem(data.index)"
            ><i class="bx bxs-trash-alt"></i
          ></span>
        </div>
      </template>
    </MakeTable>
  </div>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import { ref, reactive } from 'vue'

// 判斷儲存編輯狀態
const isEdit = ref(false)
defineExpose({
  isEdit,
})
// 天氣選單
const weatherOption = reactive([
  { value: 0, text: '晴' },
  { value: 1, text: '雨' },
  { value: 2, text: '陰' },
])
// 表格標題
const scheduleHeader = reactive([
  { key: 'time', label: '時間', sort: false, width: '15%' },
  { key: 'content', label: '行程內容<', sort: false, width: '75%' },
  { key: 'icon', label: '#', sort: false, width: '10%' },
])
// 表格內容
const scheduleList = ref([
  { time: '01:00', content: '起床洗臉' },
  { time: '02:00', content: '吃飯' },
  { time: '13:00', content: '晚安??' },
])
// 新增行程
const addTableItem = () => {
  let item = { time: '', content: '' }
  scheduleList.value.push(item)
}
// 刪除形成
const delTableItem = (i) => {
  scheduleList.value.splice(i, 1)
}
</script>

<style scoped>
/* 標題 */
.title_box {
  height: auto;
  width: 100%;
  border-bottom: 3px rgb(156, 155, 155) solid;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title_box span {
  font-size: 22px;
  font-weight: 600;
}
.title_box .time_row {
  display: flex;
  align-items: center;
}
.title_box .time_row span {
  font-size: 18px;
  font-weight: 600;
  white-space:nowrap;
}
/* 內容 */
.schedule_box {
  width: 100%;
}
/* icon */
.schedule_box .bxs-trash-alt {
  cursor: pointer;
  font-size: 1.4rem;
  color: red;
}
.schedule_box .bxs-plus-circle {
  cursor: pointer;
  font-size: 1.4rem;
  color: green;
}
/* 輸入框 */
.content {
  text-align: start !important;
}
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  text-align: center;
}
.form-select:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
</style>
