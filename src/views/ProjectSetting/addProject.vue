<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>專案管理</span>
    <button class="btn_add" @click="addProject">新增專案</button>
  </div>
  <!-- 內容 -->
  <div class="project_box">
    <MakeTable :table_header="projectHeader" :table_data="projectList" table_scroll="60vh">
      <template #cell(name)="data">
        <span class="text_btn" @click="editProject">{{ data.value }}</span>
      </template>
      <template #cell(email)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(people)="data">
        <span>{{ data.value }}</span>
      </template>
    </MakeTable>
  </div>
  <MakeModal :modal-open="isAdd" title="新增專案" @closeEvent="closeAddModal">
    <addProjectModal @closeEvent="closeAddModal"></addProjectModal>
  </MakeModal>
  <MakeModal :modal-open="isEdit" title="編輯專案" @closeEvent="closeEditModal">
    <editProjectModal @closeEvent="closeEditModal"></editProjectModal>
  </MakeModal>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeModal from '@/views//MakeComponents/MakeModal.vue'
import addProjectModal from '@/views/ProjectSetting/addProjectModal.vue'
import editProjectModal from '@/views/ProjectSetting/editProjectModal.vue'
import { ref, reactive } from 'vue'

// 表格標題
const projectHeader = reactive([
  { key: 'name', label: '專案名稱', sort: false, width: '40%' },
  { key: 'email', label: '信箱', sort: false, width: '30%' },
  { key: 'people', label: '負責人', sort: false, width: '10%' },
])
// 表格內容
const projectList = ref([
  {
    name: '地質鑽探系統地質鑽探系統地質鑽探系統地質鑽探系統地質鑽探系統地質鑽探系統',
    people: '正常人',
    email: 'MaaMaaMaaMaa@gmail.com',
  },
])

//新增專案modal
const isAdd = ref(false)
const addProject = () => {
  isAdd.value = true
}
const closeAddModal = () => {
  isAdd.value = false
}
//編輯專案modal
const isEdit = ref(false)
const editProject = () => {
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
