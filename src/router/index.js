import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //登入
    {
      path: '/',
      name: 'SignIn',
      component: () => import('../content/SignIn/index.vue'),
      children: [
        {
          path: 'UserLogin',
          name: 'UserLogin',
          component: () => import('../content/SignIn/UserLogin.vue'),
        },
      ],
      redirect: { name: 'UserLogin' },
    },
    // 專案目錄
    {
      path: '/projectContent',
      name: 'ProjectContent',
      component: () => import('../content/ProjectContent/ProjectContent.vue'),
    },
    // 專案設定
    {
      path: '/projectSetting',
      name: 'ProjectSetting',
      component: () => import('../content/ProjectSetting/index.vue'),
      children: [
        //參數管理
        {
          path: 'parameterManagement',
          name: 'ParameterManagement',
          component: () => import('../content/ProjectSetting/ParameterManagement.vue'),
        },
        // 專案設定
        {
          path: 'ProjectManagement',
          name: 'ProjectManagement',
          component: () => import('../content/ProjectSetting/ProjectManagement.vue'),
        },
      ],
    },
    //專案
    {
      path: '/Project',
      name: 'Project',
      component: () => import('../content/Project/index.vue'),
      children: [
        // 計畫執行
        {
          path: 'PlanExecution',
          name: 'PlanExecution',
          meta: {
            title: '計畫執行',
            icon: 'bx bx-line-chart-down',
            isOnHeader: true,
          },
          children: [
            // 孔座指派
            {
              path: 'PositionAssign',
              name: 'PositionAssign',
              component: () => import('../content/Project/PlanExecution/PositionAssign/index.vue'),
              meta: {
                title: '孔座指派',
                isOnSidebar: true,
              },
              children: [
                {
                  path: 'PositionAssign_List',
                  name: 'PositionAssign_List',
                  component: () =>
                    import('../content/Project/PlanExecution/PositionAssign/List.vue'),
                },
              ],
              redirect: { name: 'PositionAssign_List' },
            },
            // 孔座狀態篩選
            {
              path: 'PositionFilter',
              name: 'PositionFilter',
              component: () => import('../content/Project/PlanExecution/PositionFilter/index.vue'),
              meta: {
                title: '孔座狀態篩選',
                isOnSidebar: true,
              },
              children: [
                {
                  path: 'PositionFilter_List',
                  name: 'PositionFilter_List',
                  component: () =>
                    import('../content/Project/PlanExecution/PositionFilter/List.vue'),
                },
              ],
              redirect: { name: 'PositionFilter_List' },
            },
            // 作業行程
            {
              path: 'WorkJourney',
              name: 'WorkJourney',
              component: () => import('../content/Project/PlanExecution/WorkJourney/index.vue'),
              meta: {
                title: '作業行程',
                isOnSidebar: true,
              },
              children: [
                {
                  path: 'WorkJourney_List',
                  name: 'WorkJourney_List',
                  component: () => import('../content/Project/PlanExecution/WorkJourney/List.vue'),
                },
              ],
              redirect: { name: 'WorkJourney_List' },
            },
          ],
          redirect: { name: 'WorkJourney_List' },
        },
        // 作業管理
        {
          path: 'WorkManagement',
          name: 'WorkManagement',
          meta: {
            title: '作業行程',
            icon: 'bx bx-copy-alt',
            isOnHeader: true,
          },
          children: [
            // 孔位位置設置
            {
              path: 'HoleSetting',
              name: 'HoleSetting',
              component: () => import('../content/Project/WorkManagement/HoleSetting/index.vue'),
              meta: {
                title: '孔位位置設置',
                isOnSidebar: true,
              },
              children: [
                {
                  path: 'HoleSetting_List',
                  name: 'HoleSetting_List',
                  component: () => import('../content/Project/WorkManagement/HoleSetting/List.vue'),
                },
              ],
              redirect: { name: 'HoleSetting_List' },
            },
            // 鑽探日報表
            {
              path: 'Report1',
              name: 'Report1',
              component: () => import('../content/Project/WorkManagement/Report1/index.vue'),
              meta: {
                title: '鑽探日報表',
                isOnSidebar: true,
              },
              children: [
                {
                  path: 'Report1_List',
                  name: 'Report1_List',
                  component: () => import('../content/Project/WorkManagement/Report1/List.vue'),
                },
                {
                  path: 'Report1_Create',
                  name: 'Report1_Create',
                  component: () => import('../content/Project/WorkManagement/Report1/Create.vue'),
                },
              ],
              redirect: { name: 'Report1_List' },
            },
            // 督導日報
            {
              path: 'Report2',
              name: 'Report2',
              component: () => import('../content/Project/WorkManagement/Report2/index.vue'),
              meta: {
                title: '督導日報',
                isOnSidebar: true,
              },
              children: [
                {
                  path: 'Report2_List',
                  name: 'Report2_List',
                  component: () => import('../content/Project/WorkManagement/Report2/List.vue'),
                },
                {
                  path: 'Report2_Create',
                  name: 'Report2_Create',
                  component: () => import('../content/Project/WorkManagement/Report2/Create.vue'),
                },
              ],
              redirect: { name: 'Report2_List' },
            },
            // 試驗室報表
            {
              path: 'LabReport',
              name: 'LabReport',
              component: () => import('../content/Project/WorkManagement/LabReport/index.vue'),
              meta: {
                title: '試驗室報表',
                isOnSidebar: true,
              },
              children: [
                {
                  path: 'LabReport_List',
                  name: 'LabReport_List',
                  component: () => import('../content/Project/WorkManagement/LabReport/List.vue'),
                },
              ],
              redirect: { name: 'LabReport_List' },
            },
          ],
          redirect: { name: 'HoleSetting_List' },
        },
      ],
      redirect: { name: 'PlanExecution' },
    },
     //六角課程最終作業
    {
      path: '/DashBoard',
      name: 'HexSchoolFinal',
      component: () => import('../content/HexSchoolFinal/DashBoard.vue'),
      children: [
        {
          path: 'ProductList',
          name: 'ProductList',
          component: () => import('../content/HexSchoolFinal/ProductList.vue'),
          meta: {
            title: '產品',
          },
        },
        {
          path: 'OrderList',
          name: 'OrderList',
          component: () => import('../content/HexSchoolFinal/OrderList.vue'),
          meta: {
            title: '訂單',
          },
        },
        {
          path: 'DiscountList',
          name: 'DiscountList',
          component: () => import('../content/HexSchoolFinal/DiscountList.vue'),
          meta: {
            title: '優惠劵',
          },
        },
      ],
      redirect: { name: 'ProductList' },
    },
  ],
})

export default router
