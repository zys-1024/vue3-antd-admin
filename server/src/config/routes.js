module.exports = [{
    path: '',
    name: 'Dashboard',
    component: '/views/Dashboard/Dashboard.vue',
    meta: { 
        name: '仪表盘',
        menu: true,
        icon: 'dashboard'
    }
}, {
    path: 'dashboard',
    redirect: '/'
}]