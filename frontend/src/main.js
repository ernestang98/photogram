import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { isLoggedIn } from "./utils/auth";

import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import InfoComponent from './components/InfoComponent'
import UserComponent from './components/UserComponent'
import AdminComponent from "./components/AdminComponent";
import CreatePostComponent from "@/components/CreatePostComponent";
import EditPostComponent from "@/components/EditPostComponent";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueRouter);

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'info', component: InfoComponent },
    { path: '/login', name: 'login', component: LoginComponent },
    { path: '/register', name: 'register', component: RegisterComponent },
    { path: '/user', name: 'user', component: UserComponent },
    { path: '/admin', name: 'admin', component: AdminComponent },
    { path: '/createPost', name: 'createPost', component: CreatePostComponent },
    { path: '/editPost/:id', name: 'editPost', component: EditPostComponent }
  ]
});

router.beforeEach((to, from, next) => {

  if (!isLoggedIn()) {
    if (to.name === 'user' || to.name === 'admin' || to.name === 'createPost') {
      next({path: '/login'})
    }
    next()
  }
  else {
    let isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      if (to.name === 'user') {
        next({path: '/admin'})
      }
      if (to.name === 'login') {
        next({path: '/admin'})
      }
    }
    else {
      if (to.name === 'admin') {
        next({path: '/user'})
      }
      if (to.name === 'login') {
        next({path: '/user'})
      }
    }
    next()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
