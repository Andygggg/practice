<template>
  <div class="login_box">
    <div class="wrapper">
      <h1>
        <span>練習用</span>
      </h1>
      <select class="form-select" aria-label="Default select example" v-model="filter">
            <option v-for="item in projectOption" :key="item.value" :value="item.value">
              {{ item.text }}
            </option>
          </select>
      <div class="login">
        <div class="user">
          <div class="input_box">
            <input type="text" placeholder="帳號" required v-model="User.username" />
            <i class="bx bxs-user"></i>
          </div>
          <div class="input_box">
            <input type="password" placeholder="密碼" required v-model="User.password" />
            <i class="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" class="btn_login" @click="PushToPractice">登入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {  reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userSignIn } from '@/stores/signIn.js'

const filter = ref(0)
const projectOption = reactive([
  { value: 0, text: '地質專探系統(草稿設計)' },
  { value: 1, text: '六角課程最終作業' },
])

const User = ref({
  username: 'andyhello31468@gmail.com',
  password: 'andy0314',
})

const SignIn = userSignIn()
const router = useRouter()
const PushToPractice = () => {
  if (filter.value === 0) {
    router.push({ name: 'ProjectContent' }) 
  } else if (filter.value === 1) {
    SignIn.userSignIn(User.value)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins');
.login_box {
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('@/assets/login.jpg') no-repeat;
  background-size: cover;
  background-position: center;
}
.wrapper {
  width: 25vw;
  background: #d9d9d9a6;
  border: 2px solid rgba(0, 0, 0, 0.212);
  backdrop-filter: blur(20px);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
  color: #000000;
  border-radius: 10px;
  padding: 40px 40px;
  backdrop-filter: blur(8px); /* 模糊效果 */
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper h1 {
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.wrapper h1 img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.wrapper .login {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrapper .login .user {
  flex-grow: 0.1;
}
.wrapper .input_box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 60px 0;
  color: #000000;
  font-weight: 600;
}
.input_box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 2px solid rgb(56, 56, 56);
  font-size: 16px;
  color: #ffffff;
  padding: 20px 45px 20px 5px;
}
.input_box input::placeholder {
  color: #000000;
  font-weight: 600;
}
.input_box i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}
.form-select {
  width: 80%;
  background: transparent;
  border: 1px solid rgb(88, 88, 88);
  cursor: pointer;
}
.wrapper .btn_login {
  width: 100%;
  height: 45px;
  background: #003153;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
}
.wrapper .btn_login:hover {
  background-color: black;
  color: #ffffff;
}
@media (max-width: 800px) {
  .wrapper {
    width: 100vw;
  }
}
</style>
