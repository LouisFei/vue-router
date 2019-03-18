import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
// 使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter)

// 2. Define route components
// 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Unicode = { template: '<div>unicode</div>' }

// 3. Create the router
// 定义路由规则，并创建路由实例。你还可以传别的配置参数, 不过先这么简单着吧。
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar },
    { path: '/é', component: Unicode }
  ]
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
// 创建和挂载根实例。
new Vue({
  router, // 记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
  template: `
    <div id="app">
      <h1>Basic基础</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
          <a>/bar</a>
        </router-link>
        <li><router-link to="/é">/é</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')

// 现在，应用已经启动了！
