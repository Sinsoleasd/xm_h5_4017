<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :show="!show"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene==0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            prop="prop"
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="spu名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="spu描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
              ></hint-button>
              <hint-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title="删除spu"
              ></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,-> ,sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene==2"></SkuForm>
    </el-card>
  </div>
</template>
  
  <script>
  // 引入子组件
  import SpuForm from './SpuForm'
  import SkuForm from './SkuForm'
export default {
  name: "Spu",
  components:{SpuForm,SkuForm},
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      //控制三级联动的可操作性
      show: true,
      page:1,//分页器当前第几页
      limit: 3, //每一页需要展示多少条数据
      records:[],//spu列表的数据
      total:0,//分页器展示数据的条数
      scene:0,//0代表展示SPU列表数据 1添加SPU|修改SPU 2添加SKU
    };
  },
  methods: {
    //点击分页器的第几页按钮的回调
    // handleCurrentChange(page){
    //   this.page=page
    //   this.getSpuList()
    // },
    //三级联动的自定义事件，可以把子组件的相应的id传递给父组件
    getCategoryId({ categoryId, level }) {
      //区分三级分类相应的id，以及父组件进行存储
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        //代表三级分类的id有了
        this.category3Id = categoryId;
        //发请求获取平台的属性数据
        this.getSpuList();
      }
    },
    //获取SPU列表数据的方法
    async getSpuList(pages=1) {
      this.page=pages
      const {page,limit,category3Id}=this;
      let result = await this.$API.spu.reqSpuList(page,limit,category3Id)
      if (result.code==200) {
        this.records=result.data.records
        this.total=result.data.total
      }
    },
    //当分页器的某一个展示数据条数发生变化的回调
    handleSizeChange(limit){
      this.limit=limit
      this.getSpuList()
    },
    //添加SPU按钮的回调
    addSpu(){
      this.scene=1
    },
    //修改某一个SPU
    updateSpu(row){
      this.scene=1
      //获取子组件SpuForm子组件
      //在父组件当中可以通过$ref获取子组件等等  
      this.$refs.spu.initSpuData(row);
    },
    //自定义事件回调（SpuForm）
    changeScene(scene){
      //切换结构（场景）
      this.scene = scene
    }
    },
};
</script>
  
  <style>
</style>