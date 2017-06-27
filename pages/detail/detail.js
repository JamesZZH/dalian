var screenHeight, screenWidth, get_type = 0;
var request = require('../../utils/request.js');
var utils = require('../../utils/util.js');
var app = getApp();
var tid,aid;
var page = 1;
var totalList = [];
Page({
  data: {
    activeIndex: 0,
    list: [],
    pubBtn:false,
    isEmpty:true,
    showTipimg:false,
    showTipword:false,
    showBtn: false,
    showbottom: false,
    showCountry: true,
    descript:'',
    tipWord:'',
    lat: '',
    lng: '',
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
  //获取设备信息，屏幕的高度宽度
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        screenHeight = res.windowHeight;
        screenWidth = res.windowWidth;
      }
    });
    tid = options.id;
    aid = options.aid;

    var that = this;
    request.getArea(
      { "session_id": app.globalData.session_id },
      (res) => {
        that.setData({
          area: res.data
        })
      }
    ),
    request.getTypes(
      { 
        "session_id": app.globalData.session_id,
        "id": tid
      },
      (res) => {
        //设置title
        wx.setNavigationBarTitle({
          title: res.data.tname
        })
      }
    )
    request.getUserTypeList(
      {
        "session_id": app.globalData.session_id,
        "tid": tid,
        "aid": aid,
        "p": page,
      },
      (res) => {
        console.log(res);
        
        that.setData({
          list: res.data.data,
          activeIndex:aid
        })

        if (res.data.code == "203") {
          that.setData({
            tipWord: res.data.msg,
            showTipimg: true,
            showTipword: true,
            showbottom: false,
            showBtn: true,
            showCountry: true,
          })
        } 
      },
    )
  },
  onShow: function () {
    // 页面显示
    var that = this;
    this.setData({
      itemWidth: '180rpx'
    });
    request.getUserTypeList(
      {
        "session_id": app.globalData.session_id,
        "tid": tid,
        "aid": aid,
        "p": page,
      },
      (res) => {
        console.log(res);

        that.setData({
          list: res.data.data,
          activeIndex: aid
        })

        if (res.data.code == "203") {
          that.setData({
            tipWord: res.data.msg,
            showTipimg: true,
            showTipword: true,
            showbottom: false,
            showBtn: true,
            showCountry: true,
          })
        }
      })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      list: [],
      showCountry: false
    })
    request.getUserTypeList(
      {
        "session_id": app.globalData.session_id,
        "tid": tid,
        "aid": that.data.activeIndex,
      },
      (res) => {
        console.log(res);
        that.setData({
          list: res.data.data,
          showCountry:true
        })
        wx.stopPullDownRefresh(); //停止下拉刷新
      },
    )
    
  },
 
  //上拉加载
  onReachBottom: function () {
    var that = this;
    page += 1;
      //（5）判断是不是第一次进来
    if (page > 1) {//不是第一次
        //非第一次进入 
      
      request.getUserTypeList(
        {
          "session_id": app.globalData.session_id,
          "tid": tid,
          "aid": that.data.activeIndex,
          "p":page,
        },
        (res) => {
          console.log(res.data);
            totalList = that.data.list.concat(res.data.data);
            that.setData({
              list: totalList
            })
            //没有数据203
            if (res.data.code == "203") {
              that.setData({
                tipWord: res.data.msg,
                showTipimg:true,
                showTipword: true,
                showbottom: false,
                showBtn: true,
                showCountry: true,
              })
            } 
            //没有更多
             if (res.data.code == "202"){
              that.setData({
                tipWord: res.data.msg,
                showTipimg: false,
                showTipword: true,
                showBtn: false,
                showbottom: false,
                showCountry: true,
              })
              
            }
          
        },
      )
      } 
  
    
  },
  //地区切换
  tabChange: function (e) {
    var that = this;
    that.setData({
      tipWord: "",
      showTipimg: false,
      showTipword: false,
      showBtn: false,
    })
    get_type = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: get_type
    });
    request.getUserTypeList(
      {
        "session_id": app.globalData.session_id,
        "tid": tid,
        "aid": that.data.activeIndex,
      },
      (res) => {
        console.log(res);
        that.setData({
          list: res.data.data
        })
        if (res.data.code == "203") {
          that.setData({
            tipWord: res.data.msg,
            showTipimg: true,
            showTipword: true,
            showBtn: true,
            showCountry: true,
          })
        }
      },
    )
  },
  //拨打电话
  goPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  //打开图片
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
  },
  //打开地图
  showMap:function(e){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res);
        console.log(e.target.dataset.lat);
        console.log(e.target.dataset.lng);
        wx.openLocation({
          latitude: parseFloat(e.target.dataset.lat),
          longitude: parseFloat(e.target.dataset.lng),
          scale: 28
        })
      }
    })
  },
  //跳转到发布页
  goPub:function(){
    wx.switchTab({
      url: '../publish/publish',
    })
  }
})
