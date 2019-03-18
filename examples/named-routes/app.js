import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<div>This is Home</div>' }
const Foo = { template: '<div>This is Foo</div>' }
const Bar = { template: '<div>This is Bar {{ $route.params.id }}</div>' }
const Monday = { template: '<div>What day is it today? It\'s Monday.</div>' }

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar },
    { path: '/monday', name: 'monday', component: Monday }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Named Routes 命名路由</h1>
      <p>Current route name 当前路由名称: {{ $route.name }}</p>
      <ul>
        <li><router-link :to="{ name: 'home' }">home</router-link></li>
        <li><router-link :to="{ name: 'foo' }">foo</router-link></li>
        <li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar (id=123)</router-link></li>
        <li><router-link :to="{ name: 'monday' }">Monday</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount('#app')
