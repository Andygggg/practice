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
  <div class="excel_box" v-else>
    <div class="row gx-1">
        <span class="col-4">Id：{{ labReport.id }}</span
          ><span class="col-4">projectId：{{ labReport.projectId }}</span>
    </div>
    <div class="row gx-1 gy-1">
        <span class="col-4">計畫名稱：{{ labReport.projectName }}</span>
        <span class="col-4">試驗日期：{{ labReport.LabDate }}</span>
        <span class="col-4">{{ labReport.report }}</span>
        <span class="col-4">試驗者：{{ labReport.tester }}</span>
        <span class="col-4">報告簽署人：{{ labReport.checker }}</span>
    </div>
    <div class="excel_table">
      <table class="table-striped table-bordered">
        <thead>
          <tr>
            <th rowspan="2" width="7%">孔號Hole No.</th>
            <th rowspan="2" width="5%">樣號Sample No.</th>
            <th rowspan="2" width="5%">深度Depth m</th>
            <th rowspan="2" width="5%">含水量wn %</th>
            <th rowspan="2" width="5%">比重Gs</th>
            <th rowspan="2" width="5%">液性 限度 LL</th>
            <th rowspan="2" width="5%">塑性 指數 PI</th>
            <th colspan="4" width="16%">粒徑分析 Grain Size %</th>
            <th rowspan="2" width="5%">均勻係數Cu</th>
            <th rowspan="2" width="5%">曲率係數Cc</th>
            <th rowspan="2" width="5%">分類符號 Group Symbol</th>
            <th rowspan="2" width="5%">群組名稱 Group Name</th>
            <th rowspan="2" width="15%">土壤描述 Soil Description</th>
            <th colspan="2" width="12%">備註 Remark</th>
          </tr>
          <tr>
            <th>礫石Gravel</th>
            <th>砂Sand</th>
            <th>粉土Silt</th>
            <th>粘土Clay</th>
            <th>試驗種類Type of Test</th>
            <th>其他說明 Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in labReport.list" :key="index">
            <td>{{ row.Hole }}</td>
            <td>{{ row.Sample }}</td>
            <td>{{ row.Depth }}</td>
            <td>{{ row.Wn }}</td>
            <td>{{ row.Gs }}</td>
            <td>{{ row.LL }}</td>
            <td>{{ row.PI }}</td>
            <td>{{ row.Gravel }}</td>
            <td>{{ row.Sand }}</td>
            <td>{{ row.Silt }}</td>
            <td>{{ row.Clay }}</td>
            <td>{{ row.Cu }}</td>
            <td>{{ row.Cc }}</td>
            <td>{{ row.Symbol }}</td>
            <td>{{ row.Name }}</td>
            <td>{{ row.Description }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.other }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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

const labReport = ref({
  id: '23130',
  projectId: '21110',
  projectName: '123',
  LabDate: '23',
  report: '34',
  tester: '45',
  checker: '6',
  list: [
    {
      Hole: '1',
      Sample: '2',
      Depth: '3',
      Wn: '4',
      Gs: '5',
      LL: '6',
      PI: '7',
      Gravel: '8',
      Sand: '9',
      Silt: '10',
      Clay: '11',
      Cu: '12',
      Cc: '13',
      Name: '14',
      Symbol: '14-1',
      Description: '15',
      type: '16',
      other: '17',
    },
  ],
})
const isObject = computed(() => {
  if (Object.keys(labReport.value).length === 0) {
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
      let ExcelSheet, worksheet
      const data = e.target.result
      const fixedData = fixData(data)
      const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
      for (let index = 0; index < workbook.SheetNames.length; index++) {
        const SheetName = workbook.SheetNames[index]
        worksheet = workbook.Sheets[SheetName]
        ExcelSheet = XLSX.utils.sheet_to_json(worksheet)
        if (SheetName === '分類報告' && index === 0) {
          SetLabReport(ExcelSheet)
        }
      }
    }
    reader.readAsArrayBuffer(f)
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
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(data.byteLength / w * w)))
  return o
}
// 重新包裝excel資料
const SetLabReport = (ExcelSheet) => {
  const LabLength = ExcelSheet.length
  const LabId = Object.keys(ExcelSheet[0])
  const LabProject = Object.keys(ExcelSheet[LabLength - 3])
  const LabReport = Object.keys(ExcelSheet[LabLength - 2])
  const LabData = Object.keys(ExcelSheet[LabLength - 1])

  //將excel日期包裝成yyyy-mm-dd格式
  const excelDate = ExcelSheet[LabLength - 1][LabData[3]]
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const excelStartDate = new Date(1899, 11, 31)
  const offsetMilliseconds = excelDate * millisecondsPerDay
  const jsDate = new Date(excelStartDate.getTime() + offsetMilliseconds)
  const year = jsDate.getFullYear()
  const month = (jsDate.getMonth() + 1).toString().padStart(2, '0')
  const day = jsDate.getDate().toString().padStart(2, '0')
  // 轉成 "yyyy-MM-dd" 格式
  const formattedDate = `${year}-${month}-${day}`
 
  //處理表格的資料
  const FixedLabList = []
  for (let i = 3; i < LabLength - 3; i++) {
    const keys = Object.keys(ExcelSheet[i])
    if (keys.length > 1) {
      const Data = ExcelSheet[i]
      const item = {
        Hole: Data[keys[0]],
        Sample: Data[keys[1]],
        Depth: Data[keys[2]],
        Wn: Data[keys[3]],
        Gs: Data[keys[4]],
        LL: Data[keys[5]],
        PI: Data[keys[6]],
        Gravel: Data[keys[7]],
        Sand: Data[keys[8]],
        Silt: Data[keys[9]],
        Clay: Data[keys[10]],
        Cu: Data[keys[11]],
        Cc: Data[keys[12]],
        Symbol: Data[keys[13]],
        Name: Data[keys[14]],
        Description: Data[keys[15]],
        type: Data[keys[16]],
        other: Data[keys[17]],
      }
      FixedLabList.push(item)
    }
  }

  //將資料丟進labReport
  const labReport_item = {
    id: ExcelSheet[0][LabId[0]],
    projectId: ExcelSheet[0][LabId[1]],
    list: FixedLabList,
    projectName: ExcelSheet[LabLength - 3][LabProject[2]],
    LabDate: formattedDate,
    report: ExcelSheet[LabLength - 2][LabReport[0]],
    tester: ExcelSheet[LabLength - 1][LabData[1]],
    checker: '',
  }
  Object.assign(labReport.value, labReport_item)
}

const resetExcel = () => {
  labReport.value = {}
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
.excel_box {
  width: 80vw;
  height: auto;
  min-width: 400px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.excel_box .row span {
  font-size: 16px;
  font-weight: 600;
}
.excel_table {
  max-height: 50vh;
  width: auto;
  overflow: auto;
}
.excel_table table {
  height: 100%;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgb(212, 212, 212);
  min-width: 1100px;
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
.excel_box .btn_box {
  float: right;
  margin-top: 1rem;
}
</style>
