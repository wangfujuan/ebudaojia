var app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var that;
var qqmapsdk;
Page({
  data:{
    searchWords: '',
    placeholder: '请输入收货地址',
    searchkeyword: ''
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    that = this;
    qqmapsdk = new QQMapWX({
        key: 'BJFBZ-ZFTHW-Y2HRO-RL2UZ-M6EC3-GMF4U'
    });
    that.reloadCurrent();
  },
  inputSearch: function (e) {
	// 键盘不断录入绑定取值
    var keyword = e.detail.value;
    this.setData({
      searchkeyword: keyword
    });
    // 向腾讯地图接口发送请求
    qqmapsdk.getSuggestion({
        keyword: keyword,
        region: that.data.city,
        success: function (res) {
            console.log(res);
            // 保存地址数组
            that.setData({
                result: res.data
            });
        }, 
        fail: function(res) {
            console.log(res);
        },
        complete: function(res) {
            console.log(res);
        }
    });
	},
  addressTapped: function (e) {
      var title = e.currentTarget.dataset.title;
      console.log(title);
      // 取出点中的地址，然后使用WxNotification回传给首页
      WxNotificationCenter.postNotificationName("addressSelectedNotification", title);
      wx.navigateBack();

  },
  geoTapped: function () {
        var title = that.data.address;
        WxNotificationCenter.postNotificationName("addressSelectedNotification", title);
        wx.navigateBack();
        
    },
    reloadCurrent: function () {
        that.setData({
                    address: '正在定位中...',
        });
        // 调用接口
        qqmapsdk.reverseGeocoder({
            poi_options: 'policy=2',
            get_poi: 1,
            success: function(res) {
            // 渲染给页面
                that.setData({
                    address: res.result.formatted_addresses.recommend,
                    result: res.result.pois,
                    city: res.result.address_component.city
                });
            },
            fail: function(res) {
        //         console.log(res);
            },
            complete: function(res) {
        //         console.log(res);
            }
        });
    },
  addAddress: function(){
    wx.navigateTo({
      url: 'addaddress/addaddress',
    })
  }
})