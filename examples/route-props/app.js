import Vue from 'vue'
import VueRouter from 'vue-router'

import Hello from './Hello.vue'

Vue.use(VueRouter)

// 0. 如果使用模块化机制编程，导入 Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来。

function dynamicPropsFn (route) {
  const now = new Date()
  return {
    name: (now.getFullYear() + parseInt(route.params.years)) + '!'
  }
}

// 2. 定义路由
// 每个路由应该映射一个组件。其中 component可以是 通过Vue.extend() 创建的组件构造器。
// 或者，只是一个组件配置对象。

// 3. 创建router实例，然后传 routes配置。

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Hello }, // No props, no nothing
    { path: '/hello/:name', component: Hello, props: true }, // Pass route.params to props
    { path: '/static', component: Hello, props: { name: 'world' }}, // static values
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn }, // custom logic for mapping between route and props
    { path: '/attrs', component: Hello, props: { name: 'attrs' }} // static values
  ]
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能。

// 使用 router-link 组件来导航。
// 通过传入 to 属性指定链接。
// <router-link> 默认会被渲染成一个 <a> 标签。
// <router-view> 路由出口。
// 路由匹配到的组件将渲染在这里。
new Vue({
  router,
  template: `
    <div id="app">
      <h1>Route props 通过prop传递数据</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/you">/hello/you</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/0">/dynamic/0 今年</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1 明年</router-link></li>
        <li><router-link to="/dynamic/2">/dynamic/2 后年</router-link></li>
        <li><router-link to="/attrs">/attrs</router-link></li>
      </ul>
      <router-view class="view" foo="123"></router-view>
    </div>
  `
}).$mount('#app')
