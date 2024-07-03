<template>
  <div class="modal_box">
    <div class="row gx-1">
      <span>孔位名稱：</span>
      <span>{{ hole.name }}</span>
    </div>
    <div class="row gx-1">
      <span>孔位位置：</span>
      <span>{{ hole.position }}</span>
    </div>
    <div class="row gx-1">
      <span>督導人員：</span>
      <span>{{ hole.people }}</span>
    </div>
    <div class="row gx-1">
      <span>督導人員號：</span>
      <span>{{ hole.people_number }}</span>
    </div>
    <div class="row gx-1">
      <span>負責廠商：</span>
      <select class="form-select" aria-label="Default select example" v-model="hole.company">
        <option v-for="item in companyOption" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="row gx-1">
      <span>廠商聯絡人：</span>
      <span>{{ hole.company_people }}</span>
    </div>
    <div class="row gx-1">
      <span>廠商聯絡人電話：</span>
      <span>{{ hole.company_phone }}</span>
    </div>
    <div class="row gx-1">
      <span>負責領班：</span>
      <input type="text" class="form-control" />
    </div>
    <div class="row gx-1">
      <span>鑽探區別：</span>
      <span>{{ hole.different }}</span>
    </div>
    <div class="row gx-1">
      <span>當日日報是否上傳：</span>
      <span>{{ hole.today }}</span>
    </div>
    <MakeButton btn_class="btn_blue" class="long_btn">儲存</MakeButton>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'

const hole = ref({
  name: 'S-1-1',
  position: '221新北市汐止區新台五路一段112號',
  people: '正常人',
  people_number: '001',
  company: '亞新顧問公司',
  company_people: '山道猴子',
  company_phone: '0928333444',
  leader: '冠老闆',
  different: '地圖太難，不想做啦',
  today: '他要系統判斷，但不知道要怎樣',
})
const company = ref([
  { name: '亞新顧問公司', company_people: '山道猴子', company_phone: '0928333444' },
  { name: '亞新顧問子公司', company_people: '想不到', company_phone: '0928555666' },
])
const companyOption = computed(() => {
  let option_data = []
  company.value.forEach((element) => {
    option_data.push(element.name)
  })
  return option_data
})
watch(
  () => hole.value.company,
  (newVal) => {
    const filter_data = company.value.filter((item) => item.name == newVal)
    hole.value.company_people = filter_data[0].company_people
    hole.value.company_phone = filter_data[0].company_phone
  },
  { immediate: true },
)
</script>

<style scoped>
.modal_box {
  width: 20vw;
  min-width: 300px;
}
.row {
  margin-bottom: 1rem;
}
.row span {
  color: black;
  font-size: 16px;
  padding-bottom: 0.5rem;
}
.position {
  padding: 0 1rem;
}
.long_btn {
  border: 0;
  width: 100%;
}
</style>
