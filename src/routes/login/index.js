import React from 'react';
import { connect } from 'dva';
import styles from './index.scss';
import { Form,  Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

const Login = ({
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'app/login', payload: values })
    })
  }
  return (
    <div className={styles['login']}>
      <div className={styles['header']}></div>
      <div className={styles['body']}>
      <form className={styles['form']}>
        <FormItem hasFeedback>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true, message: '请输入用户名'
              },
            ],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入账号" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true, message: '请输入密码'
              },
            ],
          })(<Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={handleOk} placeholder="请输入密码" />)}
        </FormItem>
        <Button type="primary" onClick={handleOk} className={styles['login-btn']}>
          登录
        </Button>
      </form>
      </div>
    </div>
  )
}



Login.propTypes = {
};


export default connect(({ app })=>({ app }))(Form.create()(Login))

