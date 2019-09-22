// 首页
Page({
    data:{
        // 轮播图数组
        swiperList:[],
        // 导航菜单数组
        navigationList:[],
        // 楼层数组
        floorList:[]
    },
    onLoad(){
        // 钩子函数=>一开始就获取
        // 调用获取轮播图数组
        this.getSwiperData(),
        // 调用获取导航菜单数组
        this.getNavData(),
        // 调用获取楼层数据
        this.getFloorData()
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
    },
    // 获取分类菜单数据
    getNavData(){
        // 获取接口数据=>分类菜单
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
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
                    navigationList : result.data.message
                })
            }
        });
    },
    // 楼层数据获取
    getFloorData(){
        // 获取接口数据=>楼层
        wx.request({
            url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
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
                    floorList : result.data.message
                })
            }
        });
    }
})
