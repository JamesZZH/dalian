// pages/publish/publish.js
var request = require('../../utils/request.js');
var app = getApp();
var tid, aid, area, money, descript, phone, pic = 0;
Page({
  data: {
    firsrCart:"发布类目",
    firsrArea: "发布区域",
    showCart: true,
    showArea: false,
    cartid:1,
    areaid:1,
  },
  //分享功能的实现
  onShareAppMessage: function () {
    return {
      success: function (res) {
        // 分享成功
        console.log(res);
      },
      fail: function (res) {
        // 分享失败
        console.log(res);
      }
    }
  },

  //点击类目
  clickCart: function () {
    var showCart = this.data.showCart;
    if (showCart == true) {
      this.setData({
        showCart: false,
      })
    } else {
      this.setData({
        showCart: true,
        showArea: false,
      })
    }
  },
  //点击切换类目
  cartSelect: function (e) {
    this.setData({
      firsrCart: e.target.dataset.cart,
      showCart: false,
      showArea: true,
      cartid: e.currentTarget.dataset.id,
      num1: e.currentTarget.dataset.id
    })

  },
  //点击选择区域
  clickArea: function () {
    var showArea = this.data.showArea;
    if (showArea == true) {
      this.setData({
        showArea: false,
      })
    } else {
      this.setData({
        showCart: false,
        showArea: true,
      })
    }
  },
  //点击切换区域
  areaSelect: function (e) {
    this.setData({
      firsrArea: e.target.dataset.area,
      showArea: false,
      areaid: e.currentTarget.dataset.id,
      //----------显示面板
      showDetail:true,
      num2: e.currentTarget.dataset.id
    })

    console.log(this.data);
    wx.navigateTo({
      url: 'publishDetail/publishDetail?tid='+this.data.cartid+"&aid="+this.data.areaid,
    })
  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 获取类目列表
    var that = this;
    request.getType(
      { "session_id": app.globalData.session_id },
      (res) => {
        console.log(res);
        that.setData({
          list: res.data
        })

      },
    ),
      //获取区域列表
      request.getArea(
        {//"tid": this.data.cartid
        },
        (res) => {
          this.setData({
            areaList: res.data
          })

        },
      )
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    //页面加载的时候的重置数据
    this.setData({
      firsrCart: "发布类目",
      firsrArea: "发布区域",
      showCart: true,
      showArea: false,
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }

})