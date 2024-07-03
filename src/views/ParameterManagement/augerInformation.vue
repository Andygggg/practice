<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>鑽探機規格</span>
    <button class="btn_add" @click="addAuger">新增鑽探機</button>
  </div>
  <!-- 內容 -->
  <div class="project_box">
    <MakeTable :table_header="augerHeader" :table_data="augerList" table_scroll="60vh">
      <template #cell(auger_name)="data">
        <span class="text_btn" @click="editAuger">{{ data.value }}</span>
      </template>
      <template #cell(casing_size)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(casing_depth)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(spilt_spoon_size)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(spilt_spoon_hammer)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(spilt_spoon_drop)="data">
        <span>{{ data.value }}</span>
      </template>
    </MakeTable>
  </div>
  <MakeModal :modal-open="isAdd" title="新增鑽探機" @closeEvent="closeAddModal">
    <addAugerModal @closeEvent="closeAddModal"></addAugerModal>
  </MakeModal>
  <MakeModal :modal-open="isEdit" title="編輯鑽探機" @closeEvent="closeEditModal">
    <editAugerModal @closeEvent="closeEditModal"></editAugerModal>
  </MakeModal>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeModal from '@/views//MakeComponents/MakeModal.vue'
import addAugerModal from '@/views/ParameterManagement/addAugerModal.vue'
import editAugerModal from '@/views/ParameterManagement/editAugerModal.vue'
import { ref, reactive } from 'vue'

// 表格標題
const augerHeader = reactive([
  { key: 'auger_name', label: '鑽探機型號', sort: false, width: '15%' },
  { key: 'casing_size', label: '套管尺寸/吋', sort: false, width: '15%' },
  { key: 'casing_depth', label: '套管長度/公尺', sort: false, width: '15%' },
  { key: 'spilt_spoon_size', label: '劈管尺寸/公分', sort: false, width: '15%' },
  { key: 'spilt_spoon_hammer', label: '劈管擊錘重量/公斤', sort: false, width: '15%' },
  { key: 'spilt_spoon_drop', label: 'Drop/公分', sort: false, width: '15%' },
])
// 表格內容
const augerList = ref([
  {
    auger_name: '要你命3000',
    casing_size: '2000000',
    casing_depth: '200000',
    spilt_spoon_size: '200000',
    spilt_spoon_hammer: '20000',
    spilt_spoon_drop: '20000',
  },
])

//新增鑽探機modal
const isAdd = ref(false)
const addAuger = () => {
  isAdd.value = true
}
const closeAddModal = () => {
  isAdd.value = false
}
//編輯鑽探機modal
const isEdit = ref(false)
const editAuger = () => {
  isEdit.value = true
}
const closeEditModal = () => {
  isEdit.value = false
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
.title_box .btn_add {
  background-color: rgb(252, 252, 252);
  font-size: 16px;
  padding: 5px 7px;
  color: #7963d8;
  border: 1px #7963d8 solid;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.397);
  border-radius: 10px;
  margin-bottom: 5px;
}
.title_box .btn_add:hover {
  color: rgb(255, 255, 255);
  background-color: #7963d8;
}
/* 內容 */
.project_box {
  width: 100%;
}
.text_btn {
  color: blue;
  border-bottom: 1px blue solid;
  cursor: pointer;
}
</style>
