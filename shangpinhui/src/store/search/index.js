import {reqGetSearchInfo} from '@/api'
//search模块的小仓库
//state:仓库储存数据的地方
const state = {
    //仓库初始状态
    searchList:{}
}
//mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
//actions:处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({commit},params={}){
        //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code==200) {
            commit("GETSEARCHLIST",result.data)
        }
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
//项目当中getters主要的作用是：简化仓库中的数据（简化数据而生）
const getters = {
    goodsList(state){
        //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefind
        //计算新的属性的属性值至少给来一个数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}