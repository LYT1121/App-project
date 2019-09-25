// pages/goods_detail/index.js
// 引入封装好的异步代码来发送请求
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情数据
    detailObj:{},
    // 图片详情标题
    detailTitleList:[
      {id:0,title:'商品详情'},
      {id:1,title:'评价'}
    ],
    curronIndex:0,
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
  },
  // 点击轮播图事件
  handlePreviewImage(e){
    // console.log(e);
    // 获取轮播图数组
    const {detailObj} = this.data;
    // console.log(detailObj.pics);
    // 因为要的图片数组的格式是['1.jpg','2.jpg',...]
    const imgArray = detailObj.pics.map(v=>v.pics_mid_url);
    // 点击的当前图片=>页面已给了一个自定义属性data-current,只需要把值获取
    const {current} = e.currentTarget.dataset;
    // 小程序内置的方法=>新页面中全屏预览图片
    wx:wx.previewImage({
      // 当前显示图片的http链接
      current: current,
      // 需要预览的图片http链接列表
      urls: imgArray
    });
      
  },
  // 切换商品详情标题传值
  itemChange(e){
    // console.log(e);
    this.setData({
      curronIndex:e.detail.index
    })
  }
})