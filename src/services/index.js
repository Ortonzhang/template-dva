import request from '../utils/request';

// 登录
export function login(data) {
  // return request(
  //   '/contract/access/login',
  //   data,
  //   {},
  //   'post',
  //   true
  // )
  return {
    data: {
      privilegeDtoList: [{name: '列表', url: 'list'}, {name: '测试', url: 'test'}],
      userName: '张三',
      userId: '12121212'
    }
  }
}

// 退出登录
export function logout(){
  return request(
    '/contract/access/logout',
    '',
    {},
    'post',
    true
  )
}
// 更改密码
export function updatePassword(data){
  return request(
    '/contract/access/update_password',
    data
  )
}

export function getList(){
  return [...Array(20).keys()]
}