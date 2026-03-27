import { createRouter, createWebHistory } from "vue-router"

import MainLayout from "../layouts/MainLayout.vue"
import AuthLayout from "../layouts/AuthLayout.vue"

import Dashboard from "../views/dashboard/Dashboard.vue"
import GenerarPase from "../views/pase/GenerarPase.vue"
import EscanearPase from "../views/pase/EscanearPase.vue"
import Login from "../views/auth/Login.vue"
import Usuarios from "../views/usuarios/Usuarios.vue"
import DetallePase from "../views/pase/DetallePase.vue"
import { useAuthStore } from '../services/authService'

const routes = [
  {
    path: "/",
    component: MainLayout,
        meta: { requiresAuth: true },

    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "generar-pase",
        name: "GenerarPase",
        component: GenerarPase
      },
      {
        path: "escanear-pase",
        name: "EscanearPase",
        component: EscanearPase
      },
      {
        path: "escanear-pase",
        name: "EscanearPase",
        component: EscanearPase
      },
      {
        path: "detalle-pase/:id",
        name: "DetallePase",
        component: DetallePase
      },
      {
        path: "usuarios",
        name: "Usuarios",
        component: Usuarios
      }
    ]
  },

  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: Login
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {

//   const isAuthenticated = localStorage.getItem("user")

//   if (to.name !== "login" && !isAuthenticated) {
//     next({ name: "login" })
//   } else {
//     next()
//   }

// })

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    return '/auth/login'
  }
})


export default router