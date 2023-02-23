import React, { useEffect } from 'react'
import ContentMain from '../components/Jira/Main/ContentMain'
import HeaderMain from '../components/Jira/Main/HeaderMain'
import InforMain from '../components/Jira/Main/InforMain'
import { useSelector, useDispatch } from 'react-redux'

export default function ProjectDetail(props) {

    // console.log(props.match.params.projectId)
    const {projectDetail} = useSelector(state => state.ProjectJiraReducer)
    
    console.log('project detail: ',projectDetail)

    const dispatch = useDispatch()


    useEffect(()=>{
        //khi người dùng link qua trang này bằng thẻ navlink hoặc người dùng tự gỏ url ta sẽ lấy tham số từ url => gọi saga.
        const {projectId} = props.match.params;
        dispatch({
            type: 'GET_PROJECT_DETAIL',
            projectId
        })
    },[])


    return (
    <div className='main'>
    <HeaderMain></HeaderMain>
    <InforMain projectDetail={projectDetail}></InforMain>
    <ContentMain  projectDetail={projectDetail}></ContentMain>

  </div>
  )
}
