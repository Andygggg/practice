<template>
  <div class="project_content_container">
    <contentNavbar />
    <contentCard />
  </div>
</template>

<script setup>
import contentNavbar from '@/views/ProjectContent/contentNavbar.vue'
import contentCard from '@/views/ProjectContent/contentCard.vue'
</script>

<style scoped>
.project_content_container {
  height: 100vh;
  width: 100vw;
  background-color: #d6d4d4;
  display: grid;
  grid-template-rows: 10% 90%;
}
</style>
