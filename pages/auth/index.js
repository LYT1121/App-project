// 引入需要使用async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
// 引入封装好的异步代码
import { login,request} from "../../request/index.js"
Page({
  // 通过按钮获取用户信息
  hangleUserinfo(e) {
    // console.log(e);
    /* const {encryptedData,rawData,iv,signature} = e.detail; */
    // 为了让5个值关联起来=>把e传过去
    this.wxLogin(e);
  },
  // 执行微信登录
  async wxLogin(e){
    // 把授权需要的code值解构出来
    const {code} = await login();
    const {encryptedData,rawData,iv,signature} = e.detail;
    // 拼接
    const tokenParam = {
      encryptedData,rawData,iv,signature,code
    }
    // console.log(tokenParam);
    // 发起请求 => 获取token值
    const {token} = await request({url:'/users/wxlogin',method:'post',data:tokenParam});
    // console.log(res);
    // 把获取到的token值存到缓存中
    wx.setStorageSync("token", token);
    wx.navigateBack({
      // 返回上一页
      delta: 1
    }); 
  }
})