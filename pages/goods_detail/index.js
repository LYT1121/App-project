// pages/goods_detail/index.js
// 引入封装好的异步代码来发送请求
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据
    detailObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    // console.log(options);
    this.getGoodsDetail(options.goods_id)
  },
  getGoodsDetail(goods_id){
    // 发请求获取数据
    request({
      url:'/goods/detail',
      data:{
        goods_id
      }
    }).then(result=>{
      // console.log(result);
      this.setData({
        detailObj:result.data.message
      })
    })
  }
})