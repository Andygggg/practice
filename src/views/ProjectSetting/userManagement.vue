<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>使用者管理</span>
    <button class="btn_add" @click="addUser" v-if="projectSetting.chooseTitle == '所有人員'">新增使用者</button>
    <button class="btn_add" @click="assignUser" v-else>指派使用者</button>
  </div>
  <!-- 內容 -->
  <div class="project_box">
    <div class="project_type">
      <ul>
        <li
          v-for="item in projectSetting.project_title"
          :key="item"
          @click="projectSetting.changeTitle(item.title)"
          :class="{ photo_btn_now: item.title === projectSetting.chooseTitle }"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <MakeTable :table_header="peopleHeader" :table_data="filter_peopleList" table_scroll="60vh" class="table_width">
      <template #cell(peopleID)="data">
        <span class="text_btn" @click="editUser">{{ data.value }}</span>
      </template>
      <template #cell(peopleName)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(peopleEmail)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(peoplePhone)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(peopleWork)="data">
        <span>{{ data.value }}</span>
      </template>
      <template #cell(peopleSystem)="data">
        <span>{{ data.value }}</span>
      </template>
    </MakeTable>
  </div>
  <MakeModal :modal-open="isAdd" title="新增使用者" @closeEvent="closeAddModal">
    <addUserModal @closeEvent="closeAddModal"></addUserModal>
  </MakeModal>
  <MakeModal :modal-open="isEdit" title="編輯使用者" @closeEvent="closeEditModal">
    <editUserModal @closeEvent="closeEditModal"></editUserModal>
  </MakeModal>
  <MakeModal :modal-open="isAssign" title="指派使用者" @closeEvent="closeAssignModal">
    <assignUserModal @closeEvent="closeAssignModal"></assignUserModal>
  </MakeModal>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeModal from '@/views//MakeComponents/MakeModal.vue'
import addUserModal from '@/views/ProjectSetting/addUserModal.vue'
import editUserModal from '@/views/ProjectSetting/editUserModal.vue'
import assignUserModal from '@/views/ProjectSetting/assignUserModal.vue'
import { useProjectSetting } from '@/stores/projectSetting.js'
import { ref, reactive, computed } from 'vue'

const projectSetting = useProjectSetting()

// 表格標題
const peopleHeader = reactive([
  { key: 'peopleID', label: '編號', sort: false, width: '10%' },
  { key: 'peopleName', label: '姓名', sort: false, width: '10%' },
  { key: 'peopleEmail', label: '信箱', sort: false, width: '30%' },
  { key: 'peoplePhone', label: '電話', sort: false, width: '10%' },
  { key: 'peopleWork', label: '部門', sort: false, width: '10%' },
  { key: 'peopleSystem', label: '系統權限', sort: false, width: '30%' },
])
// 表格內容
const peopleList = ref([
  {
    peopleID: '001',
    peopleName: '陳阿宇',
    peopleEmail: 'chenguan@gmail.com',
    peoplePhone: '09778888889',
    peopleWork: '資訊部',
    peopleSystem: '專案管理員',
    project: ['地質鑽探系統A'],
  },
  {
    peopleID: '002',
    peopleName: '陳阿宇',
    peopleEmail: 'chenguan@gmail.com',
    peoplePhone: '09778888889',
    peopleWork: '結構部',
    peopleSystem: '專案管理員',
    project: ['地質鑽探系統B'],
  },
  {
    peopleID: '003',
    peopleName: '陳阿宇',
    peopleEmail: 'chenguan@gmail.com',
    peoplePhone: '09778888889',
    peopleWork: '大地部',
    peopleSystem: '專案管理員',
    project: ['地質鑽探系統A', '地質鑽探系統B'],
  },
])

const filter_peopleList = computed(() => {
  if (projectSetting.chooseTitle === '所有人員') {
    return peopleList.value
  } else {
    return peopleList.value.filter(element => 
      element.project.includes(projectSetting.chooseTitle)
    )
  }
})

//新增使用者modal
const isAdd = ref(false)
const addUser = () => {
  isAdd.value = true
}
const closeAddModal = () => {
  isAdd.value = false
}
//編輯使用者modal
const isEdit = ref(false)
const editUser = () => {
  isEdit.value = true
}
const closeEditModal = () => {
  isEdit.value = false
}
//指派使用者modal
const isAssign = ref(false)
const assignUser = () => {
  isAssign.value = true
}
const closeAssignModal = () => {
  isAssign.value = false
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
  display: flex;
  flex-direction: row;
}
.project_box .table_width {
  flex-grow: 0.8;
}
.text_btn {
  color: blue;
  border-bottom: 1px blue solid;
  cursor: pointer;
}
.project_type {
  margin-right: 12px;
  flex-grow: 0.1;
  width: 300px;
}
.project_type ul {
  list-style: none;
  padding-left: 1rem;
}
.project_type ul li {
  padding: 0.7rem 0.5rem;
  background-color: rgb(247, 170, 54);
  margin-bottom: 1rem;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  vertical-align: middle;
}
.project_type ul li:hover {
  background-color: rgb(243, 109, 0);
  color: white;
}
.photo_btn_now {
  background-color: rgb(243, 109, 0) !important;
  color: white;
}
</style>
