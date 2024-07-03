<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>鑽探機基本資料 /</span>
    <!-- 選擇機器 -->
    <select
      class="form-select"
      aria-label="Default select example"
      :disabled="isEdit"
      v-model="selectMachine"
      @change="changeSpecification"
    >
      <option v-for="item in Specification_option" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
    </select>
  </div>
  <!-- 表格 -->
  <div class="drilling_box">
    <table class="table-striped table-bordered">
      <thead>
        <tr>
          <th>CASING</th>
          <th>SHELBY TUBE</th>
          <th>ABBREVIATIONS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div class="table_item">
              <span>Depth</span>
              <input
                type="text"
                class="form-control"
                :disabled="isEdit"
                v-model="filter_Specification.CASING_Depth"
              />
            </div>
          </td>
          <td>
            <div class="table_item">
              <span>Size</span>
              <input
                type="text"
                class="form-control"
                :disabled="isEdit"
                v-model="filter_Specification.CASING_Size"
              />
            </div>
          </td>
          <td>PA-Power Auge</td>
        </tr>
        <tr>
          <td>
            <div class="table_item">
              <span>Size</span>
              <input
                type="text"
                class="form-control"
                :disabled="isEdit"
                v-model="filter_Specification.SHELBY_TUBE_Size"
              />
            </div>
          </td>
          <td>
            <div class="table_item">
              <input
                type="text"
                class="form-control"
                :disabled="isEdit"
                v-model="filter_Specification.SHELBY_TUBE"
              />
            </div>
          </td>
          <td>HA-Hand Auger</td>
        </tr>
        <tr>
          <td colspan="2">SPLIT SPOON</td>
          <td>ST-Shelby Tube</td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="table_item">
              <span>Size</span>
              <input
                type="text"
                class="form-control"
                :disabled="isEdit"
                v-model="filter_Specification.SPLIT_SPOON_Size"
              />
            </div>
          </td>
          <td>SS-Split Spoon</td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="table_item">
              <span>Hammer</span>
              <input
                type="text"
                class="form-control"
                :disabled="isEdit"
                v-model="filter_Specification.SPLIT_SPOON_Hammer"
              />
            </div>
          </td>
          <td>WO-Wash Out</td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="table_item">
              <span>Drop</span>
              <input
                type="text"
                class="form-control"
                :disabled="isEdit"
                v-model="filter_Specification.SPLIT_SPOON_Drop"
              />
            </div>
          </td>
          <td>C-Core</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// 判斷儲存編輯狀態
const isEdit = ref(false)
defineExpose({
  isEdit,
})
// 初始化資料
const Specification = ref([
  {
    machine: '1',
    CASING_Depth: '1',
    CASING_Size: '1',
    SHELBY_TUBE_Size: '1',
    SHELBY_TUBE: '',
    SPLIT_SPOON_Size: '1',
    SPLIT_SPOON_Hammer: '1',
    SPLIT_SPOON_Drop: '1',
  },
  {
    machine: '2',
    CASING_Depth: '2',
    CASING_Size: '2',
    SHELBY_TUBE_Size: '2',
    SHELBY_TUBE: '',
    SPLIT_SPOON_Size: '2',
    SPLIT_SPOON_Hammer: '2',
    SPLIT_SPOON_Drop: '2',
  },
])
// 目前機器型號
const selectMachine = ref(0)
//機器選單(arr)
const Specification_option = computed(() => {
  if (Specification.value.length == 0) {
    const null_data = [{ value: 0, text: '目前無資料' }]
    return null_data
  } else {
    let data = []
    data.push({ value: 0, text: '請選擇' })
    Specification.value.forEach((element, index) => {
      data.push({ value: index + 1, text: element.machine })
    })
    return data
  }
})
// 篩選後得機器資料
const filter_Specification = ref({
  machine: '',
  CASING_Depth: '',
  CASING_Size: '',
  SHELBY_TUBE_Size: '',
  SHELBY_TUBE: '',
  SPLIT_SPOON_Size: '',
  SPLIT_SPOON_Hammer: '',
  SPLIT_SPOON_Drop: '',
})
// 將選種機器資料加入物件
const changeSpecification = () => {
  console.log(selectMachine.value)
  if (selectMachine.value == 0) {
    return filter_Specification.value = {}
  } else {
    const filter_data = Specification.value[selectMachine.value - 1]
    return (filter_Specification.value = filter_data)
  }
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
  justify-content: flex-start;
  align-items: center;
}
.title_box span {
  font-size: 22px;
  font-weight: 600;
  white-space: nowrap;
}
.title_box .form-select {
  margin-left: 1rem;
  width: 12%;
  padding: 0.1rem 0.5rem;
}
.form-select:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
/* 表格 */
.drilling_box {
  max-height: 50vh;
  width: 100%;
  overflow: auto;
}
.drilling_box table {
  height: 100%;
  width: 80%;
  border-collapse: collapse;
  border: 1px solid rgb(212, 212, 212);
  min-width: 650px;
  overflow-x: scroll;
}
.drilling_box th {
  background-color: var(--main-color);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  padding: 0.2rem 0 0.2rem 0;
}
.drilling_box thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
.drilling_box td {
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}
.drilling_box tbody tr:nth-of-type(odd) {
  background-color: #f3f3f3 !important;
}
.table_item {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 輸入框 */
.form-control {
  margin-left: 1rem;
  width: 50%;
}
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  text-align: center;
}
</style>
