<template>
  <div>
    <!-- 三级联动组件：三级联动已经注册为全局组件，因此不需要在引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Link/>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
    
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Link from '@/pages/Home/Link'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'

export default {
name:'',
components:{ListContainer,Recommend,Rank,Link,Floor,Brand},
mounted() {
  //派发action，获取floor组件的数据
  this.$store.dispatch("getFloorList")
},
computed:{
  ...mapState({
    floorList:(state) => state.home.floorList
  })
}
}

</script>
