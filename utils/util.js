var app = getApp()
var pages = getCurrentPages()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 点击商品
function goodsClick(e = {}, that = {}) {
  // 如果点击的+
  if (e.target.dataset.type == 'push') {
    pushShopCar(e.currentTarget.dataset.item)
  }else if(e.target.dataset.type=='details'){ //详情
    toDetails(e)
  }
}


//至登录页 
function toLogin(){
  wx.navigateTo({
    url: '/pages/login/login',
  })
}

// 跳转至详情页
function toDetails(e){
  app.globalData.goods = e.currentTarget.dataset.item
  wx.navigateTo({
    url: '/pages/goods_details/goods_details',
  })
}

// 获取常购
function getOften() {
  wx.request({
    url: app.globalData.dataIP + '/often/find',
    data: {
      submitType: 'findJoin',
      ref: ['goods', '']
    },
    success: (res) => {
      app.globalData.often = res.data[0]
    }
  })
}

// 加入常购
function pushOften(_id,that){
  // 如果没登录
  if (!app.globalData.userInfo) {
    toLogin()
    return
  }
  wx.request({
    url: app.globalData.dataIP+'/often/find',
    data:{},
    success:(res)=>{
      let arr=res.data[0].goods
      // 是常购
      if(arr.indexOf(_id)==-1){
        arr.push(_id)
        console.log(arr)
        wx.showToast({
          title:'已添加',
          icon:'success',
          duration:1000
        })
      }else{
        arr.splice(arr.indexOf(_id),1)
        wx.showToast({
          title: '已取消',
          icon: 'success',
          duration: 1000
        })
      }
      // 修改数据库
      wx.request({
        url: app.globalData.dataIP + '/often/update',
        data: {
          _id: res.data[0]._id,
          goods: arr
        },
        success: (res) => {
          getOften()
          // 修改页面状态
          that.setData({
            isOften:!that.data.isOften
          })
        }
      })
    }
  })
}

//获取分类
function getClassify(that){
  wx.request({
    url: app.globalData.dataIP+'/classify/find',
    data: {
      submitType:'findJoin',
      ref:['goods','']
    },
    success: (res) =>{
      app.globalData.classify=res.data
    }
  })
}

// 加入购物车
function pushShopCar(item, that) {
  // 如果没登录
  if(!app.globalData.userInfo){
    toLogin()
    return
  }
  let id=''
  for (let item2 of app.globalData.shopCar) {
    if (item._id == item2.goods[0]._id) {
      id=item2._id
    }
  }
  // 第一次加购物车
  if (id=='') {
    wx.request({
      method: 'post',
      url: app.globalData.dataIP + "/shopCar/add",
      data: {
        goods: [item._id],
        num: 1
      },
      success: (res) => {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1000
        })
        getShopCar(that?that:'')
      }
    })
  }else{
    // 先查询现有数量
    wx.request({
      method: 'post',
      url: app.globalData.dataIP + "/shopCar/find",
      data: {
        _id:id
      },
      success: (res) => {
        // 修改数量
        setShopCar(id,++res.data.num)
        wx.showToast({
          title: '数量+1',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }
}

// 修改购物车数量
function setShopCar(_id,num,that){
  // 增加数量
  wx.request({
    method: 'post',
    url: app.globalData.dataIP + "/shopCar/update",
    data: {
      _id,
      num,
    },
    success: (res) => {
      // 获取购物车
      getShopCar(that ? that : '')
    }
  })
}

// 获取购物车
function getShopCar(that) {
  wx.request({
    url: app.globalData.dataIP + '/shopCar/find',
    data: {
      submitType: 'findJoin',
      ref: ['goods', '']
    },
    success: (res) => {
      app.globalData.shopCar = res.data
      // 在购物车界面直接添加可刷新
      if(that!=''){
        that.setData({
          shopCar: app.globalData.shopCar
        })
        getTotal(that)
      }
    }
  })
}

// 获取总价
function getTotal(that){
  let arr = that.data.selectArr
  let money = 0;
  // 计算已选的总价
  for (let item of arr) {
    for (let item2 of that.data.shopCar) {
      if (item2._id == item) {
        money += item2.num * item2.goods[0].price
      }
    }
  }
  // 判断是否是小数，最后以0.00格式输出
  money += String(money).indexOf('.') == -1 ? '.00' : '0'
  that.setData({
    total: money
  })
}


module.exports = {
  formatTime,
  goodsClick,
  getShopCar,
  pushShopCar,
  pushOften,
  setShopCar,
  toDetails,
  getTotal,
  getOften,
  getClassify,
  toLogin
}