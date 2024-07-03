<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>土壤樣本描述</span>
  </div>
  <!-- 新增描述 -->
  <div class="addSample_row">
    <span>新增土壤描述：</span>
    <select class="form-select" aria-label="Default select example" v-model="selectType">
      <option v-for="item in earth_options" :key="item.value" :value="item.text">
        {{ item.text }}
      </option>
    </select>
    <input type="text" class="form-control" v-model="inputDescription" />
    <MakeButton btn_class="btn_blue" @click="addDescription">新增</MakeButton>
  </div>
  <!-- 內容 -->
  <div class="project_box">
    <div class="project_type">
      <ul>
        <li
          v-for="item in earth_options"
          :key="item"
          :class="{ btn_now: item.text === chooseTitle }"
          @click="changeTitle(item.text)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="sample_box">
      <div class="sample" v-for="(item, index) in filter_sample_type" :key="index">
        <div class="input_box">
          <input type="text" class="form-control" v-model="item.sample" :disabled="item.isEdit" />
          <span class="pencil_icon" v-if="item.isEdit" @click="editSample(item)"
            ><i class="bx bxs-pencil"></i
          ></span>
        </div>
        <!-- <input type="text" class="form-control" v-model="item.sample" :disabled="item.isEdit" />
        <span class="pencil_icon" v-if="item.isEdit" @click="editSample(item)"><i class="bx bxs-pencil"></i></span>
        <span class="check_icon" v-else @click="saveSample(item)"><i class="bx bx-check"></i></span> -->
        <span class="trash_icon" v-if="item.isEdit"><i class="bx bxs-trash"></i></span>
        <span class="check_icon" v-else @click="saveSample(item)"><i class="bx bx-check"></i></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'

const sample_type = ref([
  { type: '土壤名稱', sample: '回填土', isEdit: true },
  { type: '土壤名稱', sample: '砂質粉土', isEdit: true },
  { type: '土壤名稱', sample: '粉土', isEdit: true },
  { type: '土壤名稱', sample: '黏質粉土', isEdit: true },
  { type: '土壤名稱', sample: '砂質黏土', isEdit: true },
  { type: '土壤名稱', sample: '粉質黏土', isEdit: true },
  { type: '土壤名稱', sample: '黏土', isEdit: true },
  { type: '土壤名稱', sample: '有機質粉土', isEdit: true },
  { type: '土壤名稱', sample: '機質黏土', isEdit: true },
  { type: '土壤名稱', sample: '巨石', isEdit: true },
  { type: '土壤名稱', sample: '卵石', isEdit: true },
  { type: '土壤名稱', sample: '礫石', isEdit: true },
  { type: '土壤名稱', sample: '砂', isEdit: true },
  { type: '顏色', sample: '1', isEdit: true },
  { type: '塑性', sample: '2', isEdit: true },
  { type: '級配', sample: '3', isEdit: true },
  { type: '稠度/緊密度', sample: '4', isEdit: true },
  { type: '含水量', sample: '5', isEdit: true },
  { type: '量(Quantity)', sample: '6', isEdit: true },
  { type: '物質', sample: '7', isEdit: true },
  { type: 'END', sample: 'End of Boring', isEdit: true },
])

const filter_sample_type = computed(() => {
  if (chooseTitle.value === '所有描述類型') {
    return sample_type.value
  } else {
    return sample_type.value.filter((item) => item.type === chooseTitle.value)
  }
})
const chooseTitle = ref('所有描述類型')
const changeTitle = (newVal) => {
  chooseTitle.value = newVal
}
const earth_options = ref([
  { value: 0, text: '所有描述類型' },
  { value: 1, text: '土壤名稱' },
  { value: 2, text: '顏色' },
  { value: 3, text: '塑性' },
  { value: 4, text: '級配' },
  { value: 5, text: '稠度/緊密度' },
  { value: 6, text: '含水量' },
  { value: 7, text: '量(Quantity)' },
  { value: 8, text: '物質' },
  { value: 9, text: 'END' },
])

const selectType = ref('所有描述類型')
const inputDescription = ref('')
const addDescription = () => {
  if (inputDescription.value === '' || selectType.value === '所有描述類型') {
    alert('未填寫描述')
    return
  } else {
    sample_type.value.push({ type: selectType.value, sample: inputDescription.value, isEdit: true })
  }
  inputDescription.value = ''
  selectType.value = '所有描述類型'
}
const editSample = (sample) => {
  sample.isEdit = false
}
const saveSample = (sample) => {
  sample.isEdit = true
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
  align-items: center;
  justify-content: space-between;
}
.title_box span {
  font-size: 22px;
  font-weight: 600;
}
.addSample_row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.addSample_row span {
  white-space: nowrap;
}
.addSample_row .form-select {
  width: 15%;
  margin-left: 5px;
  margin-right: 5px;
}
.addSample_row .form-control {
  width: 25%;
  margin-left: 5px;
  margin-right: 10px;
}
/* 內容 */
.project_box {
  padding: 2rem 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: 220px calc(100% - 230px);
}
.project_type {
  margin-right: 12px;
}
.project_type ul {
  list-style: none;
  padding-left: 1rem;
}
.project_type ul li {
  padding: 0.5rem 1rem;
  background-color: rgb(247, 170, 54);
  margin-bottom: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  vertical-align: middle;
}
.project_type ul li:hover {
  background-color: rgb(243, 109, 0);
  color: white;
}
.btn_now {
  background-color: rgb(243, 109, 0) !important;
  color: white;
}
.sample_box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
}
.sample_box .sample {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.input_box {
  position: relative;
  width: 80%;
  height: auto;
  color: #000000;
  font-weight: 600;
  padding-right: 1rem;
}
.input_box i {
  display: none;
}
.input_box:hover i {
  display: block;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  cursor: pointer;
}
.sample_box .sample .form-control {
  margin-left: 5px;
  margin-right: 5px;
  padding: 3px 0;
}
.form-control:disabled {
  background-color: rgba(255, 255, 255, 0);
  border: none;
}
.sample span {
  font-size: 1.5rem;
  cursor: pointer;
}
.sample .trash_icon {
  color: red;
}
.sample .pencil_icon {
  color: blue;
}
.sample .check_icon {
  color: green;
}
</style>
