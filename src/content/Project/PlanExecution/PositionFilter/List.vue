<template>
  <div class="position_assign_box">
    <div class="list_box">
      <div class="functionBar">
        <div class="btn_row">
          <MakeButton btn_class="btn_blue" @click="addHole"
          ><i class="bx bxs-calendar-plus"></i>新增孔位</MakeButton
        >
          <MakeButton btn_class="btn_blue" style="margin-left: 1rem" @click="importHole">
            <i class="bx bxs-download"></i>匯入孔位
          </MakeButton>
        </div>
        <div class="search_box">
          <span>關鍵字搜尋：</span>
          <select class="form-select" aria-label="Default select example" v-model="status_filter">
            <option v-for="item in statusOption" :key="item.value" :value="item.value">
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
          :table_header="holeHeader"
          :table_data="filter_holeList"
          table_scroll="50vh"
          :table_pagination="true"
          :table_page="8"
        >
          <template #cell(name)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(status)="data">
            <span v-if="data.value == null">未執行</span>
            <span v-else-if="!data.value">執行中</span>
            <span v-else>已完成</span>
          </template>
          <template #cell(position)="data">
            <span>{{ data.value }}</span>
          </template>
        </MakeTable>
      </div>
    </div>
  </div>
  <MakeModal :modal-open="isAdd" title="新增孔位" @closeEvent="closeAddModal">
    <addHoleModal @closeEvent="closeAddModal"></addHoleModal>
  </MakeModal>
  <MakeModal :modal-open="isImport" title="匯入孔位" @closeEvent="closeImportModal">
    <importHoleModal></importHoleModal>
  </MakeModal>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import MakeModal from '@/views//MakeComponents/MakeModal.vue'
import addHoleModal from '@/views/PositionFilter/addHoleModal.vue'
import importHoleModal from '@/views/PositionFilter/importHoleModal.vue'
import { computed, reactive, ref } from 'vue'

//表格
const holeHeader = reactive([
  { key: 'name', label: '孔位名稱', sort: false },
  { key: 'status', label: '執行狀態', sort: false },
  { key: 'position', label: '孔位位置', sort: false },
])
const holeList = ref([
  { name: 's-1-1', status: null, position: '813 高雄市左營區重光路32號' },
  { name: 'A-1-1', status: null, position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', status: null, position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', status: null, position: '813 高雄市左營區重光路32號' },
  { name: 'c-1-1', status: null, position: '813 高雄市左營區重光路32號' },
  { name: 'g-1-1', status: false, position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', status: false, position: '813 高雄市左營區重光路32號' },
  { name: 'F-1-1', status: false, position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', status: true, position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', status: true, position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', status: true, position: '813 高雄市左營區重光路32號' },
])

//關鍵字搜尋
const statusOption = reactive([
  { value: '', text: 'all' },
  { value: null, text: '未執行' },
  { value: false, text: '執行中' },
  { value: true, text: '已完成' },
])
const status_filter = ref('')
const keyWord = ref('')
const filter_holeList = computed(() => {
  if (keyWord.value === '' && status_filter.value === '') {
    return holeList.value
  } else {
    const holeList_status = holeList.value.filter((item) => item.status === status_filter.value)
    return holeList_status.filter((item) => item.name.toLowerCase().includes(keyWord.value))
  }
})

//新增孔位modal
const isAdd = ref(false)
const addHole = () => {
  isAdd.value = true
}
const closeAddModal = () => {
  isAdd.value = false
}
//新匯入孔位modal
const isImport = ref(false)
const importHole = () => {
  isImport.value = true
}
const closeImportModal = () => {
  isImport.value = false
}
</script>

<style scoped>
.position_assign_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.position_assign_box .list_box {
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
