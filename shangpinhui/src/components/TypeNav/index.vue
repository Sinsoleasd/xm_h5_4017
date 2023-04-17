<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件代理 -->
      <div @mouseleave="leaveHandler" @click="goSearch">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
          <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
          <div class="all-sort-list2">
            <div class="item" v-for="(c1, index) in  category" :key="c1.categoryId">
              <h3 @mouseenter="enterHandler(index)" :class="{ cur: currentIndex == index }">
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <!-- 二级，三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
        <!-- 三级联动 -->
       
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入方式：是把lodash全部功能函数引入
//最好的引入方式：按需加载
import throttle from 'lodash/throttle';
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show:true
    };
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性
    //throttle回调函数别用箭头函数，可能出现上下文this
    enterHandler:throttle(function(index){
      //index：鼠标移上某一个一级分类的索引值
      //正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      //非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
      //就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
      this.currentIndex = index;
    },50),
    //一级分类鼠标移出的事件回调
    leaveHandler(){
      //鼠标移出高亮的效果消失
      this.currentIndex = -1;
      //隐藏商品分类
      //鼠标离开:在search路由下,在修改数据
    if(this.$route.path != '/home'){
      this.show = false
    }
    },
    //全部商品分类鼠标进入
    changeShow() {
      //鼠标进入:在search路由下,在修改数据
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    //进行路由跳转的回调函数
    goSearch(event){
      //最好的解决方案：编程式导航+事件委派
      //存在一些问题：事件委派，是把全部的子节点【h3，dt，dl，em】的事件委派给父亲节点
      //点击a标签的时候，才会进行路由跳转【怎么能确定点击的一定是a标签】
      //存在另外一个问题：即使你能确定点击的是a标签，如何区分一级，二级，三级分类的标签
      let targetNode = event.target
      let {categoryname,category1id,category2id,category3id} = targetNode.dataset
      //判断点击的是a【不管是1|2|3】
      if(categoryname){
        //点击只要是a,就是往search模块跳转
        let location = {
          name:'search',
          query:{categoryName:categoryname}
        };
        //一级分类的a
        if(category1id){
          location.query.category1Id = category1id
      }else if(category2id){
        location.query.category2Id = category2id
      }else{
        location.query.category3Id = category3id
      }
       //点击商品分类按钮的时候,如果路径当中携带params参数,需要合并携带给search模块
      if(this.$route.params.keyword){
        location.params = this.$route.params;
      }
        //整理完参数
      // location.query = query
      // 路由跳转
      this.$router.push(location)  
      }
    },
  },
  mounted() {
    //派发action
    //路由切换的时候,路由组件会被销毁重建【子组件不也是】
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个测试state，其实即为大仓库中的数据
      category: (state) => state.home.category,
    }),
  },
  
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 29px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur{
          background: skyblue;
        }
      }
    }
    // 过度动画的样式
    //过度动画开始状态（进入）
    .sort-enter{
      height: 0;

    }
    //过度动画结束状态（进入）
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间，速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>