// 主地址
const api = 'https://newerds.51cptj.com/index.php/Home/Index/';
// 登录
const v1 = 'login';
function login() {
  return api + v1;
};
// 获取Banner
const v2 = 'getBanner';
function getBanner() {
  return api + v2;
};
// 保存用户信息
const v3 = 'check_login';
function checkLogin() {
  return api + v3;
};
// 个人中心
const v4 = 'getUser';
function getUser() {
  return api + v4;
};
// 分类列表信息
const v5 = 'getType';
function getType() {
  return api + v5;
};
// 获取区域列表
const v6 = 'getArea';
function getArea() {
  return api + v6;
};
// 发布新需求
const v7 = 'addNotice';
function addNotice() {
  return api + v7;
};
// 获取便民信息列表
const v8 = 'getUserTypeList';
function getUserTypeList() {
  return api + v8;
};
// 获取个人发布列表
const v9 = 'getUserList';
function getUserList() {
  return api + v9;
};
// 删除个人已发布信息
const v10 = 'noticeDel';
function noticeDel() {
  return api + v10;
};
// 获取商家活动详情图
const v11 = 'getQupic';
function getQupic() {
  return api + v11;
};
// 获取Banner详情
const v12 = 'getBannerDetial';
function getBannerDetial() {
  return api + v12;
};
const v13 = 'deal_many_pic';
function addNoticePic() {
  return api + v13;
};
//获取个人发布单条信息
const v14 = 'noticeList';
function getUserListOne() {
  return api + v14;
};
//获取公司配置信息
const v15 = 'getPeizhi';
function getPeizhi() {
  return api + v15;
};

//获取类目信息
const v16 = 'getTypes';
function getTypes() {
  return api + v16;
};


//修改发布信息
const v17 = 'editNotice';
function editNotice() {
  return api + v17;
};

//获取类目
const v18 = 'getTname';
function getTname() {
  return api + v18;
};
//获取区域
const v19 = 'getAname';
function getAname() {
  return api + v19;
};
//获取默认地区
const v20 = 'getMapList';
function getMapList() {
  return api + v20;
};


module.exports = {
  login: login,
  getBanner: getBanner,
  checkLogin: checkLogin,
  getUser: getUser,
  getType: getType,
  getArea: getArea,
  addNotice: addNotice,
  getUserTypeList: getUserTypeList,
  getUserList: getUserList,
  noticeDel: noticeDel,
  getQupic: getQupic,
  getBannerDetial:getBannerDetial,
  addNoticePic:addNoticePic,
  getUserListOne: getUserListOne,
  getPeizhi: getPeizhi,
  getTypes: getTypes,
  editNotice: editNotice,
  getTname: getTname,
  getAname: getAname,
  getMapList: getMapList
};