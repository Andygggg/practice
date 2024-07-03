<template>
  <div class="modal_box">
    <MakeTable
      :table_header="peopleHeader"
      :table_data="peopleList"
      table_scroll="60vh"
      class="table_width"
      >\
      <template #cell(isChecked)="data">
        <input type="checkbox" id="checkbox" v-model="data.item.isChecked" />
      </template>
      <template #cell(peopleID)="data">
        <span>{{ data.value }}</span>
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
    <MakeButton btn_class="btn_blue" class="btn_assign" @click="assignUser"> 指派人員 </MakeButton>
  </div>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import { ref, reactive, onMounted } from 'vue'
import { useProjectSetting } from '@/stores/projectSetting.js'

const projectSetting = useProjectSetting()
// 表格標題
const peopleHeader = reactive([
  { key: 'isChecked', label: '勾選', sort: false, width: '5%' },
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
  {
    peopleID: '004',
    peopleName: '陳阿宇',
    peopleEmail: 'chenguan@gmail.com',
    peoplePhone: '09778888889',
    peopleWork: '大地部',
    peopleSystem: '專案管理員',
    project: [],
  },
])

onMounted(() => {
  peopleList.value.forEach(el => el.isChecked = false)
})

const emit = defineEmits(['closeEvent'])
const assignUser = () => {
  peopleList.value.forEach(item => {
    if (item.isChecked === true) {
      item.project.push(projectSetting.chooseTitle)
    }
  })
  console.log(peopleList.value, projectSetting.chooseTitle);
  emit('closeEvent')
}
</script>

<style scoped>
.modal_box {
  width: auto;
  min-width: 600px;
}
.btn {
  padding: 3px 6px;
}
.btn_assign {
  float: right;
  margin-top: 10px;
}
</style>
