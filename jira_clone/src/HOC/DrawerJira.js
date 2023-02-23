import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
const { Option } = Select;

export default function DrawerJira(props) {
    // const [open, setOpen] = useState(false);
    const {open,ComponentContentDrawer,callBackSubmit,title} = useSelector(state => state.DrawerJiraReducer);

    const dispatch = useDispatch()

    const showDrawer = () => {
        dispatch({
          type: 'OPEN_DRAWER',
          // open: true
        })
  };
  const onClose = () => {
        dispatch({
          type: 'CLOSE_DRAWER',
          // open: false
        })
  };
  return (
    <>
    {/* <button onClick={showDrawer}>showw</button> */}
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        footer={
          <div style={{textAlign:'right'}}>
            <Button onClick={onClose} className='mr-2'>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {/* nội dung thay đổi của drawer */}
        {ComponentContentDrawer}
      </Drawer>
    </>
  )
}
