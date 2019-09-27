// 首页
/* 
使用封装好的异步代码来发送请求
=>小程序中引入js文件，路径要补全=>解构的方式导入
import {变量名} from "路径"
在被导出的js中使用
export const 变量名
*/
import {request} from "../../request/index.js"
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
        /* wx.request({
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
        }); */
        // 使用封装好的异步请求
        request({
            url:"/home/swiperdata"
          }).then(result=>{
            // console.log(result);
            this.setData({
              swiperList: result
            })
          })
    },
    // 获取分类菜单数据
    getNavData(){
        // 获取接口数据=>分类菜单
        // 使用封装好的异步请求
        request({
            url:"/home/catitems"
          }).then(result=>{
            // console.log(result);
            this.setData({
                navigationList : result
            })
          })
    },
    // 楼层数据获取
    getFloorData(){
        // 获取接口数据=>楼层
        request({
            url:"/home/floordata"
          }).then(result=>{
            // console.log(result);
            this.setData({
                floorList : result
            })
        })
    }
})
