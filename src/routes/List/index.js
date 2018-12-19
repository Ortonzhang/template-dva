import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Form, Icon, Button } from 'antd';

const CallbackPage = ({ dispatch, list,
  form: {
    getFieldDecorator
  }
}) => {
  const { testList } = list
  const getList = () => {
    dispatch({type: 'list/getList'})
  }
  return (
    <div>
      <Breadcrumb style={{margin: '0 0 20px 0'}}>
        <Breadcrumb.Item href="/">
          <Icon type="home" />
          首页
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          列表
        </Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Button onClick={getList}>点击我获取数据</Button>
        <ul>
          {
            testList.map(item => 
              <li key={item}>{item}</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}


export default connect(({list})=>({list}))(Form.create()(CallbackPage))
