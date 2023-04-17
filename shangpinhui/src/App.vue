<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home,Search显示的，在登录，注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入Header
import Header from './components/Header'
import Footer from './components/Footer'
export default {
name:'',
//注册组件
components:{Header,Footer},
mounted(){
  //派发一个action||获取商品分类的三级列表数据
  this.$store.dispatch("getCategory");
  
}
}
</script>

<style>

</style>
