<template>
  <div class="content_container">
    <div class="function_bar">
      <div class="function_bar_left">
        <h2>所有專案</h2>
        <hr />
        <MakeButton btn_class="btn_green">專案設定</MakeButton>
      </div>
      <div class="function_bar_right">
        <div class="input_box">
          <input type="text" placeholder="請輸入關鍵字" v-model="keyWord" />
          <i class="bx bx-search-alt-2"></i>
        </div>
      </div>
    </div>
    <div class="cards_box">
      <div class="cards" v-for="item in filter_data" :key="item.id">
        <div class="card_left">
          <h3>{{ item.title }}</h3>
          <span><i class="bx bx-user"></i>{{ item.people }}</span>
          <span><i class="bx bx-envelope"></i>{{ item.mail }}</span>
          <span><i class="bx bxs-traffic-cone"></i>{{ item.address }}</span>
        </div>
        <div class="card_right">
          <span @click="PushToProject"><i class="bx bxs-log-in-circle"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import MakeButton from '@/views/MakeComponents/MakeButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
//關鍵字
const keyWord = ref('')
const content_data = ref([
  {
    id: '1',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '2',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '3',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '4',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '5',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '6',
    title: '不爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '7',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '8',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '9',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '10',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
  {
    id: '11',
    title: '百爛工程',
    people: '我是富足人',
    mail: 'aaaaaaaaa@gmail.com',
    address: '台北市士林區溪山里',
  },
])

const filter_data = computed(() => {
  if (keyWord.value === '') {
    return content_data.value
  } else {
    return content_data.value.filter((item) => item.title.toLowerCase().includes(keyWord.value))
  }
})

const PushToProject = () => {
  router.push({ name: 'Project' })
}
</script>

<style scoped>
.content_container {
  padding: 0 1%;
  display: grid;
  grid-template-rows: 12% 88%;
}
.function_bar {
  padding: 0% 1% 1% 1%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.function_bar h2 {
  margin: 0%;
  font-weight: 600;
}
.function_bar .function_bar_left {
  display: flex;
  align-items: center;
  flex-grow: 1;
}
hr {
  height: 40px;
  border-right: 2px black solid;
  margin: 0% 2%;
}
.function_bar_right .input_box {
  position: relative;
  width: 100%;
  height: auto;
  color: #000000;
  font-weight: 600;
}
.input_box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0.459);
  border-radius: 40px;
  font-size: 14px;
  color: #000000;
  padding: 10px 45px 10px 20px;
}
.input_box input::placeholder {
  color: #000000;
}
.input_box i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}
.cards_box {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow-y: auto;
}
.cards_box .cards {
  margin: 0 1% 1% 1%;
  padding: 0 0.5%;
  min-width: 23%;
  min-height: 33%;
  background-color: #ffffff;
  border-radius: 12px;
  border: 4px #b9b9b9 solid;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.cards_box .cards .card_left {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.card_left h3 {
  font-weight: 900;
  padding: 1% 0;
}
.card_left span {
  font-size: 16px;
  padding-bottom: 0.7rem;
  display: flex;
  align-items: center;
}
.card_left span i {
  font-size: 1.6rem;
  padding-right: 0.8rem;
  color: black;
}
.card_right span i {
  font-size: 3.2rem;
  cursor: pointer;
  color: #0058bd;
  transform: scale(1, 1);
  transition: all 1s ease-out;
}
.card_right span i:hover {
  color: #000000;
  transform: scale(1.2, 1.2);
}
@media (max-width: 920px) {
  .cards_box {
    justify-content: center;
  }
  .cards_box .cards {
    min-width: 40vw;
    min-height: 33%;
  }
}
@media (max-width: 768px) {
  .cards_box {
    justify-content: center;
  }
  .cards_box .cards {
    min-width: 80vw;
    min-height: 30%;
  }
}
@media (max-width: 490px) {
  .function_bar {
    justify-content: center;
    flex-wrap: wrap;
  }
  .function_bar .function_bar_left {
    justify-content: center;
  }
  .cards_box {
    padding-top: 5%;
  }
}
</style>
