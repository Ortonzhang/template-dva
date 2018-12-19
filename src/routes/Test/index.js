import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Form, Icon, Button } from 'antd';

const CallbackPage = ({ dispatch, list,
  form: {
    getFieldDecorator
  }
}) => {
  return (
    <div>
      <Breadcrumb style={{margin: '0 0 20px 0'}}>
        <Breadcrumb.Item href="/">
          <Icon type="home" />
          首页
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          测试页
        </Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Button>我就是个按钮</Button>
      </div>
    </div>
  )
}


export default connect(({list})=>({list}))(Form.create()(CallbackPage))
