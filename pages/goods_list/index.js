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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    // console.log(options);
    // 使用封装好的异步请求
    request({
      url:`/goods/search?cid=${options.cid}`
    }).then(result=>{
      // console.log(result.data.message.goods);
      this.setData({
        goodsList:result.data.message.goods
      })
    })
  },
  handleChange(e){
    // console.log(e);
    this.setData({
      curronIndex:e.target.dataset.index
    })
  }
})