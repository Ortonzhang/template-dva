import axios from 'axios'
import { notification } from 'antd';
export  default function request(url, data, config={}, reqType='post', toastDisabled = true){
  return new Promise((resolve, reject) => {
    var params = Object.assign({
      method: reqType,
      url
    }, config)
    params = reqType.toUpperCase() === 'GET' ? Object.assign({params: data}, params) : Object.assign({}, params, {data: data}) 
    axios(params).then(res => {
      let data = res.data
      if(data.responseCode === -999 ){
        reject(data)
      } else if(data.errorCode === '0'){
        !toastDisabled && notification.success({ message: data.errorMsg })
        resolve(data)
      } else {
        data.errorMsg && notification.error({ message: data.errorMsg })
        reject(data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}