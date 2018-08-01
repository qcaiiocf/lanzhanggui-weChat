// pages/shopCar/shopCar.js
var app = getApp()
var {
  setShopCar,
  toDetails,
  getShopCar,
  getTotal,
  toLogin
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品列表数组
    shopCar: [],
    imgIP: app.globalData.imgIP,
    // 存放已选的数组，主要用于统计总价和选了多少商品
    selectArr: [],
    // 存放选择状态值的对象
    selectObj: {},
    total: '0.0',
    // 全选状态值
    selectAll: false
  },
  // 修改数量
  onChangeNumber: function(e) {
    setShopCar(e.currentTarget.dataset.id, e.detail.number,this)
  },

  // 跳至详情
  toDetails: function(e) {
    toDetails(e)
  },

  // 至登录
  toLogin(){
    toLogin()
  },

  // 删除
  delBtn: function() {
    wx.showModal({
      title: '提示',
      content: `是否删除选择的${this.data.selectArr.length}项`,
      success: (res)=>{
        if (res.confirm) {
          wx.request({
            method: 'post',
            url: app.globalData.dataIP + '/shopCar/del',
            data: {
              ids: this.data.selectArr
            },
            success: (res) => {
              this.setData({
                selectArr: [],
                selectAll:false
              })
              getShopCar(this)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  // 点击多选框
  selectClick: function(e) {
    // 改变多选对象里的布尔值
    this.setData({
      [`selectObj.${e.currentTarget.id}`]: !this.data.selectObj[e.currentTarget.id]
    })
    // 已选数组
    let arr = []
    // 所有商品数组，用于判断是否全选
    let arrAll = []
    let obj = this.data.selectObj
    for (let key in obj) {
      arrAll.push(key)
      if (obj[key]) {
        arr.push(key)
      }
    }
    this.setData({
      selectArr: arr,
      selectAll: arr.length == arrAll.length ? true : false
    })
    // 总计函数
    getTotal(this)
    
  },

  // 全选
  selectAll: function() {
    // 全选求反
    this.setData({
      selectAll: !this.data.selectAll
    })
    let obj = this.data.selectObj
    // 选择数组，
    let arr = []
    for (let key in obj) {
      obj[key] = this.data.selectAll
      if (obj[key]) {
        arr.push(key)
      }
    }
    this.setData({
      selectObj: obj,
      selectArr: arr
    })
    //获取总价
    getTotal(this)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 设置购物车
    this.setData({
      shopCar: app.globalData.shopCar,
      userInfo:app.globalData.userInfo
    })

    // 生成判断选择与否的对象，对象名就是id
    let obj = {}
    for (let item of this.data.shopCar) {
      obj[item._id] = false
    }
    this.setData({
      selectObj: obj
    })
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})