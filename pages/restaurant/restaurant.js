// pages/restaurant/restaurant.js
const app = getApp();
const config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      shopLos:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option){
    console.log( option )
    let restid = option.restid;
    this.getLos(restid);
     
  },
  getLos(resid){
    // 获取商家信息
    wx.request({
      url: `${config.storePath}/${resid}`,
      data:{
        extras: ['flavors', 'qualification'],
        terminal:'web',
        latitude: config.latitude,
        longitude: config.longitude,
        USERID: 1468959898
      },
      success:function(val){
        console.log(val);
        this.setData({
          shopLos:val.data
        })
      }.bind(this)
    })
  }

  
})