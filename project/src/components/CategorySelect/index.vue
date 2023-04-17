<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in category1List"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in category2List"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in category3List"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      //一级分类的数据
      category1List: [],
      //二级分类的数据
      category2List: [],
      //三级分类的数据
      category3List: [],
      //收集相应的一级二级三级分类的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  //组件挂载完毕：向服务器发请求，获取相应的一级分类的数据
  created() {
    //获取一级分类的数据的方法
    this.getCategory1List();
  },
  methods: {
    //获取一级分类数据的方法
    async getCategory1List() {
      //获取一级分类的请求：不需要携带参数
      let result = await this.$API.attr.reqCategory1List();
      if (result.code == 200) {
        this.category1List = result.data;
      }
    },
    //一级分类的select事件回调（当一级分类的option发生变化的时候获取相应二级分类的数据）
    async handler1() {
      //清除数据
      this.category2List = [];
      this.category3List = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.$emit('getCategoryId',{categoryId:category1Id,level:1})
      //解构出一级分类的id
      const { category1Id } = this.cForm;

      //通过一级分类的id，获取二级分类的数据
      let result = await this.$API.attr.reqCategory2List(category1Id);
      if (result.code == 200) {
        this.category2List = result.data;
      }
    },
    //二级分类的select事件回调（当二级分类的option发生变化的时候获取相应三级分类的数据）
    async handler2() {
      //清除数据
      this.category3List=[]
      this.cForm.category3Id=''
      //解构出二级分类的id
      const { category2Id } = this.cForm;
      this.$emit('getCategoryId',{categoryId:category2Id,level:2})
      let result = await this.$API.attr.reqCategory3List(category2Id);
      if (result.code == 200) {
        this.category3List = result.data;
      }
    },
    handler3() {
      const { category3Id } = this.cForm;
      this.$emit('getCategoryId',{categoryId:category3Id,level:3})
    },
  },
};
</script>

<style>
</style>