<template>
  <div class="holeSetting_box">
    <div class="list_box">
      <div class="search_box">
        <span>關鍵字搜尋：</span>
        <div class="input_box">
          <input type="text" placeholder="請輸入關鍵字" v-model="keyWord" />
          <i class="bx bx-search-alt-2"></i>
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
          <template #cell(hole_name)="data">
            <span @click="editPosition" class="text_btn">{{ data.value }}</span>
          </template>
          <template #cell(hole_people)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(hole_company)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(hole_leader)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(hole_position)="data">
            <span>{{ data.value }}</span>
          </template>
          <template #cell(upload)="data">
            <span>{{ data.value }}</span>
          </template>
        </MakeTable>
      </div>
    </div>
  </div>
  <MakeModal :modal-open="show" title="編輯孔位" @closeEvent="closeModal">
    <setPositionModal></setPositionModal>
  </MakeModal>
</template>

<script setup>
import MakeTable from '@/views/MakeComponents/MakeTable.vue'
import MakeModal from '@/views//MakeComponents/MakeModal.vue'
import setPositionModal from '@/views/HoleSetting/setPositionModal.vue'
import { computed, reactive, ref } from 'vue'

//表格
const holeHeader = reactive([
  { key: 'hole_name', label: '孔位名稱', sort: false },
  { key: 'hole_people', label: '督導人員', sort: false },
  { key: 'hole_company', label: '負責廠商', sort: false },
  { key: 'hole_leader', label: '負責領班', sort: false },
  { key: 'hole_position', label: '孔位位置', sort: false },
  { key: 'upload', label: '#', sort: false },
])
const holeList = ref([
  {
    hole_name: 'S-1-1',
    hole_people: '正常人',
    hole_position: '221新北市汐止區新台五路一段112號',
    hole_company: '冠老闆',
    hole_leader: '鋼管猴子',
    upload: '是',
  },
  {
    hole_name: 'S-1-1',
    hole_people: '正常人',
    hole_position: '221新北市汐止區新台五路一段112號',
    hole_company: '冠老闆',
    hole_leader: '鋼管猴子',
    upload: '否',
  },
  {
    hole_name: 'A-1-1',
    hole_people: '正常人',
    hole_position: '221新北市汐止區新台五路一段112號',
    hole_company: '冠老闆',
    hole_leader: '鋼管猴子',
    upload: '是',
  },
  {
    hole_name: 'S-1-1',
    hole_people: '正常人',
    hole_position: '221新北市汐止區新台五路一段112號',
    hole_company: '冠老闆',
    hole_leader: '鋼管猴子',
    upload: '是',
  },
  {
    hole_name: 'S-1-1',
    hole_people: '正常人',
    hole_position: '221新北市汐止區新台五路一段112號',
    hole_company: '冠老闆',
    hole_leader: '鋼管猴子',
    upload: '否',
  },
  {
    hole_name: 'S-1-1',
    hole_people: '正常人',
    hole_position: '221新北市汐止區新台五路一段112號',
    hole_company: '冠老闆',
    hole_leader: '鋼管猴子',
    upload: '是',
  },
])

//關鍵字搜尋
const keyWord = ref('')
const filter_holeList = computed(() => {
  if (keyWord.value == '') {
    return holeList.value
  } else {
    return holeList.value.filter((item) => item.hole_name.toLowerCase().includes(keyWord.value))
  }
})

//編輯孔位modal
const show = ref(false)
const editPosition = () => {
  show.value = true
}
const closeModal = () => {
  show.value = false
}
</script>

<style scoped>
.holeSetting_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.holeSetting_box .list_box {
  width: 95%;
  height: 90%;
  overflow: scroll;
  background-color: #ffffff;
  border-radius: 2%;
  padding: 1%;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
}
.search_box {
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 650px;
}
.search_box span {
  color: black;
  font-size: 16px;
  font-weight: 600;
}
.search_box .input_box {
  position: relative;
  width: 30%;
  min-width: 200px;
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
.text_btn {
  color: blue;
  border-bottom: 1px blue solid;
  cursor: pointer;
}
</style>
