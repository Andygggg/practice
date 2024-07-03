<template>
  <div class="calendar_container">
    <div class="calender">
      <div class="calender_header">
        <button @click="prevMonth"><i class="bx bxs-chevron-left"></i></button>
        <span>{{ currentYear }}年{{ currentMonth }}月</span>
        <button @click="nextMonth"><i class="bx bxs-chevron-right"></i></button>
      </div>

      <div class="calender_week">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>
      <div class="calender_day">
        <div
          v-for="(item, i) in calendar"
          :key="i"
          class="date_header"
          :class="{ active: item.Format_Date === nowDate }"
          @click="chooseDay(item)"
        >
          <span :class="{ other_month: currentMonth !== item.Month }">{{ item.Today }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, toRaw, watch } from 'vue'

//當天日期
const today = new Date()
const nowDate = computed(() => {
  if (activeDay.value == today.toLocaleDateString()) {
    return today.toLocaleDateString()
  } else {
    return activeDay.value
  }
})
//自選日期
const activeDay = ref(today.toLocaleDateString())
//當年
const currentYear = ref(today.getFullYear())
//當月
const currentMonth = ref(today.getMonth() + 1)

//假設代辦事項
const todo_list = reactive([
  { name: '代辦事項A', start_date: '2023/11/3', final_date: '2023/11/10' },
  { name: '代辦事項B', start_date: '2023/11/4', final_date: '2023/11/11' },
  { name: '代辦事項c', start_date: '2023/11/5', final_date: '2023/11/30' },
  { name: '代辦事項d', start_date: '2023/12/6', final_date: '2023/12/8' },
  // { name: '代辦事項e', start_date: '2023/11/6', final_date: '2023/11/8' },
  // { name: '代辦事項f', start_date: '2023/11/6', final_date: '2023/11/8' },
  // { name: '代辦事項g', start_date: '2023/11/6', final_date: '2023/11/8' },
])
//當月天數
const daysOFMonth = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value - 1, 1)
  date.setMonth(date.getMonth() + 1)
  date.setDate(date.getDate() - 1)
  return date.getDate()
})

const calendar = computed(() => {
  const Month_Days = []
  //獲取當月第一天與最後一天為星期幾
  const first_date = new Date(currentYear.value, currentMonth.value - 1, 1)
  const last_date = new Date(currentYear.value, currentMonth.value - 1, daysOFMonth.value)
  //上個月剩餘天數
  const prevDaysOFMonth = new Date(currentYear.value, currentMonth.value - 1, 0).getDate()
  for (let index = 0; index < first_date.getDay(); index++) {
    const prev_date = new Date(currentYear.value, currentMonth.value - 2, prevDaysOFMonth - index)
    let dayOfWeek = null
    switch (prev_date.getDay()) {
      case 0:
        dayOfWeek = 'SUN'
        break
      case 1:
        dayOfWeek = 'MON'
        break
      case 2:
        dayOfWeek = 'TUE'
        break
      case 3:
        dayOfWeek = 'WED'
        break
      case 4:
        dayOfWeek = 'THU'
        break
      case 5:
        dayOfWeek = 'FRI'
        break
      case 6:
        dayOfWeek = 'SAT'
        break
    }
    Month_Days.unshift({
      Date: prev_date,
      DayOfWeek: dayOfWeek,
      Month: currentMonth.value - 1,
      Format_Date: prev_date.toLocaleDateString(),
      Today: prevDaysOFMonth - index,
      ToDoList: [],
    })
  }
  for (let index = 1; index <= daysOFMonth.value; index++) {
    const date = new Date(currentYear.value, currentMonth.value - 1, index)
    let dayOfWeek = null
    switch (date.getDay()) {
      case 0:
        dayOfWeek = 'SUN'
        break
      case 1:
        dayOfWeek = 'MON'
        break
      case 2:
        dayOfWeek = 'TUE'
        break
      case 3:
        dayOfWeek = 'WED'
        break
      case 4:
        dayOfWeek = 'THU'
        break
      case 5:
        dayOfWeek = 'FRI'
        break
      case 6:
        dayOfWeek = 'SAT'
        break
    }
    Month_Days.push({
      Date: date,
      DayOfWeek: dayOfWeek,
      Month: currentMonth.value,
      Format_Date: date.toLocaleDateString(),
      Today: index,
      ToDoList: [],
    })
  }
  for (let index = 0; index < 6 - last_date.getDay(); index++) {
    const next_date = new Date(currentYear.value, currentMonth.value, index + 1)
    let dayOfWeek = null
    switch (next_date.getDay()) {
      case 0:
        dayOfWeek = 'SUN'
        break
      case 1:
        dayOfWeek = 'MON'
        break
      case 2:
        dayOfWeek = 'TUE'
        break
      case 3:
        dayOfWeek = 'WED'
        break
      case 4:
        dayOfWeek = 'THU'
        break
      case 5:
        dayOfWeek = 'FRI'
        break
      case 6:
        dayOfWeek = 'SAT'
        break
    }
    Month_Days.push({
      Date: next_date,
      DayOfWeek: dayOfWeek,
      Month: currentMonth.value + 1,
      Format_Date: next_date.toLocaleDateString(),
      Today: index + 1,
      ToDoList: [],
    })
  }
  Month_Days.forEach((element) => {
    const filtered_item = toRaw(todo_list).filter(
      (item) =>
        Date.parse(item.start_date) <= Date.parse(element.Format_Date) &&
        Date.parse(item.final_date) >= Date.parse(element.Format_Date),
    )
    element.ToDoList.push(...filtered_item)
  })
  return Month_Days
})
//下一個月
const prevMonth = () => {
  currentMonth.value -= 1
  if (currentMonth.value < 1) {
    currentMonth.value = 12
    currentYear.value -= 1
  }
}
//上一個月
const nextMonth = () => {
  currentMonth.value += 1
  if (currentMonth.value > 12) {
    currentMonth.value = 1
    currentYear.value += 1
  }
}
//選取所需日期
const nowDate_Data = ref([])
const chooseDay = (date) => {
  activeDay.value = date.Format_Date
  nowDate_Data.value = date
}
//監聽日期變動傳給父元件
const emit = defineEmits(['getDay'])
watch(nowDate_Data, (newVal) => {
  emit('getDay', newVal)
})
</script>

<style scoped>
.calendar_container {
  height: 100%;
  width: 100%;
  background-color: rgb(255, 255, 255);
}
.calender {
  height: 100%;
  width: 100%;
  color: black;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}
.calender_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.calender_header span {
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1.3rem;
  font-weight: 600;
}
.calender_header button {
  border: none;
  background-color: rgba(255, 255, 255, 0);
}
.calender_header button i {
  font-size: 1.5rem;
  cursor: pointer;
}
.calender_week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calender_week div {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-weight: 600;
  white-space: nowrap;
}
.calender_day {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.calender_day .date_header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.active {
  background-color: rgb(225, 204, 252);
  border-radius: 8px;
}
.other_month {
  color: gray;
}
</style>
