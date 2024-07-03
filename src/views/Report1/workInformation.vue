<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>工作資料</span>
  </div>
  <!-- 表格 -->
  <div class="work_table">
    <table class="table-striped table-bordered">
      <thead>
        <tr>
          <th width="40%">Non Productive Time</th>
          <th>Time</th>
          <th>Time</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Moblization and Dembilization</td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
        </tr>
        <tr>
          <td>Equipment Break Down</td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
        </tr>
        <tr>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
        </tr>
        <tr>
          <td colspan="3">Total Non Productive Time</td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
        </tr>
        <tr>
          <td colspan="3">Total Productive Time</td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
        </tr>
        <tr>
          <td colspan="3"><input type="text" class="form-control" :disabled="isEdit" /></td>
          <td><input type="text" class="form-control" :disabled="isEdit" /></td>
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
.work_table {
  max-height: 50vh;
  width: 100%;
  overflow: auto;
}
.work_table table {
  height: 100%;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgb(212, 212, 212);
  min-width: 650px;
  overflow-x: scroll;
}
.work_table th {
  background-color: var(--main-color);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  padding: 0.2rem 0 0.2rem 0;
}
.work_table thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
.work_table td {
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
  color: black;
  font-size: 1rem;
  font-weight: 500;
}
.work_table tbody tr:nth-of-type(odd) {
  background-color: #f3f3f3 !important;
}
/* 輸入框 */
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
  text-align: center;
}
</style>
