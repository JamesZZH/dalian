// pages/new/new.js
var request = require('../../utils/request.js');
var app = getApp();
var tid, aid, area, money, descript, phone, pic = 0;
Page({
  data: {
    disabled: false,
    imageList: [''],
    bac: {},
    zp: {
      "area": "职位",
      "areaPlaceholder": "例（司机）",
      "money": '工资',
      "moneyPlaceholder": "例（4800元/月）",
      "descript": '职位描述',
      "descriptPlaceholder": "例（某某汽车服务有限公司招聘修理厂前台接待2名，男女不限，会开车懂电脑）最长60字",
      "phone": '联系电话',
      "phonePlaceholder": "例（13847780952）",
    },
    cz: {
      "area": "小区",
      "areaPlaceholder": "例（广厦小区）",
      "money": '租金',
      "moneyPlaceholder": "例（1800元/月）",
      "descript": '房屋描述',
      "descriptPlaceholder": "例（120平米，3室2厅1卫，简单装修，5楼电梯）最长60字",
      "phone": '联系电话',
      "phonePlaceholder": "例（13847780952）",
    },
    sp: {
      "area": "店铺名称",
      "areaPlaceholder": "例（烧烤店）",
      "money": '转租价格',
      "moneyPlaceholder": "例（5万）",
      "descript": '房屋描述',
      "descriptPlaceholder": "例（平安小区底商，正在营业烧烤店，80平米）最长60字",
      "phone": '联系电话',
      "phonePlaceholder": "例（13847780952）",
    },
    esf: {
      "area": "小区",
      "areaPlaceholder": "例（广厦小区）",
      "money": '售价',
      "moneyPlaceholder": "例（58万元）",
      "descript": '房屋描述',
      "descriptPlaceholder": "例（120平米，3室2厅1卫，简单装修，5楼电梯）最长60字",
      "phone": '联系电话',
      "phonePlaceholder": "例（13847780952）",
    },
    esc: {
      "area": "车型",
      "areaPlaceholder": "例（奥迪）",
      "money": '售价',
      "moneyPlaceholder": "例（28万元）",
      "descript": '车辆描述',
      "descriptPlaceholder": "例（2015年购买，行驶5万公里，无事故保养好）最长60字",
      "phone": '联系电话',
      "phonePlaceholder": "例（13847780952）",
    },
    eswp: {
      "area": "物品名称",
      "areaPlaceholder": "例（手机）",
      "money": '售价',
      "moneyPlaceholder": "例（3800元）",
      "descript": '物品描述',
      "descriptPlaceholder": "例（Iphone7土豪金，128G，九成新）最长60字",
      "phone": '联系电话',
      "phonePlaceholder": "例（13847780952）",
    },
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
    console.log(options.id);
    tid = options.id;
    switch (options.id) {
      case '1':
        that.setData({
          bac: that.data.zp
        })
        console.log(that.data.bac);
        break;
      case '2':
        that.setData({
          bac: that.data.cz
        })
        break;
      case '3':
        that.setData({
          bac: that.data.sp
        })
        break;
      case '4':
        that.setData({
          bac: that.data.esf
        })
        break;
      case '5':
        that.setData({
          bac: that.data.esc
        })
        break;
      case '6':
        that.setData({
          bac: that.data.eswp
        })
        break;
    }
    var that = this;
    request.getArea(
      { "session_id": app.globalData.session_id },
      (res) => {
        console.log(res);
        that.setData({
          area: res.data
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
  formSubmit: function (e) {
    var that = this;
    area = e.detail.value.area;
    money = e.detail.value.money;
    descript = e.detail.value.descript;
    phone = e.detail.value.phone;
    aid = e.detail.value.aid;
    that.a();
  },
  // 选择图片
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      count: 6,
      success: function (res) {
        console.log(res)
        pic = 1;
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  // 预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // 地区判断
  a: function () {
    var that = this;
    if (aid != '') {
      that.b();
    } else {
      wx.showToast({
        title: '请选择地区',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // area判断
  b: function () {
    var that = this;
    if (area != '') {
      that.c();
    } else {
      wx.showToast({
        title: '请填写' + that.data.bac.area,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // money判断
  c: function () {
    var that = this;
    if (money != '') {
      that.d();
    } else {
      wx.showToast({
        title: '请填写' + that.data.bac.money,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // descript判断
  d: function () {
    var that = this;
    if (descript != '') {
      that.e();
    } else {
      wx.showToast({
        title: '请填写' + that.data.bac.descript,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // phone判断
  e: function () {
    var that = this;
    if (phone != '') {
      that.upload();
    } else {
      wx.showToast({
        title: '请填写' + that.data.bac.phone,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  upload: function () {
    var that = this;
    that.setData({
      disabled: true
    })
    request.addNotice(
      {
        "session_id": app.globalData.session_id,
        'area': area,
        'money': money,
        'descript': descript,
        'phone': phone,
        'tid': tid,
        'aid': aid
      },
      (res) => {
        console.log(res);
        if (res.data.status == "error") {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function (res) {
            }
          })
        } else if (pic == 1) {
          var i = 0;
          for (i; i < this.data.imageList.length; i++) {
            request.addNoticePic(
              {
                "id": res.data.lastid,
              }, that.data.imageList[i],
              (res) => {
                console.log(res);
                if (res.data.status == "error") {
                  wx.showModal({
                    title: '提示',
                    content: res.data.msg,
                    showCancel: false,
                    success: function (res) {
                    }
                  })
                }
              },
            )
          }
          if (i = this.data.imageList.length) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 800,
              complete: setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 800)
            })
          }
        } else if (pic == 0) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 800,
            complete: setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 800)
          })
        }
      },
    )
  }
})
