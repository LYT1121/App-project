// 设置一个检测请求次数
let requestTimes = 0
// 封装ajax请求
export const request=(params)=>{
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header = {...params.header};
    // includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则fals
    if(params.url.includes('/my/')){
        // 如果有，就拼接header 带上token
        header["Authorization"]=wx.getStorageSync("token");
    }
    requestTimes++
    // 全局的loading效果
    wx.showLoading({
        title: "加载中",
        mask: true,// 遮罩层，在加载完成之前用户无法点击里面的内容
    });
    //公共的url
    const baseUrl = "https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            // 把参数展开进来
            ...params,
            url: baseUrl+params.url,
            header,
            // 以后可能会在请求头多其他的参数
            // header:{...header,...params.header},
            success: (result) => {
                if(result.data.meta&&result.data.meta.status === 200){
                    // 成功之后的回调 => 把返回值写完整一点 => 方便后续不用写太繁琐
                    resolve(result.data.message)
                }else{
                    reject(result)
                }
            },
            fail: (err) => {
                // 失败之后的回调
                reject(err)
            },
            // 请求回来之后触发
            complete:()=>{
                requestTimes--;
                // 判断请求全部回来之后，让loading消失
                requestTimes === 0 && wx.hideLoading();
            }
        });
          
    })
}
// 封装一些按钮的相关事件 promise 形式的 getSetting
export const getSetting =()=>{
    return new Promise((resolve,reject)=>{
    wx.getSetting({
        success: (result) => {
            resolve(result)
        },
        fail: (err) => {
            reject(err)
        }
      });
    })
}
// 封装一些按钮的相关事件 promise 形式的 openSetting => 打开授权页面
export const openSetting =()=>{
    return new Promise((resolve,reject)=>{
    wx.openSetting({
        success: (result) => {
            resolve(result)
        },
        fail: (err) => {
            reject(err)
        }
      }); 
    })
}
// 封装一些按钮的相关事件 promise 形式的 chooseAddress
export const chooseAddress =()=>{
    return new Promise((resolve,reject)=>{
    wx.chooseAddress({
        success: (result) => {
            resolve(result)
        },
        fail: (err) => {
            reject(err)
        }
      }); 
    })
}
// 封装显示模态对话框
export const showModal =(params)=>{
    return new Promise((resolve,reject)=>{
    wx.showModal({
        ...params,
        success: (result) => {
            resolve(result.confirm)
        },
        fail: (err) => {
            reject(err)
        }
    });
})  
}
// 封装提示框
export const showToast =(params)=>{
    return new Promise((resolve,reject)=>{
    wx.showToast({
        ...params,
        success: (result) => {
            resolve(result)
        },
        fail: (err) => {
            reject(err)
        }
    });
})  
}
// 封装微信登录
export const login =(params)=>{
    return new Promise((resolve,reject)=>{
    wx.login({
        timeout:10000,
        success: (result) => {
            resolve(result)
        },
        fail: (err) => {
            reject(err)
        }
    });  
})  
}
// 封装微信支付的API        pay 支付参数
export const requestPayment =(pay)=>{
    return new Promise((resolve,reject)=>{
   wx.requestPayment({
       ...pay,
       success: (result) => {
        resolve(result)
       },
       fail: (err) => {
           reject(err)
       }
   });
     
})  
}