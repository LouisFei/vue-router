import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar（侧导航）和 main（主内容）两个视图。
// 这个时候命名视图就派上用场了。
// 你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。
// 如果 router-view 没有设置名字，那么默认为 default 。

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
const Baz = { template: '<div>baz</div>' }
const Fei = { template: '<div>I believe I can fly.</div>' }

// 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。
// 确保正确使用 components 配置。
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo
      }
    },
    {
      path: '/fei',
      components: {
        default: Fei,
        a: Fei,
        b: Fei
      }
    }
  ]
})

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Named Views 命名视图</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/other">/other</router-link></li>
        <li><router-link to="/fei">/fei</router-link></li>
      </ul>
      <router-view class="view one"></router-view>
      <router-view class="view two" name="a"></router-view>
      <router-view class="view three" name="b"></router-view>
    </div>
  `
}).$mount('#app')
