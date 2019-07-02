var app = getApp();
var server = require('../../../utils/server');
var porductData = require('../../../data/product-data.js');
Page({
	data: {
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
		products:[
			{
				id: 1,
				img: '/images/index/product_1.png',
				name: '加多宝凉茶',
				nowprice: '1.00',
				original: '3.00',
				picon: '特价',
				url: ''
				
			},
			{
				id: 2,
				img: '/images/index/product_2.png',
				name: '加多宝凉茶',
				nowprice: '3.00',
				original: '10.00',
				picon: '特价',
				url: ''
				
			},
			{
				id: 3,
				img: '/images/index/product_3.png',
				name: '加多宝凉茶',
				nowprice: '13.00',
				original: '19.00',
				picon: '特价',
				url: ''
				
			},
		],
		cart: {
			count: 0,
			total: 0,
			list: {}
		},
		showCartDetail: false
	},
	onLoad: function (options) {
		var productId = options.id;
		var productItemData = porductData.productsList.goods[productId];
		this.setData({
			productItemData: productItemData,
			productsList:porductData.productsList
		});
		
	},
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id);
	},
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
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
			var goods = this.data.productsList.goods[id];;
			count += this.data.cart.list[id];
			total +=  goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
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
});

