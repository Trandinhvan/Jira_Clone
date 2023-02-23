import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../../redux/constants/TaskConstants'

export default function ContentMain(props) {

    const {projectDetail} = props
    const dispatch = useDispatch()

    const handleDragEnd =(result)=>{
        console.log(result)
        let{projectId,taskId} =JSON.parse(result.draggableId); //lấy ra chuỗi sau mỗi lầy draggable
        let {source, destination} = result
        if(!result.destination){
            return
        }
        //kéo thả ngay chỗ của nó
        if(source.index === destination.index && source.droppableId === destination.droppableId){
            return 
        }

        //gọi api cập nahatj lại status
        dispatch({
            type:UPDATE_STATUS_TASK_SAGA,
            taskUpdateStatus: {
                "taskId": taskId,
                "statusId": destination.droppableId,
                "projectId":projectId
            }
        })
    }

    const renderCardTaskList = () =>{
        return <DragDropContext onDragEnd={handleDragEnd}>
            {
                 projectDetail.lstTask?.map((taskListDetail,index)=>{
                    return <Droppable key={index} droppableId={taskListDetail.statusId}>
                        {(provided)=>{
                            return <div className="card" style={{ width: '17rem', height: 'auto' }}>
                            <div className="card-header">
                                {taskListDetail.statusName}
                            </div>
                            <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            key={index}
                             className="list-group list-group-flush">
                                {taskListDetail.lstTaskDeTail.map((task,index)=>{
                                    return  <Draggable key={task.taskId.toString()} index={index} draggableId={JSON.stringify({projectId:task.projectId,taskId:task.taskId})}>
                                        {(provided)=>{
                                            return <div 
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            key={index}
                                             onClick={()=>{
                                                dispatch({
                                                    type:GET_TASK_DETAIL_SAGA,
                                                    taskId:task.taskId
                                                })
                                            }}   className="list-group-item pb-2"  data-toggle="modal" data-target="#infoModal">
                                                <p className='font-weight-bold'>{task.taskName}</p>
                                                <div className="block" style={{ display: 'flex' }}>
                                                    <div className="block-left">
                                                        <p className='text-success'>{task.priorityTask.priority}</p>
                                                        {/* <i className="fa fa-bookmark" />
                                                        <i className="fa fa-arrow-up" /> */}
                                                    </div>
                                                    <div className='block-right'>
                                                        <div className="avatar-group" style={{ display: 'flex' }}>
                                                            {task.assigness.map((member,index)=>{
                                                                return <div key={index} className="avatar">
                                                                            <img src={member.avatar} alt='1' />
                                                                    </div>
                                                            })}
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        }}
                                    </Draggable>
                                })}
                              
                            </div>
                            {provided.placeholder}

                        </div>
                        }}
                        
                    </Droppable>
                    
                })
            }
        </DragDropContext>
        
    }

  return (
      <div className="content" style={{ display: 'flex' }}>
          {renderCardTaskList()}
      </div>

  )
}




// 
// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { GET_TASK_DETAIL_SAGA } from '../../../redux/constants/TaskConstants'

// export default function ContentMain(props) {

//     const {projectDetail} = props
//     const dispatch = useDispatch()

//     const renderCardTaskList = () =>{
//         return projectDetail.lstTask?.map((taskListDetail,index)=>{
//             return <div key={index} className="card" style={{ width: '17rem', height: 'auto' }}>
//             <div className="card-header">
//                 {taskListDetail.statusName}
//             </div>
//             <ul className="list-group list-group-flush">
//                 {taskListDetail.lstTaskDeTail.map((task,index)=>{
//                     return  <li onClick={()=>{
//                         dispatch({
//                             type:GET_TASK_DETAIL_SAGA,
//                             taskId:task.taskId
//                         })
//                     }}  key={index} className="list-group-item pb-2" data-toggle="modal" data-target="#infoModal" style={{ cursor: 'pointer' }}>
//                         <p className='font-weight-bold'>{task.taskName}</p>
//                         <div className="block" style={{ display: 'flex' }}>
//                             <div className="block-left">
//                                 <p className='text-success'>{task.priorityTask.priority}</p>
//                                 {/* <i className="fa fa-bookmark" />
//                                 <i className="fa fa-arrow-up" /> */}
//                             </div>
//                             <div className='block-right'>
//                                 <div className="avatar-group" style={{ display: 'flex' }}>
//                                     {task.assigness.map((member,index)=>{
//                                         return <div key={index} className="avatar">
//                                                     <img src={member.avatar} alt='1' />
//                                             </div>
//                                     })}
//                                     </div>
//                                 </div>
//                         </div>
//                     </li>
//                 })}
              
//             </ul>
//         </div>
//         })
//     }

//   return (
//       <div className="content" style={{ display: 'flex' }}>
//           {renderCardTaskList()}
//       </div>

//   )
// }




