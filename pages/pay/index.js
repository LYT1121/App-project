// pages/cart/index.js
// 引入需要使用async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
// 引入封装好的异步代码
import {request,requestPayment,showToast} from "../../request/index.js"
Page({
  data:{
    // 收货地址
    addressObj:{},
    // 购物车信息
    carts:[],
    // 全选状态
    allChecked:false,
    // 总价格
    totalPrice:0,
    // 总数量
    totalNum:0
  },
  getGoodeCart(){
    // 获取本地存储的数据
    let carts = wx.getStorageSync('goodeCart') || [];
    // 筛选出选中的=>filter 数组过滤
    carts = carts.filter(v=>v.checked);
    this.setData({
      carts
    })
    // console.log(carts);
    // 页面一加载就调用计算数据
    this.countPrice(carts)
  },
  onShow(){
    // 获取缓存中的收货地址 默认值 空字符串=>默认false
    const addressObj = wx.getStorageSync('addressObj');
    // 赋值
    this.setData({
      addressObj
    })
    this.getGoodeCart()
  },
  // 计算数据=>可能被调用多次=>封装起来
  countPrice(carts){
    // 全选状态
    let allChecked=true;
    // 总价格
    let totalPrice=0;
    // 总数量
    let totalNum=0;
    // 循环购物车里的数组
    if(carts.length != 0){
      carts.forEach((element,index) => {
        // 判断allChecked
        if(element.checked){
          // 计算总价格
          totalPrice += element.goods_price * element.number;
          // 总数据
          totalNum += element.number;
        }else{
          allChecked=false;
        }
      });
    }else{
      console.log('购物车里没有任何商品哦！');
    }
    // 判断如果购物车里没有任何商品了，全选按钮为false
    allChecked=carts.length===0?false:allChecked;
    // 把数据覆盖回data
    this.setData({
      allChecked,
      totalPrice,
      totalNum
    })
  },
  // 点击支付按钮
  handlePay(){
    this.orderPay()
  },
  // 执行支付的逻辑
  async orderPay(){
    try{
      
    // 判断缓存中有没有token值
    const token = wx.getStorageSync('token');
    if(!token){
      // 跳转到授权页面
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    //#region 根据接口要求构造订单参数
    const {totalPrice,addressObj,carts} = this.data;
    const order_price = totalPrice;
    const consignee_addr = addressObj.site;
    const goods = carts.map(v=>{
      return {
        goods_id:v.goods_id,
        goods_number:v.number,
        goods_price:v.goods_price
      }
    });
    //#endregion
    const orderParams = {
      order_price,consignee_addr,goods
    }
    // console.log(orderParams); 
    // 创建订单=>获取订单编号
    const {order_number} = await request({url:'/my/orders/create',method:'post',data:orderParams});
    // console.log(order_number);
    //  获取支付参数
    // const {pay} = await request({url:'/my/orders/req_unifiedorder',method:'post',data:{order_number},header:{Authorization:token}});
    const {pay} = await request({url:'/my/orders/req_unifiedorder',method:'post',data:{order_number}});
    // 调用内置的微信支付
    await requestPayment(pay);
    // 查看订单支付状态
    const res = await request({url:'/my/orders/chkOrder',method:'post',data:{order_number}});
    // console.log(res);
    // 弹窗提示用户=>支付成功=>跳转到订单页面
    await showToast({ title: res, mask: true });
    // 删除购物车数据=>修改数据
    /* this.setData({
      // 保留购物车中未选中的商品 === 删除了选中的商品[].splice(index,1)
      carts:carts.filter(v=>!v.checked)
    }); */
    // 获取缓存中完整的数据
    let newCart=wx.getStorageSync("goodeCart");
    newCart=newCart.filter(v=>!v.checked);
    wx.setStorageSync("goodeCart", newCart);

    wx.navigateTo({
      url: '/pages/order/index',
    });
    }catch(err){
      await showToast({ title:'支付失败'})
      console.log(err);
    }
  }
  
})