import { Button } from 'antd'
import React from 'react'
import { Prompt } from 'react-router-dom'
import { Input } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined,TwitterOutlined } from '@ant-design/icons';

//lấy dữ liệu form formik
import {withFormik, Form} from 'formik'

//validation yup
import * as Yup from 'yup';

import {connect} from 'react-redux'
import { USER_SIGNIN_API } from '../../redux/constants/JiraType';
import { singinJiraAction } from '../../redux/actions/JiraAction';


export function Login(props) {

  console.log(props)

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit} className='container' style={{height:window.innerHeight}}>
      <div className='d-flex flex-column justify-content-center align-items-center' style={{height:window.innerHeight}}>
        <h3 className='text-center'>LOGIN JIRA</h3>
        <div className='d-flex mt-3'>
          <Input onChange={handleChange} name='email' style={{width:'100%',minWidth:'300px'}} size="large" placeholder="email" prefix={<UserOutlined />} />
        </div>
        <div className='text-danger'>{errors.email}</div>
        <div className='d-flex mt-3'>
          <Input onChange={handleChange} type='password' name='password' style={{width:'100%',minWidth:'300px'}} size="large" placeholder="password" prefix={<LockOutlined />} />
        </div>
        <div className='text-danger'>{errors.password}</div>
        <div className='d-flex'>
          <Button htmlType='submit' size='large' style={{width:"100%",minWidth:'300px',backgroundColor:'rgb(102,117,223)',color:'#fff'}} className='mt-3'>Login</Button>
        </div>
        <div className='social mt-3'>
          <Button shape='circle' size='large' type='primary' icon={
            <FacebookOutlined />
          }>
          </Button>
          <Button className='ml-3' shape='circle' size='large' type='primary' icon={
            <TwitterOutlined />
          }>
          </Button>
        </div>
      </div>
      

    </form>
  )
}

const LoginWithFormik = withFormik({
  mapPropsToValues: () => ({
      email:'',
      password:''
  }),

  //validationSchema:
  validationSchema: Yup.object().shape({
    email: Yup.string().required('Email is required!').email('Email is invalid!'),
    password: Yup.string().min(6,'Password must have min 6 character').max(32,'Password have max 32 character')
  }),

  //đã bị bỏ
  // handleChange: e =>{
  //   console.log(e)
  // },

  handleSubmit: ({email,password}, { props,setSubmitting }) => {

    // let action = {
    //   type: USER_SIGNIN_API,
    //   userLogin: {
    //     email: values.email,
    //     password: values.password
    //   }
    // }
    setSubmitting(true)
    props.dispatch(singinJiraAction(email,password)) //,props.history

    // console.log(values)
    // console.log('props nè',props)
  },

  displayName: 'Login Jira',
})(Login);


export default connect()(LoginWithFormik)

