import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarsOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import FormCreateTask from '../Forms/FormCreateTask';

const { Header, Sider, Content } = Layout;

export default function SidebarJira() {

    const dispatch = useDispatch()

    const [state, setState] = useState({
        collapsed:false,
    });
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const toggle = ()=>{
        setState({
            collapsed: !state.collapsed
        })
    }

    return (
        <Layout>

        <Sider trigger={null} collapsible collapsed={state.collapsed} style={{height:'100%'}}>
        <div className='text-right pr-2' onClick={toggle}><BarsOutlined style={{color:'#fff',cursor:'pointer',fontSize:'20px'}} /></div>        

          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <PlusOutlined onClick={()=>{
                    dispatch({
                      type:'OPEN_FORM_CREATE_TASK',
                      title: 'Create task',
                      Component: <FormCreateTask></FormCreateTask>
                    })
                }} style={{fontSize:'20px'}} />,
                label: 'Create Task',
              },
              {
                key: '2',
                icon: <SearchOutlined style={{fontSize:'20px'}} />,
                label: 'Search',
              },
    
            ]}
          />
        </Sider>
      </Layout>
    )
}
