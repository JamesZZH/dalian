// pages/my/my.js
var WxParse = require('../../wxParse/wxParse.js');
var request = require('../../utils/request.js');
var app = getApp();
Page({
  data: {},
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
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    request.getUser(
      { "session_id": app.globalData.session_id },
      (res) => {
        console.log(res);
        that.setData({
          list: res.data
        })
      },
    ),
      request.getPeizhi(
      { "session_id": app.globalData.session_id },
      (res) => {
        WxParse.wxParse('xiaoquxx', 'html', res.data.xiaoquxx, that, 5);
      },
    )
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})





