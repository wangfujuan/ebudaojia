Page({
  data:{
    placeholder: "矿泉水"
  },
  onLoad:function(options){
    
    
  },
  clearHistory: function(){
      wx.showModal({
        title: '清除历史记录',
        confirmColor:'#ff5000',
        success: function(res) {
            if (res.confirm) {
                console.log('用户点击确定')
            }
        }
     })
  }
})