// pages/cart/index.js
// 引入需要使用async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
// 引入封装好的异步代码
import {getSetting,openSetting,chooseAddress} from "../../request/index.js"
Page({
  data:{
    // 收货地址
    addressObj:{},
    // 购物车信息
    carts:[]
  },
  onLoad(){
    this.getGoodeCart()
  },
  getGoodeCart(){
    // 获取本地存储的数据
    let carts = wx.getStorageSync('goodeCart')
    this.setData({
      carts
    })
    console.log(carts);
  },
  // 合理获取收货地址=>获取用户信息=>获取用户授权状态=>打开授权页面
  handleAddress(){
      this.getUserInfo()
  },
  onShow(){
    // 获取缓存中的收货地址 默认值 空字符串=>默认false
    const addressObj = wx.getStorageSync('addressObj');
    // 赋值
    this.setData({
      addressObj
    }) 
  },
  async getUserInfo(){
    try{
      // 1.获取用户对收货地址的授权状态
    const result1 = await getSetting();
    const auth = result1.authSetting["scope.address"];
    // console.log(result1);
    // 2.获取用户对收货地址的授权状态
    if(auth === false){
      // 3.诱导用户自己打开授权页面给权限
      await openSetting();
    }
    // 4.直接获取用户的收货地址
    const result2 = await chooseAddress();
    // 新增一个属性=>地址拼接
    result2.site=result2.provinceName+result2.cityName+result2.countyName+result2.detailInfo;
    // console.log(result2);
    // 把地址信息存入缓存中=>下次打开使用
    wx.setStorageSync('addressObj',result2);
    // 存入data中=>渲染页面
    this.setData({
      addressObj:result2
    })
    }catch(error){
      console.log(error);
    }
  }
})