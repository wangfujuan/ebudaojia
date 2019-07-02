var app = getApp();
var server = require('../../utils/server');
var porductData = require('../../data/product-data.js');
Page({
	data: {
		currentTab: 0,
		shop:{
			id: 1,
			distance: 1.8,
			sales: 1475,
			logo: '/images/product/shop_1.png',
			name: '常顺斋超市',
			time: "30",
			delivery: 2,
			lowup: 15

		},
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		showCartDetail: false,
	},
	onLoad: function (options) {
		this.setData({
			//productsList: porductData.productsList,
			goods: porductData.productsList.goods,
			goodsList: porductData.productsList.goodsList,
		});
	},
	onShow: function () {
		this.setData({
			classifySeleted: this.data.goodsList[0].id
		});
	},
	tapAddCart: function (e) {
		
		this.addCart(e.currentTarget.dataset.id);

		var id =e.currentTarget.dataset.id;
		this.data.goods[id].count++;
		this.setData({
			goods: this.data.goods
		});

	},
	tapReduceCart: function (e) {
		this.reduceCart(e.currentTarget.dataset.id);
		var id =e.currentTarget.dataset.id;
		this.data.goods[id].count--;
		this.setData({
			goods: this.data.goods
		});

	},
	addCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		this.data.cart.list[id] = num + 1;
		this.countCart();
	},
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},
	countCart: function () {
		var count = 0,
			total = 0;
		for (var id in this.data.cart.list) {
			var goods = this.data.goods[id];
			count += this.data.cart.list[id];
			total += goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
	},
	follow: function () {
		this.setData({
			followed: !this.data.followed
		});
	},
	onGoodsScroll: function (e) {
		if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}

		var scale = e.detail.scrollWidth / 570,
			scrollTop = e.detail.scrollTop / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, i) {
			var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
			if (scrollTop >= h - 100 / scale) {
				classifySeleted = classify.id;
			}
			h += _h;
		});
		this.setData({
			classifySeleted: classifySeleted
		});
	},
	tapClassify: function (e) {
		var id = e.target.dataset.id;
		this.setData({
			classifyViewed: id
		});
		var self = this;
		setTimeout(function () {
			self.setData({
				classifySeleted: id
			});
		}, 100);
	},
	showCartDetail: function () {
		this.setData({
			showCartDetail: !this.data.showCartDetail
		});
	},
	hideCartDetail: function () {
		this.setData({
			showCartDetail: false
		});
	},
	submit: function (e) {
		wx.navigateTo({
		  url: 'order/order'
		})
	},
	bindChange: function(e){
		var that = this;  
        that.setData( { currentTab: e.detail.current });  
	},
	swichNav: function(e) {  
		var that = this; 
		if( this.data.currentTab === e.target.dataset.current ) {  
			return false;  
		} else{
			that.setData( {  
				currentTab: e.target.dataset.current  
			})  
		}
    },
	toDetail: function(e){
		var productId = e.currentTarget.dataset.productid;
		wx.navigateTo({
			url: "detail/detail?id=" + productId
		})
		
	}
});

