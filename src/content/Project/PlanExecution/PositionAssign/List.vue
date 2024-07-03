<template>
  <div class="position_assign_box">
    <div class="list_box">
      <div class="functionBar">
        <MakeButton btn_class="btn_blue" @click="assignPosition"
          ><i class="bx bx-user-plus"></i>指派孔位</MakeButton
        >
        <div class="search_box">
          <span>關鍵字搜尋：</span>
          <div class="input_box">
            <input type="text" placeholder="請輸入關鍵字" v-model="keyWord" />
            <i class="bx bx-search-alt-2"></i>
          </div>
        </div>
      </div>
      <div class="table_box">
        <MakeTable
          :table_header="assignHeader"
          :table_data="filter_assignList"
          table_scroll="50vh"
          :table_pagination="true"
          :table_page="8"
        >
          <template #cell(name)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(people)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(position)="data">
            <span>{{ data.value }}</span>
          </template>
        </MakeTable>
      </div>
    </div>
  </div>
  <MakeModal :modal-open="show" title="指派孔位" @closeEvent="closeModal">
    <assignPositionModal @closeEvent="closeModal"></assignPositionModal>
  </MakeModal>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import MakeModal from '@/views//MakeComponents/MakeModal.vue'
import assignPositionModal from '@/views/PositionAssign/assignPositionModal.vue'
import { computed, reactive, ref } from 'vue'

//表格
const assignHeader = reactive([
  { key: 'name', label: '孔位名稱', sort: false },
  { key: 'people', label: '督導人員', sort: false },
  { key: 'position', label: '孔位位置', sort: false },
])
const assignList = ref([
  { name: 's-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 'A-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 'c-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 'g-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 'F-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
  { name: 's-1-1', people: '督導人', position: '813 高雄市左營區重光路32號' },
])

//關鍵字搜尋
const keyWord = ref('')
const filter_assignList = computed(() => {
  if (keyWord.value == '') {
    return assignList.value
  } else {
    return assignList.value.filter((item) => item.name.toLowerCase().includes(keyWord.value))
  }
})

//指派孔位modal
const show = ref(false)
const assignPosition = () => {
  show.value = true
}
const closeModal = () => {
  show.value = false
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
  min-width: 650px;
}
.functionBar .bx {
  font-size: 24px;
}
.search_box {
  display: flex;
  align-items: center;
}
.search_box span {
  color: black;
  font-size: 16px;
  font-weight: 600;
}
.search_box .input_box {
  position: relative;
  width: 50%;
  min-width: 200px;
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
  min-width: 650px;
}
</style>
