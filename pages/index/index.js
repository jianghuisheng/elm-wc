//index.js
//获取应用实例
const app = getApp();
const config = require('../../config.js');

Page({
  data:{
    offset:0,
    limit:8,
    latitude:config.latitude,
    longitude:config.longitude,
    restLists:[],
    cateLists:[],
    selectLists:{},
    losName:'',
    selectIns:'',
    selectTem:false,
    tjNodes:[
      {
        name:'h3',
        attrs:{
          class:'main-h3'
        },
        children:[
          {
            type:'text',
            text:'推荐商家'
          }
        ]
      }
    ],
    isOk:true,
    sortFixed:false,
    imgs: [
      'https://fuss10.elemecdn.com/8/ec/3e53fd7729bf68934db57086bf54ejpeg.jpeg',
      'https://fuss10.elemecdn.com/7/b5/370d86b37cba5551b6d1642500345jpeg.jpeg',
      'https://fuss10.elemecdn.com/8/ec/3e53fd7729bf68934db57086bf54ejpeg.jpeg',
      'https://fuss10.elemecdn.com/7/b5/370d86b37cba5551b6d1642500345jpeg.jpeg'
    ]
  },
  onLoad(){
    // console.log(config);
    // 获取餐厅数据
    this.getRest();
    // 获取分类数据
    this.getCate();;
    // 获取地理位置
    this.getLos(); 
    this.getSelect();

  },
  getRest(){
    // https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=34.728288&longitude=113.751266&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5 
    let that = this;
    wx.request({
      url: config.restPath,
      data:{
        latitude:this.data.latitude,
        longitude:this.data.longitude,
        offset:this.data.offset,
        limit:this.data.limit,
        extras: ['activities', 'tags'],
        'extra_filters':'home',
        'rank_id':'',
        terminal:'h5'
      },
      success:function(val){
        // console.log(val); 
        let lists = val.data.items || [];
        this.setData({
          restLists:val.data.items,
          offset: lists.length
        })

         
      }.bind(this) 
    })
  },
  //https://h5.ele.me/restapi/shopping/openapi/entries?latitude=34.728288&longitude=113.751266&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template&terminal=h5
  getCate(){
    wx.request({
      url: config.catePath,
      data:{
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        offset: this.data.offset,
        limit: this.data.limit,
        templates: ['main_template', 'favourable_template', 'svip_template'],
        terminal: 'h5',
      },
      success:function(val){
        // console.log(val);
        // 处理获取的数据，每10个放入一个数组，
        let bigArray = [];
        let smArray = [];
        let lists = val.data[0].entries;
        for( var i = 0; i < lists.length; i++ ){
          smArray.push( lists[i] );
          if( (i + 1) % 10 == 0 || (i == lists.length - 1) ){
            bigArray.push(smArray);
            smArray = [];
          }
        }
        // console.log( bigArray );
        this.setData({
          cateLists: bigArray
        })
      }.bind(this)
    })
  },
  getLos(){
    // https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding?latitude=34.728288&longitude=113.751266
    wx.request({
      url: config.losPath,
      data:{
        latitude:this.data.latitude,
        longitude:this.data.longitude
      },
      success:function(val){
        // console.log(val);
        this.setData({
          losName:val.data.name
        })
      }.bind(this)
    })
  },
  getMore(){
    // 获取更多
    // https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=34.728288&longitude=113.751266&offset=8&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&quality_union=1&rank_id=b768d99a9bde485fb547306d8b197893&terminal=h5
    // https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=34.728288&longitude=113.751266&offset=16&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&quality_union=1&rank_id=b768d99a9bde485fb547306d8b197893&terminal=h5
    // https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=34.728288&longitude=113.751266&offset=24&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&quality_union=1&rank_id=b768d99a9bde485fb547306d8b197893&terminal=h5
    let that = this;
    wx.request({
      url: config.restPath,
      data: {
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        offset: this.data.offset,
        limit: this.data.limit,
        extras: ['activities', 'tags'],
        'extra_filters': 'home',
        'rank_id': '',
        terminal: 'h5'
      },
      success: function (val) {
        console.log(val); 
        let lists = this.data.restLists.concat(val.data.items );
        console.log( lists );
        this.setData({
          restLists:lists,
          offset:lists.length
        })
         
      }.bind(this)
    })
  },
  onReachBottom(){
    // console.log('滚动到底部了');
    // console.log( this.data.offset );
    // 获取更多的数据
    this.getMore(); 
  },
  goRest(ev){
    // console.log('即将跳转至商家页面');
    // console.log(ev.currentTarget.dataset);
    let restId = ev.currentTarget.dataset.restid;
    wx.navigateTo({
      url: `/pages/restaurant/restaurant?restid=${restId}`
    })
  },
  onPageScroll(ev){
    // 页面滚动时执行
    const query = wx.createSelectorQuery();
    query.select('#mainCon').boundingClientRect();
    query.selectViewport().scrollOffset();
    let topScroll = 0;
    query.exec((res) => {
      topScroll = res[0].top;
      // console.log(topScroll);
      // console.log(this);
      if( topScroll <= 0 ){
        this.setData({
          sortFixed:true
        })
      } else {
        this.setData({
          sortFixed: false
        })
      }
    })
     
  },
  selectClick(ev){
    console.log(  )
    let selectIns = ev.currentTarget.dataset.selectins
    this.setData({
      selectIns:selectIns
    })
    if( selectIns === "ins4" ){
      this.setData({
        selectTem: !this.data.selectTem
      })
    }
    const query = wx.createSelectorQuery();
    query.select('#mainCon').boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec( (res) =>{
      let topScorll = res[0].top;
      wx.pageScrollTo({
        scrollTop: topScorll,
      })
    } )
     
    
  },
  getSelect(){
    wx.request({
      url: `${config.selectPath}` ,
      data:{
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        terminal:'h5'
      },
      success:function(val){
        // console.log(val);
        this.setData({
          selectLists:val.data.bar
        })
      }.bind(this)
    })
  },
  closeSelect(){
    this.setData({
      selectTem:false,
      selectIns:''
    })
  }
})
