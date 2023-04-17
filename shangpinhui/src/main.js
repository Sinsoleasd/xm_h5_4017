import Vue from 'vue'
import App from './App.vue'
//三级联动组件----全局组件:在入口文件注册一次之后，在任何组件当中都可以使用
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {MessageBox} from 'element-ui'
//第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//注册全局组件
//elementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入MockServer.js-----mock数据
import '@/mock/mockServe'
//统一接口api文件夹里面全部请求函数
import * as API from '@/api'
//引入表单验证
import "@/validate/validate"
//引入插件
import VueLazyload from 'vue-lazyload'
import tup from '@/assets/1.gif'
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:tup
})
//引入swiperys
import "swiper/css/swiper.css"
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由：底下的写法KV一致省略V【router的r是小写的】
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库:组件实例的身上会多个一个属性$Store属性
  store
}).$mount('#app')
