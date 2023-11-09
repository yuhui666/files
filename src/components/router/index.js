import { createRouter, createWebHashHistory } from 'vue-router'

const Core = () => import('@/components/main/Core.vue'/* webpackChunkName: "recommend" */)
const Page = () => import('@/components/main/Page.vue'/* webpackChunkName: "singer" */)

const routes = [
    {
        path: '/',
        redirect: '/main/core'
    },
    {
        path: '/main/page',
        component: Page,
    },
    {
        path: '/main/core',
        component: Core,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
