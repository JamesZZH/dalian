// pages/index/index.js
var request = require('../../utils/request.js');
var app = getApp();
Page({
  data: {
    imgUrls: [],
    pic1: [
      {
        "id": 1,
        "name": '商铺转租',
        "pic": '../../images/serPic1.png',
      },
      {
        "id": 2,
        "name": '房屋出售',
        "pic": '../../images/serPic2.png',
      },
      {
        "id": 3,
        "name": '招聘',
        "pic": '../../images/serPic3.png',
      },
      {
        "id": 4,
        "name": '农产品',
        "pic": '../../images/serPic4.png',
      },
    ],
    pic2:[
      {
        "id": 5,
        "name": '房屋出租',
        "pic": '../../images/serPic5.png',
      },
      {
        "id": 6,
        "name": '二手物品',
        "pic": '../../images/serPic6.png'
      },
      {
        "id": 7,
        "name": '教育辅导',
        "pic": '../../images/serPic7.png'
      },
      {
        "id": 8,
        "name": '综合信息',
        "pic": '../../images/serPic8.png'
      },
    ]
  },
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
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log('session 未过期');
        app.getUserInfo();
      },
      fail: function () {
        //登录态过期
        app.getUserInfo();
      }
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    request.getBanner(
      { "session_id": app.globalData.session_id },
      (res) => {
        console.log(res);
        that.setData({
          imgUrls: res.data
        })
      },
    );
    request.getQupic(
      { "session_id": app.globalData.session_id },
      (res) => {
        console.log(res+"0000000000000000000");
        that.setData({
          funnyPic: res.data
        })
      },
    )
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  goDetail: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.currentTarget.dataset.id
    })
  },
  goBanner: function (e) {
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: '../adDetail/adDetail?id=' + e.currentTarget.dataset.id
    })
  }
})