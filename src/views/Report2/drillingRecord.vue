<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>鑽探紀錄</span>
  </div>
  <!-- 表格 -->
  <div class="drilling_table_box">
    <table class="table-striped table-bordered">
      <thead>
        <tr>
          <th rowspan="2" width="14%">Hole No.</th>
          <th rowspan="2" width="8%">Non Productive Time (Hour)</th>
          <th rowspan="2" width="10%">Productive Time (Hour)</th>
          <th colspan="2" width="20%">Depth Drilled (Meter)</th>
          <th rowspan="2" width="10%">Meters Drilled</th>
          <th rowspan="2" width="10%">Shelby Tube Samples</th>
          <th rowspan="2" width="10%">Split Spoon Samples</th>
          <th rowspan="2" width="8%">OW</th>
          <th rowspan="2" width="8%">水壓計</th>
          <th rowspan="2" width="2%">#</th>
        </tr>
        <tr>
          <th width="10%">From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in record" :key="index">
          <td>
            <select
              class="form-select"
              aria-label="Default select example"
              :disabled="isEdit"
              v-model="item.No"
              @change="changeHole(index, item.No)"
            >
              <option v-for="row in hole_option" :key="row.value" :value="row.text">
                {{ row.text }}
              </option>
            </select>
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.time1" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.time2" :disabled="isEdit" />
          </td>
          <td><input type="text" class="form-control" v-model="item.from" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" v-model="item.to" :disabled="isEdit" /></td>
          <td>
            <input type="text" class="form-control" v-model="item.Drilled" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.Samples" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.Split" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.OW" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.water" :disabled="isEdit" />
          </td>
          <td v-show="!isEdit">
            <span v-if="index === record.length - 1" @click="addTableItem"
              ><i class="bx bxs-plus-circle"></i
            ></span>
            <span v-else class="trash_icon" @click="delTableItem(index)"><i class="bx bxs-trash"></i></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 判斷儲存編輯狀態
const isEdit = ref(false)
defineExpose({
  isEdit,
})
// 孔位清單
const holeList = ref([
  {
    No: '001',
    time1: '10:00',
    time2: '11:00',
    from: 'A',
    to: 'B',
    Drilled: '100',
    Samples: '10',
    Split: '5',
    OW: '1',
    water: '5',
  },
  {
    No: '002',
    time1: '12:00',
    time2: '13:00',
    from: 'C',
    to: 'D',
    Drilled: '200',
    Samples: '20',
    Split: '10',
    OW: '2',
    water: '10',
  },
  {
    No: '003',
    time1: '14:00',
    time2: '15:00',
    from: 'A',
    to: 'B',
    Drilled: '100',
    Samples: '10',
    Split: '5',
    OW: '1',
    water: '5',
  },
  {
    No: '004',
    time1: '16:00',
    time2: '17:00',
    from: 'C',
    to: 'D',
    Drilled: '200',
    Samples: '20',
    Split: '10',
    OW: '2',
    water: '10',
  },
])
// 記錄清單
const record = ref([
  {
    No: '',
    time1: '',
    time2: '',
    from: '',
    to: '',
    Drilled: '',
    Samples: '',
    Split: '',
    OW: '',
    water: '',
  },
])
// 孔位選單
const hole_option = computed(() => {
  if (holeList.value.length == 0) {
    const null_data = [{ value: 0, text: '無資料' }]
    return null_data
  } else {
    let data = []
    holeList.value.forEach((element, index) => {
      data.push({ value: index, text: element.No })
    })
    return data
  }
})
// 獲取孔位資料
const changeHole = (index, val) => {
  const data = holeList.value.find((item) => item.No == val)
  if (data) {
    Object.assign(record.value[index], data)
  }
}
// 新增紀錄
const addTableItem = () => {
  let item = {
    No: '',
    time1: '',
    time2: '',
    from: '',
    to: '',
    Drilled: '',
    Samples: '',
    Split: '',
    OW: '',
    water: '',
  }
  record.value.push(item)
}
// 刪除紀錄
const delTableItem = (i) => {
  record.value.splice(i,1)
}
</script>

<style scoped>
/* 標題 */
.title_box {
  height: auto;
  width: 100%;
  border-bottom: 3px rgb(156, 155, 155) solid;
  margin-bottom: 1rem;
}
.title_box span {
  font-size: 22px;
  font-weight: 600;
}
/* 表格 */
.drilling_table_box {
  max-height: 50vh;
  width: 100%;
  overflow: auto;
}
.drilling_table_box table {
  height: 100%;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgb(212, 212, 212);
  min-width: 1100px;
  overflow-x: scroll;
}
.drilling_table_box th {
  background-color: var(--main-color);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  padding: 0.2rem 0 0.2rem 0;
}
.drilling_table_box thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
.drilling_table_box td {
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}
/* icon */
.drilling_table_box td .trash_icon {
  color: red;
}
.drilling_table_box td span {
  cursor: pointer;
  font-size: 1.4rem;
  color: green;
}
.drilling_table_box tbody tr:nth-of-type(odd) {
  background-color: #f3f3f3 !important;
}
/* 輸入框 */
.form-select:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  text-align: center;
}
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  text-align: center;
}
</style>
