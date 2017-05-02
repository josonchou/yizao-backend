import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'is-active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            name: '首页',
            path: '/',
            component: require('../views/Home.vue')
        },
        ...generateRoutesFromMenu(menuModule.state.items),
        {
            path: '*',
            redirect: '/'
        }
    ]
})

// Menu should have 2 levels
function generateRoutesFromMenu(menu = [], routes = []) {
    for (let i = 0, l = menu.length; i < l; i ++) {
        let item = menu[i]
        if (item.path) {
            routes.push(item)
        }
        if (!item.component) {
            generateRoutesFromMenu(item.children, routes)
        }
    }
    return routes;
}
