//index.js
//获取应用实例
var formatLocation = require('./format-location.js');
var app = getApp();
var server = require('../../utils/server');
var porductData = require('../../data/product-data.js');
var WxNotificationCenter = require('../../utils/WxNotificationCenter.js');
var that;
Page({
  data: {
      banners: [
			{
				id: 1,
				img: '/images/index/banner_1.png',
				url: '',
				name: '1'
			},
			{
				id: 2,
				img: '/images/index/banner_1.png',
				url: '',
				name: '2'
			},
			{
				id: 3,
				img: '/images/index/banner_1.png',
				url: '',
				name: '3'
			}
		],
		icons: [
			{
				id: 1,
				img: '/images/icon_dingdan.png',
				name: '我的订单',
				url: ''
			},
			{
				id: 2,
				img: '/images/icon_riyong.png',
				name: '超市日用',
				url: ''
			},
			{
				id: 3,
				img: '/images/icon_shuiguo.png',
				name: '水果专卖',
				url: ''
			},
			{
				id: 4,
				img: '/images/icon_jifen.png',
				name: '积分商城',
				url: ''
			}	
		],
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		address: '选择一个地址位置'
  },
  onLoad: function(options){
		that = this;
		WxNotificationCenter.addNotification("addressSelectedNotification",that.getAddress,that);
		this.setData({
			products: porductData.productsList.goods
		});
  },
	
  tapAddress: function(){
	console.log('a');
	wx.navigateTo({
	  url: '../address/address',
	})
  },
	getAddress: function (address) {
			that.setData({
					address: address
			});
	},
  onScroll: function (e) {
	if (e.detail.scrollTop > 100 && !this.data.scrollDown) {
		this.setData({
			scrollDown: true
		});
	} else if (e.detail.scrollTop < 100 && this.data.scrollDown) {
		this.setData({
			scrollDown: false
		});
	}
  },

  tapBanner: function (e) {
	var name = this.data.banners[e.target.dataset.id].name;
	wx.showModal({
		title: '提示',
		content: '您点击了“' + name + '”活动链接，活动页面暂未完成！',
		showCancel: false
	});
  },
  tapSearch: function(){
	  wx.navigateTo({
		url: '../search/search',
	  })
  },
  toDetail: function(e){
	var productId = e.currentTarget.dataset.productid;
	wx.navigateTo({
		url: "../product/detail/detail?id=" + productId
	})
  },

  addCart: function (id) {
	var num = this.data.cart.list[id] || 0;
	this.data.cart.list[id] = num + 1;
	this.data.cart.count = num;
	wx.showToast({
		title: "已加入购物车",
		icon: 'success',
  		duration: 2000
	});
	this.setData({
 		cart: this.data.cart
 	});
  }

})
