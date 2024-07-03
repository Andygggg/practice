<template>
  <div class="export_box" v-if="isObject">
    <!-- 上傳區域 -->
    <div id="photo_area" class="excel_upload" @click="uploadExcel">
      <MakeButton btn_class="btn_blue"> 匯入檔案 </MakeButton>
      <span>支援上傳類型：CSV, XLSX 檔案</span>
      <span>僅支援單一檔案匯入，透過點擊按鈕進行匯入</span>
      <input
        type="file"
        ref="inputExcel"
        class="d-none"
        accept=".csv,.xlsx"
        multiple
        @change="handleDrop($event.target.files)"
      />
    </div>
  </div>
  <div class="excel_table" v-else>
    <table class="table-striped table-bordered">
      <thead>
        <tr>
          <th>NO.</th>
          <th v-for="(header, index) in importData.headers" :key="index">
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in importData.data" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-for="(column, index) in Object.keys(row)" :key="index">
            {{ row[column] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="btn_box">
      <MakeButton btn_class="btn_blue" @click="resetExcel"> 重置資料 </MakeButton>
      <MakeButton btn_class="btn_blue" style="margin-left: 1rem" @click="saveExcel"> 儲存 </MakeButton>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import XLSX from 'xlsx'

// const importData = ref({})
const isObject = computed(() => {
  if (importData.value.headers.length === 0 && importData.value.data.length === 0) {
    return true
  } else {
    return false
  }
})
//匯入檔案
const inputExcel = ref(null)
const uploadExcel = () => {
  inputExcel.value.click()
}

const importData = ref({
  headers: [],
  data: [],
})
//抓取excel內容
const handleDrop = (fileList) => {
  const filetype = fileList[fileList.length - 1].type
  if (
    filetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    filetype === 'text/csv'
  ) {
    const f = fileList[fileList.length - 1]
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target.result
      const fixedData = fixData(data)
      const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      importData.value.headers = getHeaderRow(worksheet)
      importData.value.data = XLSX.utils.sheet_to_json(worksheet)
    }
    reader.readAsArrayBuffer(f)
    console.log(importData.value)
  } else {
    alert('不支援的檔案格式！僅支援上傳 XLSX, CSV 檔案')
  }
}
//處理excel大小格式轉換
const fixData = (data) => {
  let o = ''
  const w = 10240
  for (let l = 0; l < data.byteLength / w; ++l) {
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
  }
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice((data.byteLength / w) * w)))
  return o
}
//重新包裝excel開頭欄位
const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  const R = range.s.r
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    let hdr = 'XXX'
    if (cell && cell.t) {
      hdr = XLSX.utils.format_cell(cell)
    } else {
      continue
    }
    headers.push({
      field: hdr,
      name: hdr,
      label: hdr,
    })
  }
  return headers
}

const resetExcel = () => {
  importData.value = {
    headers: [],
    data: [],
  }
  inputExcel.value = null
}

const saveExcel = () => {
  console.log('save');
}
</script>

<style scoped>
.export_box {
  width: 40vw;
  height: 30vh;
  min-width: 400px;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 上傳區域 */
.export_box .excel_upload {
  background-color: #ffffff;
  width: 95%;
  height: 95%;
  border-style: dotted;
  border-color: rgba(0, 0, 0, 0.5);
  border-width: 4px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.export_box .excel_upload span {
  font-size: 1.1rem;
  color: black;
}
.excel_table {
  max-height: 50vh;
  min-height: 300px;
  width: 80vw;
  overflow: auto;
}
.excel_table table {
  height: 100%;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgb(212, 212, 212);
  min-width: 650px;
  overflow-x: scroll;
}
.excel_table th {
  background-color: var(--main-color);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  padding: 0.2rem 0 0.2rem 0;
}
.excel_table thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
.excel_table td {
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}
.excel_table tbody tr:nth-of-type(odd) {
  background-color: #f3f3f3 !important;
}
.excel_table .btn_box {
  margin-top: 1rem;
}
</style>
