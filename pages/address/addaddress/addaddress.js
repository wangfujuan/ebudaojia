Page({
  data:{
    
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    
  },
  selectAddr: function(){
    wx.navigateTo({
      url: 'selectaddr/selectaddr',
    })
  }
})