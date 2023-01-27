import { createRouter, createWebHashHistory, } from "vue-router"

const SignIn = () => import('../page/signin/signin.vue')
const SignUp = () => import('../page/signup/signup.vue')
const Home = () => import('../page/home/home.vue')
const routes = [
    { path: '/signin', component: SignIn },
    // { path: '/signup', component: SignUp },
    { path: '/home', component: Home },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})



export default router