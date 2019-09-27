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
    currentIndex:0,
    // 右边商品列表滚动条位置
    scrollTop:0
  },
  // 定义一个全局数据变量(页面中用不到的在data外设置)=>接口的返回值
  Datas:[],
  onLoad(){
    this.getDatas()
    // 调用获取分类数据
    // this.getCategoriesData()
  },
  // 从缓存中的数据中获取接口的数据 
  getDatas(){
    // 获取本地存储中的数据=>如果没有就是空值
    const getDatas = wx.getStorageSync('getlist');
    // 判断有没有旧的数据
    if(getDatas){
      // 表示本地存储有缓存的数据
      // 判断数据是否已经过期 => 定1分钟时间过期
      if(Date.now()-getDatas.time>1000*60){
        // 表示过期=>重新发起请求获取数据
        this.getCategoriesData()
      }else{
        // 把本地存储的数据展示
        this.Datas = getDatas.data;
        // 把左右侧的数据展示
        this.setData({
          menuList : this.Datas.map(v=>v.cat_name),
          goodsList : this.Datas[0].children
        })
      }
    }else{
      // 表示没有数据=>重新发起请求获取数据
      this.getCategoriesData()
    }
  },
  // 获取分类数据
  getCategoriesData(){
    // 使用封装好的异步请求
    request({
      url:"/categories"
    }).then(result=>{
      // console.log(result);
      this.Datas = result,
      // 把获取成功后的数据存入本地存储=>同步存储
      wx.setStorageSync('getlist', {
        data:this.Datas,
        // 时间蹉=>单位毫秒
        time:Date.now()
      });
        

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
      goodsList:this.Datas[index].children,
      // 切换时滚动条位置回顶部
      scrollTop:0
    })
  }
})