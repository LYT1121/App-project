// pages/goods_list/index.js
// 引入封装好的异步代码来发送请求
import {request} from "../../request/index.js"
Page({
  data: {
    // 商品列表标题数据
    titleList:[
      {serial:0,title:'综合'},
      {serial:1,title:'销量'},
      {serial:2,title:'价格'}
    ],
    curronIndex:0,
    // 商品列表数据
    goodsList:[]
  },
  // 定义一个点击商品传递过来的全局的请求参数对象
  goodsData:{
    // 查询的关键字
    query:'',
    // 从分类页面 传递过来的分类ID
    cid:'',
    // 页码
    pagenum:1,
    // 页容量
    pagesize:10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    // console.log(options);
    const {cid} = options;
    this.goodsData.cid = cid;
    this.getGoods()
  },
  getGoods(){
    // 使用封装好的异步请求
    request({
      url:'/goods/search',
      // 把数据传递
      data:this.goodsData
    }).then(result=>{
      // console.log(result.data.message.goods);
      this.setData({
        goodsList:result.data.message.goods
      })
    })
  },
  itemChange(e){
    // console.log(e);
    this.setData({
      curronIndex:e.detail.index
    })
  }
})