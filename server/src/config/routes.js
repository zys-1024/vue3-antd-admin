module.exports = [{
    path: '/dashboard',
    name: 'Dashboard',
    component: '/views/Dashboard/Dashboard.vue',
    meta: { 
        name: '仪表盘',
        menu: true,
        icon: 'dashboard'
    },
    children: [{
        path: '/dashboard/analyze',
        name: 'Analyze',
        component: '/views/Dashboard/Analyze/Analyze.vue',
        meta: {
            name: '分析页',
            menu: true,
            icon: 'analyze'
        }
    }, {
        path: '/dashboard/monitor',
        name: 'Monitor',
        component: '/views/Dashboard/Monitor/Monitor.vue',
        meta: {
            name: '监控页',
            menu: true,
            icon: 'monitor'
        }
    }, {
        path: '/dashboard/workbench',
        name: 'Workbench',
        component: '/views/Dashboard/Workbench/Workbench.vue',
        meta: {
            name: '工作台',
            menu: true,
            icon: 'workbench'
        }
    }, {
        path: '/',
        alias: '/dashboard',
        redirect: '/dashboard/analyze'
    }]
}, {
    path: '/menu',
    name: 'Menu',
    component: '/views/Menu/Menu.vue',
    meta: {
        name: '嵌套菜单',
        menu: true,
        icon: 'menu'
    },
    children: [{
        path: '/menu/menu1',
        name: 'Menu1',
        component: '/views/Menu/Menu1/Menu1.vue',
        meta: {
            name: 'Menu1',
            menu: true,
            icon: 'menu'
        },
    }, {
        path: '/menu/menu2',
        name: 'Menu2',
        component: '/views/Menu/Menu2/Menu2.vue',
        meta: {
            name: 'Menu2',
            menu: true,
            icon: 'menu'
        },
        children: [{
            path: '/menu/menu2/menu2_1',
            name: 'Menu2_1',
            component: '/views/Menu/Menu2/Menu2_1/Menu2_1.vue',
            meta: {
                name: 'Menu2_1',
                menu: true,
                icon: 'menu'
            },
        }, {
            path: '/menu/menu2/menu2_2',
            name: 'Menu2_2',
            component: '/views/Menu/Menu2/Menu2_2/Menu2_2.vue',
            meta: {
                name: 'Menu2_2',
                menu: true,
                icon: 'menu'
            },
        }]
    }, {
        path: '/menu/menu3',
        name: 'Menu3',
        component: '/views/Menu/Menu3/Menu3.vue',
        meta: {
            name: 'Menu3',
            menu: true,
            icon: 'menu'
        },
        children: [{
            path: '/menu/menu3/menu3_1',
            name: 'Menu3_1',
            component: '/views/Menu/Menu3/Menu3_1/Menu3_1.vue',
            meta: {
                name: 'Menu3_1',
                menu: true,
                icon: 'menu'
            },
            children: [{
                path: '/menu/menu3/menu3_1/menu3_1_1',
                name: 'Menu3_1_1',
                component: '/views/Menu/Menu3/Menu3_1/Menu3_1_1/Menu3_1_1.vue',
                meta: {
                    name: 'Menu3_1_1',
                    menu: true,
                    icon: 'menu'
                },
            }]
        }]
    }]
}]