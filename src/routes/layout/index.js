import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { Layout, Menu, Icon, Modal, Form, Input, Button} from 'antd';
import Styles from './index.scss'
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu
const FormItem = Form.Item;
const LayoutIndex = ({ dispatch, app, children, 
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    resetFields
  }
}) => {
  const { collapsed, menu, user, status, visible, oldPwd, newPwd, newPwdRe} = app

  const handleClickMenu = ({ key }) => {
    `${key}` === 'change' && dispatch({type: `app/setPassword`, payload:{ oldPwd: '', newPwd: '',newPwdRe:''}})
    dispatch({type: `app/${key}`})
  }
  
  const switchSider = () => {
    dispatch({type: 'app/switchSider'})
  }

  const hideModal = () => {
    resetFields()
    dispatch({type: `app/change`})
  }

  const changeInput = (e, name) => {
    dispatch({type: 'app/setPassword', payload: {[name]: e.target.value}})
  }

  const handleOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({type: 'app/changePassword', payload: values})
    })
  }

  const hrefChange = ({ key }) => {
    dispatch({type:'app/sethref', payload: {status: key}})
    let search = key === 'contract' ? '?table=1' : ''
    dispatch(
      routerRedux.push({
        pathname: key,
        search
      })
    )
  }
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return(
    <div>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className={Styles['logo']}>
            {
              !collapsed ? 
              <span>
                <img src={require('@/images/logo.jpg')} alt=""/>
              </span>
              :
              <span>美利</span>
            }
            
          </div>
          <Menu theme="dark" 
            defaultOpenKeys={['sub1']} 
            defaultSelectedKeys={[status]}
            mode="inline" 
            onClick={hrefChange}>
            <SubMenu key="sub1" title={<span><Icon type="dashboard" /><span>电子合同平台</span></span>}>
              {
                menu.map(item => 
                  <Menu.Item key={item.url}>
                    <Icon type="appstore-o" />
                    <span>{item.name}</span>
                  </Menu.Item>
                )
              }
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ height: '100vh', overflow: 'scroll' }}>
          <Header style={{ background: '#fff', padding: 0, height: '56px' }}>
            <div className={Styles['header']}>
              <div className={Styles['button']} onClick={switchSider}>
                <Icon
                  className="trigger"
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                />
              </div>
              <div className={Styles['rightWarpper']}>
                <Menu mode="horizontal" onClick={handleClickMenu}>
                  <SubMenu
                    style={{
                      float: 'right',
                    }}
                    title={<span>
                      <Icon type="user" />
                      {user.userName}
                      </span>}
                  >
                      <Menu.Item key="change">
                        <Icon type="edit" />
                        修改密码
                      </Menu.Item>
                      <Menu.Item key="logout">
                        <Icon type="logout" />
                        退出
                      </Menu.Item>
                  </SubMenu>
                </Menu>
              </div>
            </div>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
            { children }
          </Content>
        </Layout>
      </Layout>
      <Modal
          title="修改密码"
          visible={visible}
          onCancel={hideModal}
          footer={null}
        >
        <Form>
          <FormItem { ...formItemLayout } label="输入旧密码:">
            {
              getFieldDecorator('oldPwd', {
                initialValue: oldPwd,
                rules: [{ required: true, message: '输入旧密码!' }, {validator: (rule, value, callback)=>{ value && value.length < 6 ? callback('密码长度最少6位') : callback()}}],
              })(<Input placeholder="请输入旧密码" onChange={(e)=>changeInput(e, 'oldPwd')}/>)
            }
            
          </FormItem>
          <FormItem { ...formItemLayout } label="输入新密码:">
            {
              getFieldDecorator('newPwd', {
                initialValue: newPwd,
                rules: [{ required: true, message: '输入新密码!' }, {validator: (rule, value, callback)=>{ value && value.length < 6 ? callback('密码长度最少6位') : callback()}}],
              })(<Input placeholder="请输入新密码" onChange={(e)=>changeInput(e, 'newPwd')}/>)
            }
          </FormItem>
          <FormItem { ...formItemLayout } label="重复新密码:">
            {
              getFieldDecorator('newPwdRe', {
                initialValue: newPwdRe,
                rules: [{ required: true, message: '重复新密码!' }, {validator: (rule, value, callback)=>{ value && value !== newPwd ? callback('两次输入密码不一致') : callback()}}],
              })(<Input placeholder="请重复新密码"  onChange={(e)=>changeInput(e, 'newPwdRe')}/>)
            }
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 5 }} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={()=>handleOk()}>
              确定
            </Button>
            <Button type="default" style={{marginLeft: '20px'}} onClick={()=>hideModal()}>
              取消
            </Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}

LayoutIndex.propTypes = {
};


export default connect(({app})=>({app}))(Form.create()(LayoutIndex))
