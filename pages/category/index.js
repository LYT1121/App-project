// 引入封装好的异步代码来发送请求
import {request} from "../../request/index.js"
Page({
  data:{
    // 分类数据=》拆分数据
    // categoriesList:[],
    // 左侧的标题数据
    menuList:[],
    // 右侧要显示的内容
    goodsList:[],
    // 左侧菜单被选中的索引
    currentIndex:0
  },
  // 定义一个全局数据变量(页面中用不到的在data外设置)=>接口的返回值
  Datas:[],
  onLoad(){
    // 调用获取分类数据
    this.getCategoriesData()
  },
  // 获取分类数据
  getCategoriesData(){
    // 使用封装好的异步请求
    request({
      url:"/categories"
    }).then(result=>{
      // console.log(result);
      this.Datas = result.data.message,
      this.setData({
        // categoriesList: result.data.message=>总的数据
        // map遍历数组的方法
        menuList:this.Datas.map(v=>v.cat_name),
        goodsList:this.Datas[0].children
      })
    })
  },
  // 左边菜单点击切换
  handleChange(e){
    // console.log(e)
    const {index} = e.target.dataset
    this.setData({
      // 索引切换
      currentIndex:index,
      // 切换右边商品
      goodsList:this.Datas[index].children
    })
  }
})