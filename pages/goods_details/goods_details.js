// pages/goods_details/goods_details.js
var app=getApp()
var{
  pushShopCar,
  pushOften
}=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    imgIP:app.globalData.imgIP,
    isOften: false
  },
  // 加入购物车
  pushShopCar:function(){
    pushShopCar(app.globalData.goods)
  },
  // 加入常购
  pushOften:function(){
    pushOften(this.data.data._id,this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      data:app.globalData.goods,
      isOften:app.globalData.often.goods.some(item=>item._id==app.globalData.goods._id)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})