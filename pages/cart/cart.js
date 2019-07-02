Page({
  data:{
    count:0,
    number:0,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    selectedAllStatus: false,
    carts: [
                {
                    name:'农夫山泉矿泉水',
                    image:'/images/product/product_1.png',
                    num:'2',
                    price:'1.0',
                    original:'2.0',
                    selected:false
                },
                {
                    name:'可口可乐',
                    image:'/images/product/product_2.png',
                    num:'3',
                    price:'5.0',
                    original:'6.0',
                    selected:false
                },
                {
                    name:'可口可乐',
                    image:'/images/product/product_3.png',
                    num:'1',
                    price:'8.0',
                    original:'10.0',
                    selected:false
                }
           ]

  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载

  },
  bindMinus: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].num;
    if (num > 0) {
        num --;
    }
    var minusStatus = num <= 0 ? 'disabled' : 'normal';
    var carts = this.data.carts;
    carts[index].num = num;
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    this.setData({
        carts: carts,
        minusStatuses: minusStatuses
    });
    this.sum();
  },
  bindPlus: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].num; 
    num ++;
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var carts = this.data.carts;
    carts[index].num = num;
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    this.setData({
        carts: carts,
        minusStatuses: minusStatuses
    });
    this.sum();
  }, 
  bindCheckbox: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    
    carts[index].selected = !selected;
    this.setData({
        carts: carts
    });
    this.sum();
    
  },
  bindSelectAll: function() {
    var selectedAllStatus = this.data.selectedAllStatus;
    selectedAllStatus = !selectedAllStatus;
    var carts = this.data.carts;
    
    for(var i=0;i < carts.length; i++){
        carts[i].selected = selectedAllStatus;
        this.setData({
            carts: carts
        })
    }
    this.setData({
        selectedAllStatus: selectedAllStatus,
    });
    
    this.sum();
  },
  sum: function(){
    var carts = this.data.carts;
    var count = 0;
    for (var i = 0; i < carts.length; i++) {
        if (carts[i].selected) {
            count += carts[i].num * carts[i].price;
        }
    }
    this.setData({
        carts: carts,
        count: count
    });
  },
  submit: function (e) {
    wx.navigateTo({
        url: '../product/order/order'
    })
},
})