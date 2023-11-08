// 配置路由相关的信息
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/core',
        name: 'core',
        hidden: true,
        component: () => import('@/components/main/Core.vue')
    },{
        path: '/page',
        name: 'page',
        hidden: true,
        component: () => import('@/components/main/page.vue')
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
