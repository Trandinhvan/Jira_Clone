import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react';
import { Radio, Select, Slider } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { GET_ALL_PROJECT_SAGA } from '../../redux/constants/ProjectJiraConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../redux/constants/TaskTypeConstants';
import { GET_PRIORITY_SAGA } from '../../redux/constants/PriorityConstants';
import { validateYupSchema, withFormik } from 'formik'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import { GET_ALL_STATUS_SAGA } from '../../redux/constants/StatusConstants';
import { GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_SAGA } from '../../redux/constants/UserConstants';






const handleChangeSelect = (value) => {
    console.log(`Selected: ${value}`);
};

function FormCreateTask(props) {


    //lấy arrproject từ thằng projectreducer.
    const {arrProject} = useSelector(state => state.ProjectReducer)
    const {arrTaskType} = useSelector(state => state.TaskTypeReducer)
    const {arrPriority} = useSelector(state=>state.PriorityReducer)
    const {arrUser} = useSelector(state=>state.UserJiraReducer)
    const {arrStatus} = useSelector(state=>state.StatusReducer)

    //biến đổi option cho thẻ select
    const userOption = arrUser.map((user,index)=>{
        return {value:user.userId,label:user.name}
    })


    const dispatch = useDispatch()

    const [timeTracking,setTimeTracking] = useState({
        timeTrackingSpent:0,
        timeTrackingRemaining:0
    })

    useEffect(()=>{
        dispatch({
            type:GET_ALL_PROJECT_SAGA
        })
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA
        })
        dispatch({
            type: GET_PRIORITY_SAGA
        })
        dispatch({
            type:'GET_USER_API',
            keyword:'',
        })

        dispatch({
            type:GET_ALL_STATUS_SAGA
        })

        //đưa hàm handle submit lên drawerreducer để cập nahatj lại sk của nút submit.
        dispatch({
            type:'SET_SUBMIT_CREATE_TASK',
            submitFunction:handleSubmit
        })

    console.log('arrUser:',arrUser)

    },[])

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props

    

    const [size, setSize] = useState('middle');
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>Project</p>
                <select name='projectId'  onChange={(e)=>{

                    //dispatch giá trị làm thay đổi user
                    let {value} = e.target
                    dispatch({
                        type:GET_USER_BY_PROJECT_SAGA,
                        idProject:value
                    })

                    //cập nhật giá trị cho project id.
                    setFieldValue('projectId',e.target.value)
                }} className='form-control'>
                    {arrProject.map((project,index)=>{
                        return <option value={project.id} key={index}>
                            {project.projectName}
                        </option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p>Task name</p>
                <input name='taskName' onChange={handleChange} className='form-control'></input>
            </div>
            <div className='form-group'>
                <p>Status</p>
                <select name='statusId' className='form-control' onChange={handleChange}>
                    {arrStatus.map((item,index)=>{
                        return <option key={index} value={item.statusId}>
                            {item.statusName}
                        </option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>priority</p>
                        <select name='priorityId' className='form-control' onChange={handleChange}>
                            {arrPriority.map((priority,index)=>{
                                return (
                                    <option key={index} value={priority.priorityId}>
                                        {priority.priority}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select className='form-control' name='typeId' onChange={handleChange}>
                            {arrTaskType.map((task,index)=>{
                                return <option key={index} value={task.id}>
                                    {task.taskType}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            placeholder="Please select"
                            // onChange={handleChangeSelect}
                            onChange={(values)=>{
                                //set lại giá trị cho listUserAsign
                                setFieldValue('listUserAsign',values)
                            }}
                            optionFilterProp='label'
                            onSelect={(value)=>{
                               console.log('value:',value)
                            }}
                            style={{
                                width: '100%',
                            }}
                            options={userOption}
                        />
                        <div className='row'>
                            <div className='col-12'>
                                <p>original Estimate</p>
                                <input onChange={handleChange} type='number' min='0' name='originalEstimate' defaultValue='0'></input>
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <p>Time tracking</p>
                        <Slider
                            defaultValue={30}
                            max={Number(timeTracking.timeTrackingSpent)+Number(timeTracking.timeTrackingRemaining)}
                            value={timeTracking.timeTrackingSpent}
                            tooltip={{
                                open: true,
                            }}
                        />
                        <div className='row'>
                            <div className='col-6 text-left'>
                                {timeTracking.timeTrackingSpent}h logged
                            </div>
                            <div className='col-6 text-right'>
                                {timeTracking.timeTrackingRemaining}h remaining
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <p>Time spent</p>
                                <input onChange={(e)=>{
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent:e.target.value
                                    })
                                    setFieldValue('timeTrackingSpent',e.target.value)
                                }} type='number' defaultValue='0' min='0' name='timeTrackingSpent' className='form-control'></input>
                            </div>
                            <div className='col-6'>
                                <p>Time remaining</p>
                                <input onChange={(e)=>{
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining:e.target.value
                                    })
                                    setFieldValue('timeTrackingRemaining',e.target.value)
                                }} type='number' defaultValue='0' min='0' name='timeTrackingRemaining' className='form-control'></input>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='form-group'>
                <p>Description</p>
                <Editor name='description'
                    // onInit={(evt, editor) => editorRef.current = editor}
                    // initialValue={''}
                    // value={''}
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
                        setFieldValue('description', content)
                    }}
                />
            </div>
            <button type='submit'>submit đi</button>
        </form>
    )
}


const createTaskForm = withFormik({
    enableReinitialize: true, //mỗi lần props của redux thay đổi lập tức binding lại giá trị của obj mapprospvalues.
    mapPropsToValues: (props) =>{

        const {arrProject,arrTaskType,arrPriority,arrStatus} = props
        // console.log(arrPriority)
        // if(arrProject.length > 0){
        //     props.dispatch({
        //         type:GET_USER_BY_PROJECT_SAGA,
        //         idProject: arrProject[0]?.id
        //     })
        // }
       
        return {
            taskName: '',
            description:'',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining:0,
            projectId:arrProject[0]?.id,
            typeId:arrTaskType[0]?.id,
            priorityId:arrPriority[0]?.priorityId,
            listUserAsign:[]
        }
    },
  
    validateYupSchema: Yup.object().shape({
  
    }),
  
    handleSubmit: (values, { props,setSubmitting }) => {
    console.log('values nè bạn oiw!!',values)
        props.dispatch({
            type:'CREATE_TASK_SAGA',
            taskObject: values
        })
    },
    displayName: 'CreateTaskForm'
  })(FormCreateTask)
  

  const mapStateToProps = (state) =>({
    arrProject: state.ProjectReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus
  })



  export default connect(mapStateToProps)(createTaskForm)
  
