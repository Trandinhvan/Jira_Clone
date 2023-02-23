import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Space, Tag } from 'antd'
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux';
//biến đổicác thẻ editor -> jsx
import FormEditProject from '../components/Forms/FormEditProject';
import { message, Popconfirm } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Image, Popover, AutoComplete } from 'antd';
import { NavLink } from 'react-router-dom';


// const confirm = (e) => {
//     console.log(e);
//     message.success('Click on Yes');
// };
// const cancel = (e) => {
//     console.log(e);
//     message.error('Click on No');
// };

export default function ProjectManagement(props) {

    //lấy dữ liệu từ reducer về component
    const projectList = useSelector(state => state.ProjectReducer.projectList)

    //sử dụng useDispatch để gọi action.
    const dispatch = useDispatch();

    const {userSearch} = useSelector(state => state.UserJiraReducer)

    const [value,setValue] = useState('')

    const searchRef = useRef(null)

    useEffect(() => {
        dispatch({
            type: 'GET_LIST_PROJECTSAGA'
        })
    }, [])

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const clearFilters = () => {
        setFilteredInfo({});
    };
    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;

            },
            sortDirections: ['descend']
            // filteredValue: filteredInfo.name || null,
            // onFilter: (value, record) => record.name.includes(value),
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'Project name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text,record,index)=>{
                return <NavLink to={`/projectDetail/${record.id}`}>{text}</NavLink>
            },
            sorter: (item2, item1) => {
                let name1 = item1.projectName?.trim().toLowerCase();
                let name2 = item2.projectName?.trim().toLowerCase();
                if (name2 < name1) {
                    return -1;
                }
                return 1;
            },
            // sortDirections: ['descend']

            // sorter: (a, b) => a.age - b.age,
            // sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'Creator',
            // dataIndex:'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color='green'>{record.creator?.name}</Tag>
            }
        },
        {
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return <Popover key={index} placement='top' title={'members'} content={()=>{
                            return <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members?.map((item,index)=>{
                                       return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td><img src={item.avatar} width='30' height='30' style={{borderRadius:'15px'}} alt=''></img></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button onClick={()=>{
                                                    dispatch({
                                                        type:'REMOVE_USER_FROM_PROJECT',
                                                        userProject: {
                                                            userId: item.userId,
                                                            projectId: record.id
                                                        }
                                                    })
                                                }} className='btn btn-danger' style={{borderRadius:'50%'}}><CloseOutlined /></button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}>
                            <Avatar key={index} src={member.avatar}></Avatar>
                        </Popover> 
                    })}

                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

                    <Popover placement="rightTop" title={'Add user'} content= {()=>{
                        return <AutoComplete  style={{width:'100%'}} 
                        value ={value}
                        onChange= {(text)=>{
                            setValue(text)
                        }}
                        onSelect={(valueSelect,option)=>{
                            // console.log('option: ',option)
                            //set giá trị của hộp thoại bằng option.label
                            setValue(option.label)
                            //gọi Api trả về backend
                            dispatch({
                                type:'ADD_USER_PROJECT_API',
                                userProject: {
                                    projectId: record.id,
                                    userId: valueSelect
                                }
                            })
                        }} options={userSearch?.map((user,index)=>{
                            return {label:user.name, value:user.userId.toString()}
                        })}
                         onSearch={(value)=>{
                            if(searchRef.current){
                                clearTimeout(searchRef.current)
                            }
                            searchRef.current = setTimeout(() => {
                                dispatch({
                                    type:'GET_USER_API',
                                    keyword:value
                                })
                            },300);
                            
                        }}
                         ></AutoComplete>
                    }} trigger="click">
                        <Button>+</Button>
                    </Popover>
                </div>
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => (
                <Space size='middle'>
                    <button className='btn btn-primary mr-2' onClick={() => {
                        const action = {
                            type: 'OPEN_EDIT_PROJECT',
                            title: 'Edit Project',
                            Component: <FormEditProject></FormEditProject>,
                        }
                        //dispatch lên reducer.
                        dispatch(action)
                        console.log('record nè: ', record)
                        //dispatch dữ liệu dòng hiện tại lên reducer để hiển thị lên cái form chỉnh sửa.
                        const actionEditProject = {
                            type: 'EDIT_PROJECT',
                            // title:'EDIT FORM',
                            projectEditModel: record,
                        }
                        dispatch(actionEditProject)
                    }}><FormOutlined /></button>

                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: 'DELETE_PROJECT_SAGA',
                                idProject: record.id
                            })
                        }}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button onClick={() => {
                            console.log('action id: ', record.id)

                        }} className='btn btn-danger'><DeleteOutlined /></button>
                    </Popconfirm>

                </Space>
            )
        }

    ];



    return (
        <div className='container-fluid mt-5'>
            <h3>Project Management</h3>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table rowKey={'id'} columns={columns} dataSource={projectList} onChange={handleChange} />
        </div>
    )
}
