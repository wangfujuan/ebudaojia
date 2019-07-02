var app = getApp();
Page({
  data:{
    searchWords: '',
    placeholder: '请输入收货地址',
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
  },
  inputSearch: function (e) {
		this.setData({
			searchWords: e.detail.value
		});
	},
  addAddress: function(){
    wx.navigateTo({
      url: 'addaddress/addaddress',
    })
  }
})