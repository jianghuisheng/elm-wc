// 设置项目配置文件
// 设置API服务器、图片服务器
const host = "https://h5.ele.me";
const imgHost = "";
const latitude = 34.728288;
const longitude= 113.751266;

const config = {
  host,
  imgHost,
  latitude,
  longitude,
  // 首页商家列表地址
  restPath: `${host}/restapi/shopping/v3/restaurants`,
  // 首页分类地址
  catePath: `${host}/restapi/shopping/openapi/entries`,
  // 首页轮播图地址
  bannerPath: `${host}/restapi/shopping/v2/banners`,
  // 首页位置地址
  losPath: `${host}/restapi/bgs/poi/reverse_geo_coding`,
  // 具体餐厅地址
  storePath: `${host}/restapi/shopping/restaurant`,
  // 商品地址
  foodPath: `${host}/restapi/shopping/v2/menu`,
  // 筛选路径
  selectPath: `${host}/pizza/shopping/restaurants/batch_filter`

  
}

module.exports = config;