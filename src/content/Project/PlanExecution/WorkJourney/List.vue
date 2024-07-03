<template>
  <div class="workList_box">
    <div class="chart_box">
      <div class="chart">
        <span>鑽探作業進度</span>
        <GChart type="PieChart" :data="chart_data" :options="chart_options" />
      </div>
      <div class="chart_value">
        <div>
          <span class="chart_number">11/件</span>
          <span class="chart_word">
            <div class="red"></div>
            未執行</span
          >
        </div>
        <div>
          <span class="chart_number">11/件</span>
          <span class="chart_word"
            ><div class="orange"></div>
            執行中</span
          >
        </div>
        <div>
          <span class="chart_number">22/件</span>
          <span class="chart_word"
            ><div class="green"></div>
            已完成</span
          >
        </div>
      </div>
    </div>
    <div class="calendar_box">
      <MakeCalendar class="top_box" @getDay="getDateData"></MakeCalendar>
      <div class="bottom_box">
        <span class="todo_header">代辦事項</span>
        <ul>
          <li v-for="item in filter_todo" :key="item">
            <span class="todo_status" v-if="!item.isStatus">處理中</span>
            <span class="todo_finish" v-else>已完成</span>
            <div class="todo_content">
              <span>{{ item.title }}</span>
              <span>By {{ item.people }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { GChart } from 'vue-google-charts'
import MakeCalendar from '@/views/MakeComponents/MakeCalendar.vue'

//代辦清單
const todo_list = ref([
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中18_1',
    people: 'xxx',
    isStatus: true,
    date: '2024/6/18',
  },
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中18_2',
    people: 'xxx',
    isStatus: false,
    date: '2024/6/18',
  },
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中18_3',
    people: 'xxx',
    isStatus: false,
    date: '2024/6/18',
  },
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中18_4',
    people: 'xxx',
    isStatus: false,
    date: '2024/6/18',
  },
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中16',
    people: 'xxx',
    isStatus: false,
    date: '2024/6/16',
  },
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中15',
    people: 'xxx',
    isStatus: false,
    date: '2024/6/15',
  },
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中13',
    people: 'xxx',
    isStatus: false,
    date: '2024/6/13',
  },
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中19',
    people: 'xxx',
    isStatus: false,
    date: '2024/6/19',
  },
  {
    title: '工作歷程建立中工作歷程建立中工作歷程建立中20',
    people: 'xxx',
    isStatus: false,
    date: '2024/6/20',
  },
])

//圖表資訊
const chart_data = ref([
  ['Task', 'Hours per Day'],
  ['未執行', 12],
  ['執行中', 11],
  ['已完成', 22],
])
const chart_options = ref({
  chartArea: { width: '100%', height: '100%' },
  width: 200,
  height: 200,
  legend: 'none',
  pieHole: 0.5,
  backgroundColor: 'none',
  slices: [
    { color: 'green' }, // 未執行
    { color: 'orange' }, // 執行中
    { color: 'red' }, // 已完成
  ],
})
//視窗變動調整圖表大小
const resizeChart = () => {
  const chartElement = document.querySelector('.chart')
  if (chartElement) {
    const width = chartElement.offsetWidth * 0.8
    const height = chartElement.offsetHeight * 0.8

    if (width <= 200 || height <= 200) {
      chart_options.value.width = 200
      chart_options.value.height = 200
    } else {
      chart_options.value.width = `${width}`
      chart_options.value.height = `${height}`
    }
  }
}
onMounted(() => {
  window.addEventListener('resize', resizeChart)
  resizeChart()
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
})

//行事曆篩選日期
const choose_date = ref(new Date().toLocaleDateString())
const getDateData = (date) => {
  console.log(date)
  choose_date.value = date.Format_Date
  console.log(choose_date.value)
}
const filter_todo = computed(() => {
  return todo_list.value.filter((item) => item.date == choose_date.value)
})
</script>

<style scoped>
.workList_box {
  padding: 2rem;
  height: 100%;
  display: flex;
  justify-content: space-around;
}
.chart_box {
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
.chart_box .chart {
  background-color: #ffffff;
  border-radius: 2%;
  padding: 1%;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 0.7;
}
.chart_box .chart span {
  color: black;
  font-size: 22px;
  font-weight: 600;
  padding-bottom: 1rem;
}
.chart_box .chart_value {
  background-color: #ffffff;
  border-radius: 2%;
  padding: 1.5%;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.chart_box .chart_value div {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 0.3;
  border-left: 3px gray solid;
  border-right: 3px gray solid;
}
.chart_number {
  font-size: 22px;
  font-weight: 600;
  padding: 1rem 0 1rem 0;
}
.chart_word {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.chart_word .red {
  background-color: red;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.chart_word .orange {
  background-color: rgb(236, 172, 52);
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.chart_word .green {
  background-color: rgb(3, 150, 15);
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.calendar_box {
  background-color: #ffffff;
  height: 100%;
  width: 30%;
  min-width: 30%;
  padding: 1%;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.calendar_box .top_box {
  height: 50%;
  padding-bottom: 1.5rem;
}
.calendar_box .bottom_box {
  height: 50%;
  padding: 0 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.calendar_box .bottom_box .todo_header {
  color: black;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 0.5rem;
}
.calendar_box .bottom_box ul {
  list-style: none;
  padding: 0%;
  width: 100%;
  overflow-y: auto;
}
.calendar_box .bottom_box ul li {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border-left: 10px rgb(140, 135, 216) solid;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.calendar_box .bottom_box .todo_status {
  padding: 0.8rem 0.4rem;
  border-radius: 8px;
  color: rgb(5, 158, 0);
  border: 2px rgb(5, 158, 0) solid;
  margin-right: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
}
.calendar_box .bottom_box .todo_finish {
  padding: 0.8rem 0.4rem;
  border-radius: 8px;
  color: rgb(121, 121, 121);
  border: 2px rgb(121, 121, 121) solid;
  margin-right: 0.5rem;
  font-weight: 600;
  white-space: nowrap;
}
.calendar_box .bottom_box .todo_content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 16px;
}
@media (max-width: 1100px) {
  .workList_box {
    flex-direction: column;
    align-items: center;
  }
.calendar_box .top_box {
  height: 100%;
}
.calendar_box .bottom_box {
  height: 100%;
}
  .chart_box {
    width: 80%;
    margin-bottom: 1rem;
  }
  .chart_box .chart {
    margin-bottom: 1rem;
  }
  .calendar_box {
    width: 80%;
  }
}
@media (max-width: 500px) {
  .workList_box {
    padding: 0.5rem;
  }
  .chart_box {
    width: 100%;
  }
  .calendar_box {
    width: 100%;
  }
}
</style>
