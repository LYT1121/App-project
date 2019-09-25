// components/commodityDetails/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailTitleList:{
      type:Array,
      value:[]
    },
    curronIndex:{
      type:Number,
      value:0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e){
      // console.log(e);
      const {index} = e.target.dataset;
      this.triggerEvent('itemChange',{index})
    }
  }
})
