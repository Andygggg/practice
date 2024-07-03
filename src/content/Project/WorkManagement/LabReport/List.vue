<template>
  <div class="labReport_box">
    <div class="list_box">
      <div class="functionBar">
        <div class="btn_row">
          <MakeButton btn_class="btn_blue" @click="importExcel">
            <i class="bx bx-upload"></i>試驗室報表匯入
          </MakeButton>
          <MakeButton btn_class="btn_blue" style="margin-left: 1rem" @click="exportGint">
            <i class="bx bxs-download"></i>Gint表匯出
          </MakeButton>
        </div>
        <div class="search_box">
          <span>關鍵字搜尋：</span>
          <select class="form-select" aria-label="Default select example" v-model="date_value">
            <option v-for="item in dateOption" :key="item.value" :value="item.value">
              {{ item.text }}
            </option>
          </select>
          <div class="input_box">
            <input type="text" placeholder="請輸入關鍵字" v-model="keyWord" />
            <i class="bx bx-search-alt-2"></i>
          </div>
        </div>
      </div>
      <div class="table_box">
        <MakeTable
          :table_header="labReportHeader"
          :table_data="filter_labReportList"
          table_scroll="50vh"
          :table_pagination="true"
          :table_page="8"
        >
          <template #cell(hole)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(Reporter)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(date)="data">
            <span>{{ data.value }}</span>
          </template>
        </MakeTable>
      </div>
    </div>
  </div>
  <MakeModal :modal-open="isExport" title="Gint表匯出" @closeEvent="closeExportModal">
    <exportGintModal></exportGintModal>
  </MakeModal>
  <MakeModal :modal-open="isImport" title="試驗室報表匯入" @closeEvent="closeImportModal">
    <importLabReportModal></importLabReportModal>
  </MakeModal>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import MakeModal from '@/views//MakeComponents/MakeModal.vue'
import exportGintModal from '@/views/LabReport/exportGintModal.vue'
import importLabReportModal from '@/views/LabReport/importLabReportModal.vue'
import { computed, reactive, ref } from 'vue'

//表格
const labReportHeader = reactive([
  { key: 'hole', label: '孔位', sort: false },
  { key: 'Reporter', label: 'Report By', sort: false },
  { key: 'date', label: '日期', sort: false },
])
const labReportList = ref([
  {
    hole: 's-1-2',
    Reporter: '陳冠宇',
    date: '2024-06-21',
  },
  {
    hole: 'e-1-1',
    Reporter: '陳冠宇',
    date: '2024-06-21',
  },
  {
    hole: 'r-1-1',
    Reporter: '陳冠宇',
    date: '2024-06-21',
  },
  {
    hole: 'a-1-1',
    Reporter: '陳冠宇',
    date: '2024-06-23',
  },
  {
    hole: 'a-1-1',
    Reporter: '陳冠宇',
    date: '2024-06-22',
  },
])

//關鍵字搜尋
const dateOption = reactive([
  { value: 0, text: '當日' },
  { value: 1, text: 'all' },
])
const date_value = ref(0)
const keyWord = ref('')
const filter_labReportList = computed(() => {
  let filter_date
  if (date_value.value == 0) {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    filter_date = labReportList.value.filter((item) => item.date == formattedDate)
  } else {
    filter_date = labReportList.value
  }
  return filter_date.filter((item) => item.hole.toLowerCase().includes(keyWord.value))
})
//Gint表匯出modal
const isExport = ref(false)
const exportGint = () => {
  isExport.value = true
}
const closeExportModal = () => {
  isExport.value = false
}

//試驗室報表匯入modal
const isImport = ref(false)
const importExcel = () => {
  isImport.value = true
}
const closeImportModal = () => {
  isImport.value = false
}
</script>

<style scoped>
.labReport_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.labReport_box .list_box {
  width: 95%;
  height: 90%;
  overflow: scroll;
  background-color: #ffffff;
  border-radius: 2%;
  padding: 1%;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
}
.list_box .functionBar {
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 850px;
}
.functionBar .btn_row {
  display: flex;
  flex-direction: row;
}
.functionBar .bx {
  font-size: 24px;
}
.search_box {
  flex-grow: 0.2;
  display: flex;
  align-items: center;
}
.search_box span {
  color: black;
  font-size: 16px;
  font-weight: 600;
}
.search_box .form-select {
  width: 20%;
  border: 2px solid rgba(0, 0, 0, 0.459);
  font-size: 14px;
  color: #000000;
  margin-right: 0.5rem;
}
.search_box .input_box {
  position: relative;
  width: 50%;
  flex-grow: 1;
  height: auto;
  color: #000000;
  font-weight: 600;
}
.input_box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.459);
  border-radius: 12px;
  font-size: 14px;
  color: #000000;
  padding: 10px 45px 10px 20px;
}
.input_box input::placeholder {
  color: #000000;
}
.input_box i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}
.table_box {
  padding: 2rem;
  min-width: 850px;
}
</style>
