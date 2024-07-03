<template>
  <div class="create_box">
    <div class="form_box">
      <!-- 功能列表 -->
      <div class="functionBar">
        <div>
          <MakeButton btn_class="btn_blue" @click="backToList">
            <i class="bx bx-subdirectory-left"></i>返回列表
          </MakeButton>
          <MakeButton btn_class="btn_blue" style="margin-left: 1rem" @click="parentStatus">
            <span v-if="isEdit"><i class='bx bxs-edit-alt'></i>編輯</span>
            <span v-else><i class="bx bxs-save"></i>儲存</span>
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
        <div v-show="tab_title == '鑽孔基本資料'"><basicInformation
          ref="basic_Information"
        ></basicInformation></div>
        <div v-show="tab_title == '鑽探樣本'"><drillingSample
          ref="drilling_Sample"
        ></drillingSample></div>
        <div v-show="tab_title == '工作資料'"><workInformation
          ref="work_Information"
        ></workInformation></div>
        <div v-show="tab_title == '鑽探機基本資料'"><drillingInformation
          ref="drilling_Information"
        ></drillingInformation></div>
        <div v-show="tab_title == '樣本描述'"><sampleDescription
          ref="sample_Description"
        ></sampleDescription></div>
        <div v-show="tab_title == '照片上傳'"><uploadPicture
          ref="upload_Picture"
        ></uploadPicture></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import basicInformation from '@/views/Report1/basicInformation.vue'
import drillingSample from '@/views/Report1/drillingSample.vue'
import workInformation from '@/views/Report1/workInformation.vue'
import drillingInformation from '@/views/Report1/drillingInformation.vue'
import sampleDescription from '@/views/Report1/sampleDescription.vue'
import uploadPicture from '@/views/Report1/uploadPicture.vue'
import { reactive, ref, onMounted } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

//工作表選單(array)
const tabOption = reactive([
  { value: '鑽孔基本資料', text: '鑽孔基本資料' },
  { value: '鑽探樣本', text: '鑽探樣本' },
  { value: '工作資料', text: '工作資料' },
  { value: '鑽探機基本資料', text: '鑽探機基本資料' },
  { value: '樣本描述', text: '樣本描述' },
  { value: '照片上傳', text: '照片上傳' },
])
// 目前工作表標籤
const tab_title = ref('鑽孔基本資料')
// 編輯儲存狀態
const isEdit = ref(false)
// 初始化資料(array)
const initData = ref({
  id: null,
  No: '21030',
})
// 初始化資料
onMounted(() => {
  enterStatus()
})
// 初始化判斷狀態
const enterStatus = () => {
  if (initData.value.id === undefined || initData.value.id === null) {
    isEdit.value = false
  } else {
    isEdit.value = true
  }
  childStatus()
}
//父元件管理編輯儲存
const parentStatus = () => {
  if (isEdit.value) {
    isEdit.value = false
  } else {
    isEdit.value = true
  }
  childStatus()
}
//子元件ref
const basic_Information = ref(null)
const drilling_Sample = ref(null)
const work_Information = ref(null)
const drilling_Information = ref(null)
const sample_Description = ref(null)
const upload_Picture = ref(null)
//子元件管理編輯儲存
const childStatus = () => {
  console.log('main', isEdit.value);
  basic_Information.value.isEdit = isEdit.value
  drilling_Sample.value.isEdit = isEdit.value
  work_Information.value.isEdit = isEdit.value
  drilling_Information.value.isEdit = isEdit.value
  sample_Description.value.isEdit = isEdit.value
  upload_Picture.value.isEdit = isEdit.value
}
// 返回列表
const router = useRouter()
const backToList = () => {
  router.push({ name: 'Report1_List' })
}
// 判斷是否離開
onBeforeRouteLeave((to, from, next) => {
  if (isEdit.value === false) {
    const answer = window.confirm('尚未儲存，確定離開當前畫面?')
    if (answer) {
      next()
    } else {
      next(false)
    }
  } else {
    next()
  }
})
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
.content_box{
  min-width: 650px;
}
</style>
