// pages/home/home.js
// 获取应用实例
var app=getApp()
Page({
  data: {
    imgIP: app.globalData.imgIP,
    time: 3,
    show: true,
    showAd: true,
    bannerArr: [
      '/images/banner01.jpg',
      '/images/banner02.jpg'
    ],
    infoArr:[]
  },
  //清除广告
  clearAd: function() {
    this.setData({
      showAd: false
    })
  },
  // 跳转到广告
  toAd: function(e) {
    wx.navigateTo({
      url: '../ad/ad?src=' + e.currentTarget.dataset.src,
    })
  },
  // 至信息内容页
  toInfoContent: function(e) {   
    wx.navigateTo({
      url: '../infoContent/infoContent?item=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },
  // 至信息页
  toInfo: function () {
    wx.navigateTo({
      url: '../info/info',
    })
  },
  // 跳过待机页面
  goHome: function () {
    // 显示tabbar
    wx.showTabBar()          
    this.setData({
      show: false
    })
  },
  // 下拉刷新事件监听
  onPullDownRefresh:function(){
    console.log(1)
    wx.showNavigationBarLoading()
     this.getInfo()
     wx.stopPullDownRefresh()

  },
      // 获取info
  getInfo:function(){
    var that=this
    wx.request({
      url: app.globalData.dataIP + '/info/find',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          infoArr: res.data
        })
      }
    })
  }
  /**
   * 生命周期函数--监听页面加载
   */
  ,
  onLoad: function(options) {
    
    var that=this
    // 隐藏tabbar
    wx.hideTabBar({})
    // 待机页面倒计时
    let timeInterval = setInterval(() => {
      this.setData({
        time: this.data.time - 1
      })
      if (this.data.time <= 0) {
        // 显示tabbar
        wx.showTabBar()                  
        clearInterval(timeInterval)
        that.setData({
          show:false
        })  
      }
    
    }, 1000)
    this.getInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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