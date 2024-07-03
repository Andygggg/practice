import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProjectSetting = defineStore('projectSetting', () => {
  const projectList = ref([
    {
      name: '地質鑽探系統A',
      people: '正常人',
      email: 'MaaMaaMaaMaa@gmail.com',
    },
    {
      name: '地質鑽探系統B',
      people: '正常人',
      email: 'MaaMaaMaaMaa@gmail.com',
    },
  ])
  const project_title = computed(() => {
    let data = [{ title: '所有人員' }]
    projectList.value.forEach((element) => {
      data.push({ title: element.name })
    })
    return data
  })
  const chooseTitle = ref('所有人員')
  const changeTitle = (newVal) => {
    chooseTitle.value = newVal
  }

  return {  project_title, chooseTitle, changeTitle }
})
