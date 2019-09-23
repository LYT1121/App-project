// 封装ajax请求
export const request=(params)=>{
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
            }
        });
          
    })
}