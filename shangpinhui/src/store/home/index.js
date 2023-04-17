import {reqCategoryList, reqGetBannerList,reqFloorList} from '@/api'
//home模块的小仓库
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数据【根据接口返回初始化的】
    category:[],
    //轮播图的数据
    bannerList:[],
    floorList:[]
};
//mutions是唯一修改state的地方
const mutations = {
    GETCATEGORY(state,category){
        state.category=category.slice(0,16)
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getCategory({commit}){
        let result = await reqCategoryList()
        if(result.code==200){
            commit('GETCATEGORY',result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code==200){
            commit('GETFLOORLIST',result.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}