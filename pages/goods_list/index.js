// pages/goods_list/index.js
// 引入封装好的异步代码来发送请求
import {request} from "../../request/index.js"
Page({
  data: {
    // 商品列表标题数据
    titleList:[
      {serial:0,title:'综合'},
      {serial:1,title:'销量'},
      {serial:2,title:'价格'}
    ],
    curronIndex:0,
    // 商品列表数据
    goodsList:[]
  },
  // 定义一个点击商品传递过来的全局的请求参数对象
  goodsData:{
    // 查询的关键字
    query:'',
    // 从分类页面 传递过来的分类ID
    cid:'',
    // 页码
    pagenum:1,
    // 页容量
    pagesize:10,
  },
  // 总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    // console.log(options);
    const {cid} = options;
    this.goodsData.cid = cid;
    this.getGoods()
  },
  getGoods(){
    // 使用封装好的异步请求
    request({
      url:'/goods/search',
      // 把数据传递
      data:this.goodsData
    }).then(result=>{
      // console.log(result);
      // 新数组
      const newGoodsList = result.data.message.goods;
      // 旧数组
      const oldGoodsList = this.data.goodsList;
      // 总条数
      const total = result.data.message.total;
      // 计算总页数
      this.totalPages = Math.ceil(total/this.goodsData.pagesize);
      this.setData({
        // 实现加载下一页数据=>重新给数组赋值=>新旧数据合并
        // goodsList:[...oldGoodsList,...newGoodsList]
        goodsList: oldGoodsList.concat(newGoodsList)
      })
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh(){
    // 重置页面=>页码返回第一页/数组
    this.goodsData.pagenum = 1;
    this.setData({
      goodsList:[]
    })
    // 重新发送请求
    this.getGoods();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(){
    // 判断=>当前的页码>=总页码
    if(this.totalPages <= this.goodsData.pagenum){
       // 没有下一页
       // 提示
       wx.showToast({
         title: '温馨提示：没有下一页了哦！',
         icon: 'none',
         mask: true
       });
         
     }else{
       // 有下一页数据
       // 让页码++
       this.goodsData.pagenum++;
       // 重新发送请求
       this.getGoods();
     }
  },
  // 切换标题传值
  itemChange(e){
    // console.log(e);
    this.setData({
      curronIndex:e.detail.index
    })
  }
})