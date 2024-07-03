<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>鑽探樣本</span>
  </div>
  <!-- 表格 -->
  <div class="drilling_table_box">
    <table class="table-striped table-bordered">
      <thead>
        <tr>
          <th rowspan="3" width="10%">Casing Depth ; m</th>
          <th rowspan="3" width="10%">Sample No.</th>
          <th colspan="2" width="15%">Depth ; m</th>
          <th rowspan="3" width="6%">Err Doru (cm)</th>
          <th rowspan="3" width="6%">Method</th>
          <th colspan="3" width="18%">Standard Penetration</th>
          <th colspan="5" width="30%">Weather:</th>
          <th rowspan="3" width="2%">#</th>
        </tr>
        <tr>
          <th rowspan="2">From</th>
          <th rowspan="2">To</th>
          <th>1st</th>
          <th>2nd</th>
          <th>3rd</th>
          <th rowspan="2" colspan="2">Rec</th>
          <th rowspan="2">R.Q.D.%</th>
          <th rowspan="2">F.I.</th>
          <th rowspan="2">B.W.%</th>
        </tr>
        <tr>
          <th>6"</th>
          <th>6"</th>
          <th>6"</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sample" :key="index">
          <td>
            <input
              type="text"
              class="form-control"
              v-model="item.Casing_Depth"
              :disabled="isEdit"
            />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.Sample" :disabled="isEdit" />
          </td>
          <td><input type="text" class="form-control" v-model="item.From" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" v-model="item.To" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" v-model="item.Err" :disabled="isEdit" /></td>
          <td>
            <input type="text" class="form-control" v-model="item.Method" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.first" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.second" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.third" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.Rec_1" :disabled="isEdit" />
          </td>
          <td>
            <input type="text" class="form-control" v-model="item.Rec_2" :disabled="isEdit" />
          </td>
          <td><input type="text" class="form-control" v-model="item.RQD" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" v-model="item.FI" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" v-model="item.BWI" :disabled="isEdit" /></td>
          <td v-show="!isEdit">
            <span v-if="index === sample.length - 1" @click="addSample"
              ><i class="bx bxs-plus-circle"></i
            ></span>
            <span v-else class="trash_icon" @click="delSample(index)"
              ><i class="bx bxs-trash"></i
            ></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 判斷儲存編輯狀態
const isEdit = ref(false)
defineExpose({
  isEdit,
})
// 初始化資烙(arr)
const sample = ref([
  {
    Casing_Depth: '這是一串用來測試字數',
    Sample: 'S-1-1',
    From: '1.05',
    To: '1.50',
    Err: '5',
    Method: 'SS',
    first: '2',
    second: '1',
    third: '1',
    Rec_1: '1',
    Rec_2: '8',
    RQD: '12',
    FI: '13',
    BWI: '16',
  },
  {
    Casing_Depth: '這是一串用來測試字數',
    Sample: 'S-1-1',
    From: '1.05',
    To: '1.50',
    Err: '5',
    Method: 'SS',
    first: '2',
    second: '1',
    third: '1',
    Rec_1: '1',
    Rec_2: '8',
    RQD: '12',
    FI: '13',
    BWI: '16',
  },
])
// 新增樣品
const addSample = () => {
  let item = {
    Casing_Depth: '',
    Sample: '',
    From: '',
    To: '',
    Err: '',
    Method: '',
    first: '',
    second: '',
    third: '',
    Rec_1: '',
    Rec_2: '',
    RQD: '',
    FI: '',
    BWI: '',
  }
  sample.value.push(item)
}
// 刪除樣品
const delSample = (i) => {
  sample.value.splice(i, 1)
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
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  text-align: center;
}
</style>
