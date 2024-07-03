<template>
  <div class="report2_box">
    <div class="list_box">
      <div class="functionBar">
        <!-- 功能列表 -->
        <MakeButton btn_class="btn_blue" @click="PushToReport2_Create"
          ><i class="bx bxs-calendar-plus"></i>新增督導日報</MakeButton
        >
         <!-- 關鍵字搜尋 -->
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
      <!-- 表格 -->
      <div class="table_box">
        <MakeTable
          :table_header="report2Header"
          :table_data="filter_report2List"
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
          <template #cell(Checker)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(date)="data">
            <span>{{ data.value }}</span>
          </template>
        </MakeTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

//表格
const report2Header = reactive([
  { key: 'hole', label: '孔位', sort: false },
  { key: 'Reporter', label: 'Report By', sort: false },
  { key: 'Checker', label: 'Checked BY', sort: false },
  { key: 'date', label: '日期', sort: false },
])
// 表格內容
const report2List = ref([
  {
    hole: 's-1-2',
    Reporter: '陳冠宇',
    Checker: '陳冠宇',
    date: '2024-06-21',
  },
  {
    hole: 'e-1-1',
    Reporter: '陳冠宇',
    Checker: '陳冠宇',
    date: '2024-06-21',
  },
  {
    hole: 'r-1-1',
    Reporter: '陳冠宇',
    Checker: '陳冠宇',
    date: '2024-06-21',
  },
  {
    hole: 'a-1-1',
    Reporter: '陳冠宇',
    Checker: '陳冠宇',
    date: '2024-06-23',
  },
  {
    hole: 'a-1-1',
    Reporter: '陳冠宇',
    Checker: '陳冠宇',
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
const filter_report2List = computed(() => {
  let filter_date
  if (date_value.value == 0) {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    filter_date = report2List.value.filter((item) => item.date == formattedDate)
  } else {
    filter_date = report2List.value
  }
  return filter_date.filter((item) => item.hole.toLowerCase().includes(keyWord.value))
})

//移動到督導報表
const router = useRouter()
const PushToReport2_Create = () => {
  router.push({ name: 'Report2_Create' })
}
</script>

<style scoped>
/* 內容 */
.report2_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.report2_box .list_box {
  width: 95%;
  height: 90%;
  overflow: scroll;
  background-color: #ffffff;
  border-radius: 2%;
  padding: 1%;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
}
/* 功能列表 */
.list_box .functionBar {
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 850px;
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
/* 表格 */
.table_box {
  padding: 2rem;
  min-width: 850px;
}
</style>
