<template>
  <div class="setting_box">
    <contentNavbar />
    <div class="bottom_box"><RouterView /></div>
  </div>
</template>

<script setup>
import contentNavbar from '@/views/ProjectContent/contentNavbar.vue'
</script>

<style scoped>
.setting_box {
  height: 100vh;
  width: 100vw;
  background-color: #d6d4d4;
}
.bottom_box {
  height: calc(100vh - 70px);
}
</style>

