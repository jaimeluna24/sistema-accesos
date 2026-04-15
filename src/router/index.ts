import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import MainLayout from "../layouts/MainLayout.vue"
import AuthLayout from "../layouts/AuthLayout.vue"
import Dashboard from "../views/dashboard/Dashboard.vue"
import GenerarPase from "../views/pase/GenerarPase.vue"
import EscanearPase from "../views/pase/EscanearPase.vue"
import Login from "../views/auth/Login.vue"
import Usuarios from "../views/usuarios/Usuarios.vue"
import DetallePase from "../views/pase/DetallePase.vue"
import SinPermisos from "../views/auth/SinPermisos.vue"
import Registros from "../views/registros/Registros.vue"
import PaseInvalido from "../views/pase/PaseInvalido.vue"
import Detalles from "../views/pase/Detalles.vue"

import { useAuthStore } from "../services/authService"
const RUTA_POR_ROL: Record<string, string> = {
  administrador: '/dashboard',
  lector:        '/dashboard',
  gestor:        '/dashboard',
  normal:        '/dashboard',
  guardia:       '/escanear-pase',
}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: ('administrador' | 'guardia' | 'lector' | 'gestor' | 'normal')[]
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { roles: ['administrador', 'guardia', 'lector'] }
      },
      {
        path: "registros",
        name: "Registros",
        component: Registros,
        meta: { roles: ['administrador', 'guardia', 'lector'] }
      },
      {
        path: "generar-pase",
        name: "GenerarPase",
        component: GenerarPase,
        meta: { roles: ['administrador', 'lector', 'gestor', 'normal'] }
      },
      {
        path: "escanear-pase",
        name: "EscanearPase",
        component: EscanearPase,
        meta: { roles: ['administrador', 'guardia'] }
      },
      {
        path: "pase-invalido",
        name: "PaseInvalido",
        component: PaseInvalido,
      },
      {
        path: "detalle-pase/:id",
        name: "DetallePase",
        component: DetallePase,
        meta: { roles: ['administrador', 'guardia', 'lector', 'gestor', 'normal'] }
      },
      {
        path: "detalle/:id",
        name: "Detalles",
        component: Detalles,
        meta: { roles: ['administrador', 'lector', 'gestor', 'normal'] }
      },
      {
        path: "usuarios",
        name: "Usuarios",
        component: Usuarios,
        meta: { roles: ['administrador'] }
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
      },
      {
        path: "sin-permisos",
        name: "NoAutorizado",
        component: SinPermisos
      }
    ]
  },
   {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: () => import("../views/NotFound.vue")
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const userRaw = localStorage.getItem("user")
  const isAuthenticated = !!userRaw
  const auth = useAuthStore()

  if (auth.isAuthenticated && to.path === '/') {
    if (userRaw) {
      const user = JSON.parse(userRaw)
      const rol = user.rol.toLocaleLowerCase()
      const ruta = RUTA_POR_ROL[rol] ?? '/no-autorizado'
      return next(ruta)
    }
  } else if (!auth.isAuthenticated && to.meta.requiresAuth) {
    next('/auth/login')
  } else {
    next()
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: "login" })
  }

  const rolesPermitidos = to.meta?.roles
  if (rolesPermitidos && rolesPermitidos.length > 0 && userRaw) {
    const user = JSON.parse(userRaw)
    if (!rolesPermitidos.includes(user.rol)) {
      return next({ name: "NoAutorizado" })
    }
  }

  next()
})

export default router