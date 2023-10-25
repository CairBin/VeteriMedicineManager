
const adminChild = [
    {
        path: '/admin',
        name: 'admin',
        meta: { title: 'admin', isAuth: true, identity: 'admin' },
        component: () => import('./../views/Home/index.vue')
    },
    {
        path: 'order',
        name: 'order',
        meta: { title: 'order', isAuth: true, identity: 'admin' },
        component: () => import('./../views/Order/index.vue')
    },
    {
        path: 'user',
        name: 'user',
        meta: { title: 'user', isAuth: true, identity: 'admin' },
        component: () => import('./../views/User/index.vue')
    },
    {
        path: 'workshop',
        name: 'workshop',
        meta: { title: 'workshop', isAuth: true, identity: 'admin' },
        component: () => import('./../views/Workshop/index.vue')
    },
    {
        path: 'medicine',
        name: 'medicine',
        meta: { title: 'workshop', isAuth: true, identity: 'admin' },
        component: () => import('./../views/Medicine/index.vue')
    }
]


const routes = [
    {
        path: '/',
        name: 'home',
        meta: { title: 'home', isAuth: false },     //User need the token to acess this page, when isAuth is true
        component: () => import('./../views/home.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { title: 'login', isAuth: false },
        component: () => import('./../views/Login/index.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        meta: { title: 'admin', isAuth: true, identity: 'admin' },
        component: () => import('./../views/Manage/index.vue'),
        children: adminChild
    },
    {
        path: '/build/:id',
        name: 'build',
        meta: { title: 'build', isAuth: true, identity: 'user' },
        component: () => import('./../views/WorkshopStatus/index.vue')
    },
    {
        path: '/404',
        name: '404',
        meta: { title: '404', isAuth: false },
        component: () => import('./../views/404/index.vue')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]

export default routes