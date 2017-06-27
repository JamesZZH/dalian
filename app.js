var WxParse = require('wxParse/wxParse.js');
var util = require('utils/util.js');
var request = require('utils/request.js');
App({
  onLaunch: function () {
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
  getUserInfo: function () {
    var that = this;
    wx.login({
      success: function (res) {
      console.log(res);


        if (res.code) {
          //发起网络请求
          request.login(
            {
              "code": res.code
            }, (res) => {

              console.log(res);
              var session_id = res.data.session_id;
              that.globalData.session_id = res.data.session_id;
              wx.getUserInfo({
                success: function (res) {
                  console.log(11111);
                  console.log(res);

                  request.checkLogin(
                    {
                      'iv': res.iv,
                      'encryptedData': res.encryptedData,
                      'session_id': session_id
                    }, (res) => {
                      console.log(res);
                    }
                  )
                }
              })
            }
          )
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
  }
})

