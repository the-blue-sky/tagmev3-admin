import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";
import Users from "@/components/user/Users";
import Roles from "@/components/user/Roles";
import Auths from "@/components/user/Auths";
import Goods from "@/components/goods/Goods";
import Welcome from "@/components/Welcome";

// 路由本身也是一个对象 需要被Vue大对象注册
Vue.use(Router)

// 路由的作用就是统一管理自定义标签 组件嵌套必须要用子标签和路由占位符决定
const router = new Router({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {
            path: '/home', component: Home,
            // 进入直接重定向
            redirect: '/welcome',
            children: [
                // /需要带上不然路由的页面嵌套不生效 就直接跳了
                {path: '/welcome', component: Welcome},
                {path: '/users', component: Users},
                {path: '/roles', component: Roles},
                {path: '/auths', component: Auths},
                {path: '/goods', component: Goods}
            ]
        },
    ]
});

// 挂载路由导航守卫 进行跳转校验 未登录的用户强制跳转到登录页面
router.beforeEach((to, from, next) => {
    //    to 代表将要访问的路径
    //    from 代表偶从哪里跳转
    //    next 放行
    if (to.path === '/login') {
        return next();
    }
    const token = window.sessionStorage.getItem('token');
    if (!token) {
        return next('/login')
    }
    next()
})

export default router
