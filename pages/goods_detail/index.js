// pages/goods_detail/index.js
// 引入需要使用async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
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
  async getGoodsDetail(goods_id){
    const result = await request({
      url:'/goods/detail',
      data:{
        goods_id
      }
    })
    this.setData({
      detailObj:result
    })
    // 发请求获取数据
    /* request({
      url:'/goods/detail',
      data:{
        goods_id
      }
    }).then(result=>{
      // console.log(result);
      this.setData({
        detailObj:result.data.message
      })
    }) */
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
    wx.previewImage({
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
  },
  // 点击加入购物车事件
  handleaCartAdd(){
    // 获取商品对象
    const {detailObj} = this.data;
    // 获取本地存储的数据
    let cartList = wx.getStorageSync('goodeCart') || [];
    // 判断该商品是否存在于数组中
    const index = cartList.findIndex((item)=>{
      return item.goods_id === detailObj.goods_id
    })
    if(index === -1){
      // 没有=>第一次添加
      // 新增一个商品对象
      cartList.push({
        goods_id:detailObj.goods_id,
        goods_name:detailObj.goods_name,
        goods_price:detailObj.goods_price,
        goods_small_logo:detailObj.goods_small_logo,
        number:1,
        // 加多一个选中的状态
        checked:true
      })
    }else{
      // 购物车里面已存在此商品
      // 相同的商品数量++
      cartList[index].number++
    }
    // 把数组添加到本地存储里面
    wx.setStorageSync('goodeCart',cartList)
    // 弹出窗口提示用户
    wx.showToast({
      title: '加入购物车成功',
      mask: true
      // icon: 'success',
    });
  }
})