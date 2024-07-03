<template>
  <!-- 標題 -->
  <div class="title_box">
    <span>照片上傳</span>
  </div>
  <!-- 內容 -->
  <div class="picture_box">
    <div class="picture_type">
      <ul>
        <li
          v-for="item in photo_title"
          :key="item"
          @click="changeTitle(item)"
          :class="{ photo_btn_now: item === chooseTitle }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="picture_content">
      <!-- 顯示照片 -->
      <div class="photo_view" v-for="(image, i) in filterPhoto" :key="i">
        <img :src="image.Url" />
        <div class="picture_icon">
          <span @click="delImg(i)" v-show="!isEdit"><i class="bx bx-trash"></i></span>
          <span @click="openImg(image.Url)"><i class="bx bx-zoom-in"></i></span>
        </div>
      </div>
      <!-- 上傳區域 -->
      <div id="photo_area" class="photo_upload" @click="uploadPhoto" v-show="!isEdit">
        <span>點擊or拖曳上傳<br />僅支援.jpg, .jpeg, .png圖檔</span>
        <input
          type="file"
          ref="inputImage"
          class="d-none"
          accept=".jpg, .jpeg, .png"
          multiple
          @change="handleDrop($event.target.files)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

// 判斷儲存編輯狀態
const isEdit = ref(false)
defineExpose({
  isEdit,
})
// 照片類型選擇
const photo_title = reactive(['所有專案', '岩心照片', '施工前', '施工中', '施工後', '領班日報表'])
const chooseTitle = ref('所有專案')
const changeTitle = (newVal) => {
  chooseTitle.value = newVal
}
// 照片清單
const photo_list = ref([
  {
    name: 'Image.name',
    type: 'Image.type',
    size: 'Image.size',
    Date: 'Image.lastModifiedDate',
    Url: 'https://miro.medium.com/v2/resize:fit:1400/1*FKlRYAU5z-74RYqsTYrOAQ@2x.png',
    photo_type: '岩心照片',
  },
  {
    name: 'Image.name',
    type: 'Image.type',
    size: 'Image.size',
    Date: 'Image.lastModifiedDate',
    Url: 'https://miro.medium.com/v2/resize:fit:1400/1*FKlRYAU5z-74RYqsTYrOAQ@2x.png',
    photo_type: '施工前',
  },
])
// 篩選照片
const filterPhoto = computed(() => {
  if (chooseTitle.value == '所有專案') {
    return photo_list.value
  } else {
    return photo_list.value.filter((item) => item.photo_type === chooseTitle.value)
  }
})
//上傳照片
const inputImage = ref(null)
const uploadPhoto = () => {
  inputImage.value.click()
}
const handleDrop = (image) => {
  for (let index = 0; index < image.length; index++) {
    const Image = image[index]
    if (Image.type === 'image/jpeg' || Image.type === 'image/png') {
      const reader = new FileReader()
      reader.readAsDataURL(Image)
      reader.onload = () => {
        let photo_item = {
          name: Image.name,
          type: Image.type,
          size: Image.size,
          Date: Image.lastModifiedDate,
          Url: reader.result,
          photo_type: chooseTitle.value,
        }
        photo_list.value.push(photo_item)
      }
    } else {
      alert('不支援的檔案格式！上傳僅支援.jpg, .jpeg, .png圖檔')
    }
  }
  inputImage.value = null
}
// 製作臨時url
const openImg = async (src) => {
  if (!src.includes('http')) src = URL.createObjectURL(await (await fetch(src)).blob())
  window.open(src)
}
// 刪除照片
const delImg = (i) => {
  photo_list.value.splice(i, 1)
}
</script>

<style scoped>
/* 標題 */
.title_box {
  height: auto;
  width: 100%;
  border-bottom: 3px rgb(156, 155, 155) solid;
  margin-bottom: 1rem;
}
.title_box span {
  font-size: 22px;
  font-weight: 600;
}
/* 內容 */
.picture_box {
  width: 100%;
  display: grid;
  grid-template-columns: 16% 84%;
}
/* 照片類型選單 */
.picture_type ul {
  list-style: none;
  padding-left: 1rem;
}
.picture_type ul li {
  padding: 0.7rem 0.5rem;
  background-color: rgb(247, 170, 54);
  margin-bottom: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
}
.picture_type ul li:hover {
  background-color: rgb(243, 109, 0);
  color: white;
}
.photo_btn_now {
  background-color: rgb(243, 109, 0) !important;
  color: white;
}
/* 照片內容 */
.picture_content {
  padding: 0 2rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
/* 上傳區域 */
.picture_content .photo_upload {
  background-color: #ffffff;
  width: 200px;
  height: 200px;
  border-style: dotted;
  border-color: rgba(0, 0, 0, 0.5);
  border-width: 4px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
/* 照片顯示 */
.picture_content .photo_view {
  background-color: #ffffff;
  width: 200px;
  height: 200px;
  border-style: dotted;
  border-color: rgba(0, 0, 0, 0.5);
  border-width: 4px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2%;
  margin-bottom: 1%;
  flex-direction: column-reverse;
}
.photo_view img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: auto;
  display: block;
}
/* 照片檢視 刪除 */
.photo_view:hover .picture_icon {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  color: white;
}
.photo_view .picture_icon span i {
  display: none;
}
.photo_view:hover .picture_icon span i {
  display: block;
  color: red;
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.8s;
}
.photo_view:hover .picture_icon span:last-child i {
  display: block;
  color: rgb(0, 60, 255);
  font-size: 1.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.8s;
}
</style>
