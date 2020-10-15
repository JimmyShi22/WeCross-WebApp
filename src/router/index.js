import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'homepage',
      component: () => import('@/views/homepage/index'),
      meta: { title: '个人主页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/accountAdmin',
    component: Layout,
    name: 'AccountAdmin',
    redirect: 'accountAdmin/index',
    meta: { title: '账号管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'index',
        children: [
          {
            path: 'register',
            name: 'register',
            component: () => import('@/views/AccountAdmin/index'),
            meta: { title: '账号注册', icon: 'el-icon-user' }
          }
        ]
      }
    ]
  },

  {
    path: '/chainAdmin',
    component: Layout,
    name: 'ChainAdmin',
    redirect: 'chainAdmin/index',
    meta: { title: '跨链管理' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/ChainAdmin/index'),
        meta: { title: '跨链管理', icon: 'el-icon-connection' }
      }
    ]
  },
  {
    path: '/resourceAdmin',
    component: Layout,
    name: 'ResourceAdmin',
    redirect: '/resourceAdmin/index',
    meta: { title: '资源管理', icon: 'el-icon-notebook-1' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/ResourceAdmin/index'),
        meta: { title: '资源管理', icon: 'el-icon-notebook-1' }
      }
    ]
  },
  {
    path: '/transactionAdmin',
    component: Layout,
    name: 'TransactionAdmin',
    redirect: 'transactionAdmin/index',
    meta: { title: '交易管理', icon: 'el-icon-s-promotion' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/TransactionAdmin/index'),
        meta: { title: '交易管理', icon: 'el-icon-s-promotion' }
      }
    ]
  },
  {
    path: '/documents',
    component: Layout,
    name: 'Documents',
    redirect: '/documents/index',
    meta: { title: '参考文档', icon: 'el-icon-document' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/DocumentView/index'),
        meta: { title: '参考文档', icon: 'el-icon-document' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router