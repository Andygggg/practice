<template>
  <div class="create_box">
    <div class="form_box">
      <!-- 功能列表 -->
      <div class="functionBar">
        <div>
          <MakeButton btn_class="btn_blue" @click="backToProject">
            <i class="bx bx-subdirectory-left"></i>返回專案
          </MakeButton>
        </div>
        <!-- 工作表選單-->
        <div class="select_box">
          <select class="form-select" aria-label="Default select example" v-model="tab_title">
            <option v-for="item in tabOption" :key="item.value" :value="item.text">
              {{ item.text }}
            </option>
          </select>
        </div>
      </div>
       <!-- 工作表內容 -->
      <div class="content_box">
        <div v-show="tab_title == '廠商資訊'">
          <companyInformation></companyInformation>
        </div>
        <div v-show="tab_title == '鑽探機規格'">
          <augerInformation></augerInformation>
        </div>
        <div v-show="tab_title == '土壤樣本描述'">
          <soilDescription></soilDescription>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import companyInformation from '@/views/ParameterManagement/companyInformation.vue'
import augerInformation from '@/views/ParameterManagement/augerInformation.vue'
import soilDescription from '@/views/ParameterManagement/soilDescription.vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const backToProject = () => {
  router.push({ name: 'Project' })
}

//工作表選單(array)
const tabOption = reactive([
  { value: '廠商資訊', text: '廠商資訊' },
  { value: '鑽探機規格', text: '鑽探機規格' },
  { value: '土壤樣本描述', text: '土壤樣本描述' },
])
const tab_title = ref('廠商資訊')
</script>

<style scoped>
/* 工作表 */
.create_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.create_box .form_box {
  width: 95%;
  height: 90%;
  overflow-y: scroll;
  background-color: #ffffff;
  border-radius: 2%;
  padding: 1rem 2rem;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
}
/* 功能列表 */
.create_box .functionBar {
  min-width: 650px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.functionBar span {
  display: flex;
  align-items: center;
}
.functionBar .bx {
  font-size: 24px;
}
/* 工作表選單 */
.select_box {
  display: flex;
  align-items: center;
}
/* 工作表內容 */
.content_box {
  min-width: 650px;
}
</style>
