// pages/cart/index.js
// 引入需要使用async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
// 引入封装好的异步代码
import {getSetting,openSetting,chooseAddress,showModal,showToast} from "../../request/index.js"
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
    let carts = wx.getStorageSync('goodeCart')
    this.setData({
      carts
    })
    // console.log(carts);
    // 页面一加载就调用计算数据
    this.countPrice(carts)
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
    this.getGoodeCart()
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
  // 商品的全选按钮事件
  /* handleAllChange(e){
    let {allChecked} = this.data;
    let carts = wx.getStorageSync('goodeCart');
    // 单选按钮的值
    let checked = carts.map(v=>v.checked);
    // console.log(checked);
    // console.log(e.detail.value);
    if(e.detail.value.length === 0){
      allChecked=false;
      checked.forEach(e=>{
        e=allChecked
      })
    }else{
      
    }
    // 把数据覆盖回data
    this.setData({
      allChecked,
      carts
    })
    wx.setStorageSync('goodeCart',carts);
    // 重新计算数据(价格和数量)
    this.countPrice(carts)
  }, */
  // 商品的单选功能
  handleItemChange(e){
    // console.log(e);
    // 获取要修改元素的索引
    const {index} = e.target.dataset;
    // 获取购物车数组
    let {carts} = this.data;
    // 选中的属性取反
    carts[index].checked = !carts[index].checked
    // 修改data中的carts和缓存中的carts
    this.setData({
      carts
    })
    wx.setStorageSync('goodeCart',carts);
    // 重新计算数据(价格和数量)
    this.countPrice(carts)
  },
  // 数量按钮绑定事件
  async handleTap(e){
    // console.log(e);
    // 获取用户点击的按钮/被点击数字的索引
    const {operation,index} = e.target.dataset;
    // console.log(operation);
    let {carts} = this.data;
    // 判断数量是否小于1=>执行删除操作
    if(operation===-1&&carts[index].number===1){
      // 弹框提醒用户是否进行删除操作
      let res = await showModal({title: '温馨提示',
      content: '您是否要删除该商品呢',})
      if(res){
        // 根据索引删掉购物车商品
        carts.splice(index,1);
      }else{
        // 点了取消
        return;
      }
    }else{
      // 点击＋/－按钮=>数字的变化
      carts[index].number+=operation;
    }
    // 修改data中的carts和缓存中的carts
    this.setData({
      carts
    })
    wx.setStorageSync('goodeCart',carts);
    // 重新计算数据(价格和数量)
    this.countPrice(carts)
  },
  // 点击结算按钮
  async handlePay(){
    // 拿商品数量判断
    const {addressObj,totalNum} = this.data;
    if(totalNum === 0){
      await showToast({title:"您还没有选购商品哦！",icon:"none",mask:true})
      return;
    }
    if(addressObj === ""){
      await showToast({title:"您还没有选择收货地址哦！",icon:"none",mask:true})
      return;
    }
    // 跳转到支付页面
    wx.navigateTo({
      url: '../pay/index'
    });
      
  }
})