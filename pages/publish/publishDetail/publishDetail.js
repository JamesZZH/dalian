// pages/publish/publish.js
var request = require('../../../utils/request.js');
var app = getApp();
var tid, aid, area, money,dd, descript, phone, pic = 0;
Page({
  data: {
    firsrCart: "发布类目",
    firsrArea: "发布区域",
    showCart: false,
    showArea: false,
    showDetail: true,
    showMoneyBox: true,
    showAreaBox: false,
    // 选择地址
    location: '',
    lat: '',
    lng: '',
    //发布详情页的数据
    imageList: [],
    cartid: 1,
    areaid: 1,
    uploadPicBtn:true,
    showInfo: {},
    spzz: {
      "area": "商铺名称：",
      "areaPlaceholder": "（如：湾南里小区便民服务店）",
      "money": '商铺租金：',
      "moneyPlaceholder": "（如：2000元/月）",
      "descript": '商铺描述：',
      "descriptPlaceholder": "（如：湾南里小区底商，80平，煤气/燃气、暖气、厨房、卫生间。）",
      "addrPlaceholder": "请选择地址",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    fwcs: {
      "area": "房屋名称：",
      "areaPlaceholder": "（如：湾南里小区 三居室 98平米）",
      "money": '房屋售价：',
      "moneyPlaceholder": "（如：200万）",
      "descript": '房屋描述：',
      "descriptPlaceholder": "（如：120平米，3室2厅1卫，简单装修，5楼电梯）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    zp: {
      "area": "招聘职位：",
      "areaPlaceholder": "（如：保姆）",
      "money": '职位工资：',
      "moneyPlaceholder": "（如：50000元/月）",
      "areabox":"招聘地点：",
      "areaboxPlaceholder":"(如：湾南里小区)",
      "descript": '职位描述：',
      "descriptPlaceholder": "（如：需有高等教育背景，为人细心，有相关经验，薪资可议）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    ncp: {
      "area": "产品名称：",
      "areaPlaceholder": "（如：小麦1000斤）",
      "money": '产品售价：',
      "moneyPlaceholder": "（如：20元/斤）",
      "descript": '详细描述：',
      "descriptPlaceholder": "（如：请输入农产品信息等。举例：通货水分12分以内，容量780左右，杂志6%以内)",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    fwcz: {
      "area": "小区名称：",
      "areaPlaceholder": "（如：湾南里小区）",
      "money": '房屋租金：',
      "moneyPlaceholder": "(如：2000元/月）",
      "descript": '房屋描述：',
      "descriptPlaceholder": "（如：三室一厅，押一付三，5层/12层，精装修，可小刀）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    eswp: {
      "area": "物品名称：",
      "areaPlaceholder": "（如：9成新iPhone7）",
      "money": '物品售价：',
      "moneyPlaceholder": "（如：6000元）",
      "descript": '物品描述：',
      "descriptPlaceholder": "（如：亮黑色，128G，去年十月份入手，无刮痕，国行，保修期到今年十二月份。配件齐全。有发票。当面交易，可小刀)",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    jyfd: {
      "area": "辅导科目",
      "areaPlaceholder": "（如：数学1对1专业辅导）",
      "money": '收费标准：',
      "moneyPlaceholder": "（如：60元/课时）",
      "descript": '详细描述：',
      "descriptPlaceholder": "（如：专业的数学培训，多年教学辅导经验。学生参加奥数竞赛获得优异成绩。只接受晚上一对一辅导，每次两个课时，20课时起报。）",
      "phonePlaceholder": "请输入联系电话",
      "phone": "联系电话"
    },
    zhxx: {
      "area": "信息标题：",
      "areaPlaceholder": "（如：专业疏通下水道）",
      "descript": '信息描述：',
      "descriptPlaceholder": "（如：常年从事疏通下水道工作，非常专业，上门服务，疏通不成功不收取任何费用。）",
      "phonePlaceholder": "请输入联系电话",
      "phone":"联系电话",
   
    },
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
        showDetail: false,
      })
    } else {
      this.setData({
        showCart: true,
        showArea: false,
        showDetail: false,
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
        showDetail: false,
      })
    } else {
      this.setData({
        showCart: false,
        showArea: true,
        showDetail: false,
      })
    }
  },
  //点击切换区域
  areaSelect: function (e) {
    this.setData({
      firsrArea: e.target.dataset.area,
      showArea: false,
      showDetail: false,
      areaid: e.currentTarget.dataset.id,
      //----------显示面板
      showDetail: true,
      num2: e.currentTarget.dataset.id
    })

    //选择数据
    var that = this;
    switch (that.data.cartid) {
      case '1':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.spzz
        })
        break;
      case '2':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.fwcs
        })
        break;
      case '3':
        that.setData({
          showMoneyBox: true,
          showAreaBox:true,
          showInfo: that.data.zp
        })
        break;
      case '4':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.ncp
        })
        break;
      case '5':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.fwcz
        })
        break;
      case '6':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.eswp
        })
        break;
      case '7':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.jyfd
        })
        break;
      case '8':
        that.setData({
          showMoneyBox: false,
          showAreaBox: false,
          showInfo: that.data.zhxx
        })
        break;
    }
    

  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 获取类目列表

    console.log(options);

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
      {},
      (res) => {
        that.setData({
          areaList: res.data
        })
      },
    ),
    //获取当前的类目和区域
    that.setData({
      cartid: options.tid,
      areaid: options.aid,
    })
    //获取类目名称
    request.getTname(
      { "tid": options.tid},
      (res) => {
        console.log(res)
        that.setData({
          firsrCart: res.data
        })
      },
    )
    //获取区域名称
    request.getAname(
      { "aid": options.aid },
      (res) => {
        console.log(res)
        that.setData({
          firsrArea: res.data
        })
      },
    )
    //显示所选中的信息
    //选择数据
    switch (that.data.cartid) {
      case '1':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.spzz
        })
        break;
      case '2':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.fwcs
        })
        break;
      case '3':
        that.setData({
          showMoneyBox: true,
          showAreaBox: true,
          showInfo: that.data.zp
        })
        break;
      case '4':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.ncp
        })
        break;
      case '5':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.fwcz
        })
        break;
      case '6':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.eswp
        })
        break;
      case '7':
        that.setData({
          showMoneyBox: true,
          showAreaBox: false,
          showInfo: that.data.jyfd
        })
        break;
      case '8':
        that.setData({
          showMoneyBox: false,
          showAreaBox: false,
          showInfo: that.data.zhxx
        })
        break;
    }
    //页面展示选择地址
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 成功返回函数
        var longitude = res.longitude;
        var latitude = res.latitude;
        //发送请求通过百度经纬度反查地址信息

        request.getMapList(
           { 
            "lat": latitude,
            "lng": longitude,
           },
          (res) => {
            console.log(res)
           that.setData({
             location: res.data.result.address,
             lat: res.data.result.ad_info.location.lat,
             lng: res.data.result.ad_info.location.lng,
           })
          },
        )


      }
    })
  },
  onReady: function () {
  },
  //页面展示选择地址
  onShow: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // 成功返回函数
        var longitude = res.longitude;
        var latitude = res.latitude;
        //发送请求通过百度经纬度反查地址信息

        request.getMapList(
          {
            "lat": latitude,
            "lng": longitude,
          },
          (res) => {
            console.log(res)
            that.setData({
              location: res.data.result.address,
              lat: res.data.result.ad_info.location.lat,
              lng: res.data.result.ad_info.location.lng,
            })
          },
        )
    }
    })

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  // 选择照片
  chooseImage: function () {
    var that = this;
    var tempCount = 9 - that.data.imageList.length;
    if (tempCount < 1){
      that.setData({
        uploadPicBtn: false
      })
    }
    wx.chooseImage({
      count: tempCount,
      sizeType: 'compressed',
      success: function (res) {
        console.log(res);
        console.log(tempCount);
        var tempImageList = that.data.imageList.concat(res.tempFilePaths);
        pic = 1;
        that.setData({
          imageList: tempImageList
        })
        if (tempImageList.length == 9){
          that.setData({
            uploadPicBtn: false
          })
        }
      }
    })
  },
  //预览照片
  previewImage: function (e) {
    console.log(this.data.imageList);
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // 删除未上传图片
  delPic: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.data.imageList.splice(index, 1);
    that.setData({
      imageList: that.data.imageList,
      uploadPicBtn: true
    });
  },
  //获取位置
  goMap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          location: res.name,
          lat: res.latitude,
          lng: res.longitude
        })
      },
      fail: function (res) {
        console.log(res);
        console.log(that.data.lat);
      }
    });
  },

  //表单提交
  formSubmit: function (e) {
    var that = this;
    tid = that.data.cartid;
    aid = that.data.areaid;
    area = e.detail.value.area;
    money = e.detail.value.money;
    dd = e.detail.value.dd;
    descript = e.detail.value.descript;
    phone = e.detail.value.phone;
    location = e.detail.value.location;
    that.cartS();

   
  },
  //类目判断
  cartS: function () {
    var that = this;
    if (tid != '') {
      that.a();
    } else {
      wx.showToast({
        title: '请选择分类',
        icon: 'loading',
        duration: 1000
      })
    }

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
        title: '请填写' + that.data.showInfo.area,
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
        title: '请填写' + that.data.showInfo.money,
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
        title: '请填写' + that.data.showInfo.descript,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // 地址判断
  e: function () {
    var that = this;
    if (location != '') {
      that.f();
    } else {
      wx.showToast({
        title: '请选择地址',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // phone判断
  f: function () {
    var that = this;
    if (phone != '') {
      that.upload();
    } else {
      wx.showToast({
        title: '请填写' + that.data.showInfo.phone,
        icon: 'loading',
        duration: 1000
      })
    }
  },
  upload: function () {
    var that = this;

    request.addNotice(
      {
        "session_id": app.globalData.session_id,
        'area': area,
        'money': money,
        'descript': descript,
        'phone': phone,
        'tid': tid,
        'aid': aid,
        'dd':dd,
        'address': that.data.location,
        'lat': that.data.lat,
        'lng': that.data.lng
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
                wx.navigateTo({
                  url: '../../detail/detail?id=' + tid + "&aid=" + aid
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
              wx.navigateTo({
                url: '../../detail/detail?id=' + tid + "&aid=" + aid
              })
            }, 800)
          })
        }
      },
    )
  },

})