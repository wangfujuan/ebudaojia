Page({
  data:{
    count:0,
    number:0,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    carts: [
        {title:'自营商城',image:'/images/product/product_1.png',num:'1',price:'198.0',selected:false},
        {title:'自营商城',image:'/images/product/product_1.png',num:'1',price:'100.0',selected:false},
        {title:'自营商城',image:'/images/product/product_1.png',num:'3',price:'15.0',selected:false},
        {title:'自营商城',image:'/images/product/product_1.png',num:'2',price:'15.2',selected:false},
        {title:'自营商城',image:'/images/product/product_1.png',num:'1',price:'122.0',selected:true},
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
    },
    bindPlus: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
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
    }, 
    bindCheckbox: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    var num = parseInt(this.data.carts[index].num); 
    var price=this.data.carts[index].price; 
    if(!selected){
    this.setData({
    count:this.data.count+ num*price,
    number:num+this.data.number
    });
    }else{
    this.setData({
    count:this.data.count- num*price,
    number:this.data.number-num
    });
    }
    carts[index].selected = !selected;
    this.setData({
        carts: carts
    });
    },
    bindSelectAll: function() {
        var selectedAllStatus = this.data.selectedAllStatus;
        selectedAllStatus = !selectedAllStatus;
        var carts = this.data.carts;
        if(!selectedAllStatus){
            for (var i = 0; i < carts.length; i++) {
            carts[i].selected = selectedAllStatus;
            var num = parseInt(this.data.carts[i].num); 
            var price=parseInt(this.data.carts[i].price); 
            this.setData({
                count:this.data.count-num*price,
                number:this.data.number-num
             });
        }
        }
   }
})