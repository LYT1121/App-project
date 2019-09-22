// 首页
Page({
    data:{
        // 轮播图数组
        swiperList:[],
    },
    onLoad(){
        // 钩子函数=>一开始就获取
        // 调用获取轮播图数组
        this.getSwiperData()
    },
    // 获取轮播图数据
    getSwiperData(){
        // 获取接口数据=>轮播图
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
            // 无数据
            // data: {},
            // 不需要请求头
            // header: {'content-type':'application/json'},
            method: 'GET',
            // 类型默认值
            // dataType: 'json',
            // 文本默认值
            // responseType: 'text',
            success: (result) => {
                // console.log(result);
                this.setData({
                    swiperList : result.data.message
                })
            }
        });
    }
})
