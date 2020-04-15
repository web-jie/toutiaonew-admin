import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import("@/views/Index.vue"),
    // 重定向
    redirect: "post-list",
    children: [
      {path: 'post-list',component: ()=>import ("@/components/PostList")},
      {path: "new-post", component: ()=>import("@/components/Newpost")}
    ]
  },
  {
    path: '/login',
    component: () => import("@/views/Login.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
