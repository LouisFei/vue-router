import Vue from 'vue'
import VueRouter from 'vue-router'

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(vueRouter)

Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Home = { template: '<div><h2>Home</h2></div>' }
const About = { template: '<div><h2>About</h2></div>' }

const Users = {
  template: `
    <div>
      <h2>Users</h2>
      <router-view></router-view>
    </div>
  `
}

const User = { template: '<div>{{ $route.params.username }}</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。其中"component"可以是通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。路由还可以嵌套子路由。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users', component: Users,
    children: [
      { path: ':username', name: 'user', component: User }
    ]
  }
]

// 3. 创建 router 实例，然后传 routes 配置，
// 你还可以传别的配置参数。
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能。

// 使用 router-link 组件来导航。
// 通过传 to 属性指定链接。
// router-link 默认会被渲染成一个 <a> 标签。
// router-view 是路由出口，路由匹配到的组件将渲染到这里。

// 通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，
// 也可以通过 this.$route访问当前路由。

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Active Links 动态链接</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/" exact>/ (exact match)</router-link></li>

        <li><router-link to="/users">/users</router-link></li>
        <li><router-link to="/users" exact>/users (exact match)</router-link></li>

        <li><router-link to="/users/evan">/users/evan</router-link></li>
        <li><router-link to="/users/evan#foo">/users/evan#foo</router-link></li>
        <li>
          <router-link :to="{ path: '/users/evan', query: { foo: 'bar' }}">
            /users/evan?foo=bar
          </router-link>
        </li>
        <li><!-- #635 -->
          <router-link :to="{ name: 'user', params: { username: 'evan' }, query: { foo: 'bar' }}" exact>
            /users/evan?foo=bar (named view + exact match)
          </router-link>
        </li>
        <li>
          <router-link :to="{ path: '/users/evan', query: { foo: 'bar', baz: 'qux' }}">
            /users/evan?foo=bar&baz=qux
          </router-link>
        </li>

        <li><router-link to="/about">/about</router-link></li>

        <router-link tag="li" to="/about">
          <a>/about (active class on outer element)</a>
        </router-link>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
