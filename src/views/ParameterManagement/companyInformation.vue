<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>廠商資訊</span>
    <button class="btn_add" @click="addCompany">新增廠商</button>
  </div>
  <!-- 內容 -->
  <div class="project_box">
    <MakeTable :table_header="companyHeader" :table_data="companyList" table_scroll="60vh">
      <template #cell(company_name)="data">
        <span class="text_btn" @click="editCompany">{{ data.value }}</span>
      </template>
      <template #cell(company_address)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(company_people)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(company_phone)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(company_email)="data">
        <span>{{ data.value }}</span>
      </template>
    </MakeTable>
  </div>
  <MakeModal :modal-open="isAdd" title="新增廠商" @closeEvent="closeAddModal">
    <addCompanyModal @closeEvent="closeAddModal"></addCompanyModal>
  </MakeModal>
  <MakeModal :modal-open="isEdit" title="編輯廠商" @closeEvent="closeEditModal">
    <editProjectModal @closeEvent="closeEditModal"></editProjectModal>
  </MakeModal>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeModal from '@/views//MakeComponents/MakeModal.vue'
import addCompanyModal from '@/views/ParameterManagement/addCompanyModal.vue'
import editProjectModal from '@/views/ProjectSetting/editProjectModal.vue'
import { ref, reactive } from 'vue'

// 表格標題
const companyHeader = reactive([
  { key: 'company_name', label: '廠商名稱', sort: false, width: '30%' },
  { key: 'company_address', label: '聯絡地址', sort: false, width: '30%' },
  { key: 'company_people', label: '連絡人', sort: false, width: '10%' },
  { key: 'company_phone', label: '連絡電話', sort: false, width: '10%' },
  { key: 'company_email', label: '聯絡信箱', sort: false, width: '20%' },
])
// 表格內容
const companyList = ref([
  {
    company_name: '亞新工程顧問股份有限公司',
    company_people: '正常人',
    company_phone: '02 2696 1555',
    company_email: 'MaaMaaMaaMaa@gmail.com',
    company_address: '221新北市汐止區新台五路一段112號',
  },
])

//新增廠商modal
const isAdd = ref(false)
const addCompany = () => {
  isAdd.value = true
}
const closeAddModal = () => {
  isAdd.value = false
}
//編輯廠商modal
const isEdit = ref(false)
const editCompany = () => {
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
