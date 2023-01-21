import SignUp from "../page/signup/signup.vue"
import Home from "../page/home/home.vue"
import SignIn from "../page/signin/signin.vue"
import { createRouter, createWebHashHistory, } from "vue-router"
const routes = [
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/home', component: Home },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})



export default router