var WxParse = require('../../wxParse/wxParse.js');
var request = require('../../utils/request.js');
var app = getApp();
var id;
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
    console.log(options);
    id = options.id;
    var that = this;
    var that = this;
    request.getBannerDetial(
      {
        "session_id": app.globalData.session_id,
        "id": id
      },
      (res) => {
        console.log(res);
        that.setData({
          list: res.data
        })
        var article = res.data.content;
        WxParse.wxParse('article', 'html', article, that, 5);
        // var title = res.data.title;
        // WxParse.wxParse('title', 'html', title, that, 5);
      }
    )
  },
  onShow: function () {

  },
})