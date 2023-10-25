// this is about route configuration.For more details,please refer to https://router.vuejs.org/
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHistory(),
    routes
})

/*
    global before guards
    please refer to https://router.vuejs.org/guide/advanced/navigation-guards.html
*/
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        if (localStorage.getItem('token') && localStorage.getItem('identity') === to.meta.identity)  //check token
            next()
        else {
            if (localStorage.getItem('identity') && localStorage.getItem('identity') !== to.meta.identity)
                ElMessage({
                    type: 'error',
                    message: '身份不匹配'
                })
            ElMessage({ type: 'warning', message: '请先登录' })
            next('/login')
        }
    } else
        next()
})

export default router