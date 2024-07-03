<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand" @click.prevent="PushToProjectContent">
          <span>地質鑽探系統 | xxx工程</span>
        </a>
        <div class="user_menu">
          <div class="dropdown">
            <button
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bx bxs-user-circle"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton">
              <li><span class="dropdown-item" @click="PushToProjectManagement"><i class='bx bxs-cog'></i>專案設定</span></li>
              <li><span class="dropdown-item" @click="PushToParameterManagement"><i class='bx bxs-wrench' ></i>參數管理</span></li>
              <li><hr class="dropdown-divider"></li>
              <li><span class="dropdown-item"  @click="signOut"><i class="bx bx-log-out"></i>登出</span></li>
            </ul>
          </div>
          <div class="user_data">
            <span>andy WU</span>
            <span>隨便玩玩</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const PushToProjectContent = () => {
  router.push({ name: 'ProjectContent' })
}
const PushToParameterManagement = () => {
  router.push({ name: 'ParameterManagement' })
}
const PushToProjectManagement = () => {
  router.push({ name: 'ProjectManagement' })
}
const signOut = () => {
  router.push({ name: 'SignIn' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&display=swap');
nav {
  background-color: rgb(255, 255, 255);
}
.navbar-brand {
  font-family: 'Noto Sans TC', sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  color: rgb(0, 0, 0);
  cursor: pointer;
}
.navbar-brand img {
  width: 30px;
  height: 30px;
  object-fit: cover;
}
.user_menu {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}
.user_menu button {
  border: none;
  background-color: #ffffff;
}
.dropdown-item {
  display: flex;
  align-items: center;
}
.dropdown-item:hover{
  cursor: pointer;
  background-color: rgb(78, 146, 235);
  color: #ffffff;
}
.bxs-user-circle {
  font-size: 2.8rem;
}
.user_data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.user_data span {
  font-weight: 500;
  color: rgb(0, 0, 0);
  font-family: 'Noto Sans TC', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}
</style>
