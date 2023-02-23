import { Editor } from '@tinymce/tinymce-react'
import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_PRIORITY_SAGA } from '../../../redux/constants/PriorityConstants'
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/StatusConstants'
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA } from '../../../redux/constants/TaskConstants'
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/TaskTypeConstants'

export default function ModealJira(props) {

    const dispatch = useDispatch()
    const { taskDetailModal } = useSelector(state => state.TaskReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const { projectDetail } = useSelector(state => state.ProjectJiraReducer)

    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);

    const [visibleEditor, setVisibleEditor] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        dispatch({
            type:HANDLE_CHANGE_POST_API_SAGA,
            actionType:CHANGE_TASK_MODAL,
            name,
            value
        })
        
        // dispatch({
        //     type: CHANGE_TASK_MODAL,
        //     name,
        //     value
        // })
    }

    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div style={{ display: 'flex' }}>
            <i className="fa fa-clock" />
            <div style={{ width: '100%' }}>

                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                    <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                </div>

                {/*  */}
                <div className='row'>
                    <div className="col-6">
                        <input className='form-control' name='timeTrackingSpent' onChange={handleChange}></input>
                    </div>
                    <div className='col-6' style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <input className='form-control' name='timeTrackingRemaining' onChange={handleChange}></input>
                    </div>
                </div>

            </div>
        </div>
    }

    console.log('taskDetailModel:', taskDetailModal)
    // console.log('priority:', arrPriority)



    useEffect(() => {
        dispatch({
            type: GET_ALL_STATUS_SAGA
        })
        dispatch({
            type: GET_PRIORITY_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
    }, [])

    const renderDescription = () => {
        return <div>
            {visibleEditor ? <div>
                <Editor name='description'
                    // onInit={(evt, editor) => editorRef.current = editor}
                    // initialValue={''}
                    // value={''}
                    initialValue={taskDetailModal.description}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                            'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
                            'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                            'alignleft aligncenter alignright alignjustify | ' +
                            'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content, editor) => {
                        console.log('Content was updated: ', content)
                        //setFieldValue('description', content)
                        setContent(content)
                    }}
                />
                <button className='btn btn-success mt-2' onClick={() => {
                    // dispatch({
                    //     type: CHANGE_TASK_MODAL,
                    //     name: 'description',
                    //     value: content
                    // })

                    dispatch({
                        type:HANDLE_CHANGE_POST_API_SAGA,
                        actionType:CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })

                    setVisibleEditor(false)
                }}>Save</button>
                <button onClick={() => {
                    // dispatch({
                    //     type: CHANGE_TASK_MODAL,
                    //     name: 'description',
                    //     value: historyContent
                    // })
                    dispatch({
                        type:HANDLE_CHANGE_POST_API_SAGA,
                        actionType:CHANGE_TASK_MODAL,
                        name: 'description',
                        value: historyContent
                    })
                    setVisibleEditor(false)
                }} style={{ marginLeft: '30px' }} className='btn btn-primary mt-2'>Close</button>
            </div> :

                <div onClick={() => {

                    setHistoryContent(taskDetailModal.description);
                    setVisibleEditor(!visibleEditor);

                }}>{taskDetailModal.description}</div>
            }


        </div>

    }


    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <select name='typeId' value={taskDetailModal.typeId} onChange={handleChange}>
                                {arrTaskType.map((tp, index) => {
                                    return <option key={index} value={tp.id}>{tp.taskType}</option>
                                })}
                            </select>
                            <span>{taskDetailModal.taskName}</span>
                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt = ''" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p>Description</p>
                                        <p>
                                            {renderDescription()}
                                        </p>
                                    </div>
                                    <div style={{ fontWeight: 500, marginBottom: 10 }}>
                                        Jira Software (software projects) issue types:
                                    </div>
                                    {/* <div className="title">
                                        <div className="title-item">
                                            <h3>BUG <i className="fa fa-bug" /></h3>
                                            <p>
                                                A bug is a problem which impairs or prevents the
                                                function of a product.
                                            </p>
                                        </div>
                                        <div className="title-item">
                                            <h3>STORY <i className="fa fa-book-reader" /></h3>
                                            <p>
                                                A user story is the smallest unit of work that needs to
                                                be done.
                                            </p>
                                        </div>
                                        <div className="title-item">
                                            <h3>TASK <i className="fa fa-tasks" /></h3>
                                            <p>A task represents work that needs to be done</p>
                                        </div>
                                    </div> */}
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='' />
                                            </div>
                                            <div className="input-comment">
                                                <input type="text" placeholder="Add a comment ..." />
                                                <p>
                                                    <span style={{ fontWeight: 500, color: 'gray' }}>Protip:</span>
                                                    <span>press
                                                        <span style={{ fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6' }}>M</span>
                                                        to comment</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                <div className="display-comment" style={{ display: 'flex' }}>
                                                    <div className="avatar">
                                                        <img src={require("../../../assets/img/download (1).jfif")} alt='' />
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lord Gaben <span>a month ago</span>
                                                        </p>
                                                        <p style={{ marginBottom: 5 }}>
                                                            Lorem ipsum dolor sit amet, consectetur
                                                            adipisicing elit. Repellendus tempora ex
                                                            voluptatum saepe ab officiis alias totam ad
                                                            accusamus molestiae?
                                                        </p>
                                                        <div>
                                                            <span style={{ color: '#929398' }}>Edit</span>
                                                            •
                                                            <span style={{ color: '#929398' }}>Delete</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name='statusId' className="custom-select" value={taskDetailModal.statusId} onChange={(e)=>{
                                            
                                            
                                            handleChange(e)

                                            // const action = {
                                            //     type:UPDATE_STATUS_TASK_SAGA,
                                            //     taskUpdateStatus: {
                                            //         taskId:taskDetailModal.taskId,
                                            //         statusId:e.target.value,
                                            //         projectId:taskDetailModal.projectId
                                                    
                                            //     }
                                            // }

                                            // // // console.log('action',action);
                                            // console.log('taskupdatestatus',{
                                            //     taskId:taskDetailModal.taskId,
                                            //     statusId:e.target.value
                                            // })

                                            // dispatch(action)
                                        }}>
                                            {arrStatus.map((item, index) => {
                                                return <option key={index} value={item.statusId}>
                                                    {item.statusName}
                                                </option>

                                            })}
                                        </select>
                                        
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className='row'>
                                            {
                                                taskDetailModal.assigness?.map((user, index) => {
                                                    return <div className='col-6 mt-2 mb-2'>
                                                        <div key={index} style={{ display: 'flex' }} className="item">
                                                            <div className="avatar">
                                                                <img src={user.avatar} alt='' />
                                                            </div>
                                                            <p className="name">
                                                                {user.name}
                                                                <button  style={{ marginLeft: 5, border:'none'}} onClick={()=>{
                                                                    dispatch({
                                                                        type:HANDLE_CHANGE_POST_API_SAGA,
                                                                        actionType: REMOVE_USER_ASSIGN,
                                                                        userId: user.id
                                                                    })
                                                                    // dispatch({
                                                                    //     type:REMOVE_USER_ASSIGN,
                                                                    //     userId: user.id
                                                                    // })
                                                                }}>
                                                                <i className="fa fa-times" />

                                                                </button>
                                                            </p>
                                                        </div>
                                                    </div>

                                                })
                                            }


                                            <div className='col-6'>
                                                {/* <select style={{ width: 'auto' }} name='lstUser' onChange={(e) => {
                                                    const { value } = e.target
                                                    if (value == '0') {
                                                        return
                                                    }
                                                    let userSelect = projectDetail.members.find(mem => mem.userId == value)
                                                    // console.log('user value: ',value)
                                                    // console.log('user select: ',userSelect)
                                                    //thêm 1 thuộc tính id.
                                                    userSelect = { ...userSelect, id: userSelect.userId }
                                                    dispatch({
                                                        type: CHANGE_ASSIGNESS,
                                                        userSelect
                                                    })
                                                }}>
                                                    <option value='0' selected>Select user assign</option>
                                                    {projectDetail.members?.filter(mem => {
                                                        let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId)
                                                        if (index !== -1) {
                                                            return false
                                                        }
                                                        return true
                                                    }).map((mem, index) => {
                                                        return <option className='form-control' key={index} value={mem.userId}>{mem.name}</option>
                                                    })}
                                                </select> */}
                                                <Select
                                            showSearch
                                            style={{
                                                width: '100%',
                                            }}
                                            value='+ Add more'
                                            placeholder="Search to Select"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            optionFilterProp= 'label'
                                            onSelect= {(value)=>{
                                                    if (value == '0') {
                                                        return
                                                    }
                                                    let userSelect = projectDetail.members.find(mem => mem.userId == value)
                                                    // console.log('user value: ',value)
                                                    // console.log('user select: ',userSelect)
                                                    //thêm 1 thuộc tính id.
                                                    userSelect = { ...userSelect, id: userSelect.userId }
                                                    // dispatch({
                                                    //     type: CHANGE_ASSIGNESS,
                                                    //     userSelect
                                                    // })
                                                    dispatch({
                                                        type:HANDLE_CHANGE_POST_API_SAGA,
                                                        actionType:CHANGE_ASSIGNESS,
                                                        userSelect
                                                    })
                                            }}
                                            options={projectDetail.members?.filter(mem => {
                                                let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId)
                                                if (index !== -1) {
                                                    return false
                                                }
                                                return true
                                            }).map((mem, index) => {
                                                return {value:mem.userId,label:mem.name}
                                            })}
                                        />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority mt-3" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name="priorityId" className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                                            handleChange(e);
                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index}>
                                                    {item.priority}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name='originalEstimate' type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                                            handleChange(e)
                                        }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}

                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
