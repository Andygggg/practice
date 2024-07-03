<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>樣本描述</span>
  </div>
  <!-- 表格 -->
  <div class="describe_box">
    <MakeTable
      :table_header="describeHeader"
      :table_data="initData.sample_list"
      table_scroll="60vh"
    >
      <template #cell(start)="data">
        <input type="text" class="form-control" :disabled="isEdit" v-model="data.item.start" />
      </template>
      <template #cell(final)="data">
        <input type="text" class="form-control" :disabled="isEdit" v-model="data.item.final" />
      </template>
      <template #cell(list)="data">
        <div class="Description_row" v-if="!isEdit">
          <div v-for="(item, i) in data.item.list" :key="i">
            <input
              type="text"
              class="form-control"
              :disabled="isEdit"
              list="sample"
              v-model="data.item.list[i]"
            />
            <span @click="delDescription(data.index, i)"><i class="bx bxs-trash-alt"></i></span>
            <datalist id="sample">
              <option v-for="(sample, i) in sample_type" :key="i">
                {{ sample.sample }}
              </option>
            </datalist>
          </div>
          <span @click="addDescription(data.index)"><i class="bx bxs-plus-circle"></i></span>
        </div>
        <div class="Description_row" v-else>{{ multipedDescription(data.index) }}</div>
      </template>
      <template #cell(icon)="data">
        <div v-show="!isEdit">
          <span v-if="data.index === initData.sample_list.length - 1" @click="addTableItem"
          ><i class="bx bxs-plus-square"></i
        ></span>
        <span v-else class="trash_icon" @click="delTableItem(data.index)"><i class="bx bxs-minus-square"></i></span>
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
//表格逼條
const describeHeader = reactive([
  { key: 'start', label: 'start', sort: false, width: '10%' },
  { key: 'final', label: 'final', sort: false, width: '10%' },
  { key: 'list', label: 'Description', sort: false, width: '70%' },
  { key: 'icon', label: '#', sort: false, width: '10%' },
])
// 初始化資料(arr)
const initData = ref({
  id: null,
  No: '21030',
  sample_list: [
    { start: '123', final: '144', list: ['砂質粉土', '黏質粉土','回填土','粉土','卵石','有機質粉土','有機質粉土'] },
    { start: '456', final: '144', list: ['黏土', '巨石'] },
    { start: '789', final: '144', list: ['砂質粉土', '巨石'] },
    { start: '101', final: '144', list: ['黏質粉土', '礫石'] },
    { start: '102', final: '144', list: ['砂', '礫石'] },
    { start: '103', final: '144', list: ['巨石', '砂'] },
  ],
})
// 描述內容
const sample_type = reactive([
  { type: '土壤名稱', sample: '回填土' },
  { type: '土壤名稱', sample: '砂質粉土' },
  { type: '土壤名稱', sample: '粉土' },
  { type: '土壤名稱', sample: '黏質粉土' },
  { type: '土壤名稱', sample: '砂質黏土' },
  { type: '土壤名稱', sample: '粉質黏土' },
  { type: '土壤名稱', sample: '黏土' },
  { type: '土壤名稱', sample: '有機質粉土' },
  { type: '土壤名稱', sample: '機質黏土' },
  { type: '土壤名稱', sample: '巨石' },
  { type: '土壤名稱', sample: '卵石' },
  { type: '土壤名稱', sample: '礫石' },
  { type: '土壤名稱', sample: '砂' },
  { type: '顏色', sample: '1' },
  { type: '塑性', sample: '2' },
  { type: '級配', sample: '3' },
  { type: '稠度/緊密度', sample: '4' },
  { type: '含水量', sample: '5' },
  { type: '量(Quantity)', sample: '6' },
  { type: '物質', sample: '6' },
  { type: 'END', sample: 'End of Boring' },
])
// 新增樣品
const addTableItem = () => {
  let item = { start: '', final: '', list: [] }
  initData.value.sample_list.push(item)
}
// 刪除樣品
const delTableItem = (i) => {
  initData.value.sample_list.splice(i,1)
}
// 新增描述
const addDescription = (i) => {
  initData.value.sample_list[i].list.push('')
}
// 刪除描述
const delDescription = (arr, i) => {
  initData.value.sample_list[arr].list.splice(i,1)
}
// 將描述加上頓號
const multipedDescription = (i) => {
  return initData.value.sample_list[i].list.join("、")
}
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
/* 表格 */
.describe_box {
  width: 100%;
}
.Description_row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.Description_row div {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.Description_row .form-control {
  width: 15%;
  min-width: 150px;
}
/* icon */
.Description_row .bxs-plus-circle {
  cursor: pointer;
  font-size: 1.4rem;
  color: blue;
}
.describe_box .bxs-trash-alt {
  cursor: pointer;
  font-size: 1.4rem;
  color: red;
}
.describe_box .bxs-plus-square {
  cursor: pointer;
  font-size: 1.4rem;
  color: green;
}
.describe_box .bxs-minus-square {
  cursor: pointer;
  font-size: 1.4rem;
  color: rgb(88, 88, 88);
}
/* 輸入框 */
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  text-align: center;
}
</style>
