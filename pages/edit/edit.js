// pages/edit/edit.js
var request = require('../../utils/request.js');
var app = getApp();
Page({
  data: {
    list: []
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
    var that = this;
    request.getUserList(
      {
        "session_id": app.globalData.session_id,
      },
      (res) => {
        console.log(res);
        that.setData({
          list: res.data.data
        })
      },
    )
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  //删除一条数据
  del: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.id);
    wx.showModal({
      title: '提示',
      content: '确定删除？删除后将无法找回',
      success: function (res) {
        if (res.confirm) {
          request.noticeDel(
            {
              "session_id": app.globalData.session_id,
              "id": e.currentTarget.dataset.id
            },
            (res) => {
              console.log(res);
              request.getUserList(
                {
                  "session_id": app.globalData.session_id,
                },
                (res) => {
                  console.log(res);
                  that.setData({
                    list: res.data.data
                  })
                },
              )
            },
          )
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //编辑数据
  edit:function(e){
    var that = this;
    var editId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../editDetail/editDetail?editId=' + editId
    })

  },

  goPhone: function (e) {
    // console.log(e.currentTarget.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  showPic: function (e) {
    var a = [];
    for (let i = 0; i < e.currentTarget.dataset.allpic.length; i++) {
      a[i] = e.currentTarget.dataset.ip + e.currentTarget.dataset.allpic[i].logo;
      // console.log(a[i]);
    }
    wx.previewImage({
      current: e.currentTarget.dataset.pic, // 当前显示图片的http链接
      urls: a// 需要预览的图片http链接列表
    })
  }
})