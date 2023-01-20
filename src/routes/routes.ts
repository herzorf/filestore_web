import SignIn from "../page/signin/signin.vue"
import SignUp from "../page/signup/signup.vue"
import Home from "../page/home/home.vue"
const routes = [
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/home', component: Home },
]

export default routes