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
            icon: 'menu2'
        }
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
                icon: 'menu2'
            }
        }, {
            path: '/menu/menu2/menu2_2',
            name: 'Menu2_2',
            component: '/views/Menu/Menu2/Menu2_2/Menu2_2.vue',
            meta: {
                name: 'Menu2_2',
                menu: true,
                icon: 'menu2'
            }
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
                path: '/menu/menu3/menu3_1_1',
                name: 'Menu3_1_1',
                component: '/views/Menu/Menu3/Menu3_1/Menu3_1_1/Menu3_1_1.vue',
                meta: {
                    name: 'Menu3_1_1',
                    menu: true,
                    icon: 'menu2'
                }
            }]
        }]
    }]
}, {
    path: '/result',
    name: 'Result',
    component: '/viwes/Result/Result.vue',
    meta: {
        name: '结果页',
        menu: true,
        icon: 'result'
    },
    children: [{
        path: '/result/success',
        name: 'ResultSuccess',
        component: '/views/Result/Success/Success.vue',
        meta: {
            name: '成功页',
            menu: true,
            icon: 'success'
        }
    }, 
    {
        path: '/result/error',
        name: 'ResultError',
        component: '/views/Result/Error/Error.vue',
        meta: {
            name: '失败页',
            menu: true,
            icon: 'error'
        }
    }]
}, {
    path: '/Exception',
    name: 'Exception',
    component: '/views/Exception/Exception.vue',
    meta: {
        name: '异常页',
        menu: true,
        icon: 'exception'
    },
    children: [{
        path: '/Exception/403',
        name: '403',
        component: '/views/Exception/403/403.vue',
        meta: {
            name: '403',
            menu: true,
            icon: '403'
        }
    }, {
        path: '/exception/404',
        name: '404',
        component: '/views/Exception/404/404.vue',
        meta: {
            name: '404',
            menu: true,
            icon: '404'
        }
    }, {
        path: '/exception/500',
        name: '500',
        component: '/views/Exception/500/500.vue',
        meta: {
            name: '500',
            menu: true,
            icon: '500'
        }
    }]
}, {
    path: '/personal',
    name: 'Personal',
    component: '/views/Personal/Personal.vue',
    meta: {
        name: '个人中心',
        menu: true,
        icon: 'personal'
    },
    children: [{
        path: '/personal/info',
        name: 'PersonalInfo',
        component: '/views/Personal/PersonalInfo/PersonalInfo.vue',
        meta: {
            name: '个人信息',
            menu: true,
            icon: 'user_info'
        }
    }, {
        path: '/personal/setting',
        name: 'PersonalSetting',
        component: '/views/Personal/PersonalSetting/PersonalSetting.vue',
        meta: {
            name: '个人设置',
            menu: true,
            icon: 'user_setting'
        }
    }]
}, {
    path: '/system_setting',
    name: 'SystemSetting',
    component: '/views/SystemSetting/SystemSetting.vue',
    meta: {
        name: '系统设置',
        menu: true,
        icon: 'setting'
    }
}, {
    path: '/external_link',
    name: 'ExternalLink',
    component: '/views/ExternalLink/ExternalLink.vue',
    meta: {
        name: '外链',
        menu: true,
        icon: 'external_link'
    }
}]