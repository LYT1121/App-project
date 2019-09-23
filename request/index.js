// 设置一个检测请求次数
let requestTimes = 0
// 封装ajax请求
export const request=(params)=>{
    requestTimes++
    // 全局的loading效果
    wx.wx.showLoading({
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
            success: (result) => {
                // 成功之后的回调
                resolve(result)
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