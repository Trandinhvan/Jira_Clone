import { call, put, select, takeLatest } from "redux-saga/effects"
import { taskService } from "../../services/TaskService"
import { STATUS_CODE } from "../../util/constants/settingSystem"
import { notifiFunction } from "../../util/Notification/NontificationJira"
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, GET_TASK_DETAIL_SAGA, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATESTATUSTASKSAGA, UPDATE_STATUS_TASK_SAGA, UPDATE_TASK_SAGA } from '../constants/TaskConstants'


function* createTaskSaga(action) {
    try {
        const { data, status } = yield call(() => taskService.createTask(action.taskObject))
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success', 'create task successfuly!')
            yield put({
                type: 'CLOSE_DRAWER'
            })
            
        } else {
            notifiFunction('error', 'create task fail!')

        }

    } catch (err) {
        notifiFunction('error', 'create task fail!')
    }
}
export function* theoDoiCreateTaskSaga() {
    yield takeLatest('CREATE_TASK_SAGA', createTaskSaga)
}

//get taskdetail
function* getTaskDetailSaga(action) {
    const { taskId } = action;
    try {
        const { data, status } = yield call(() => taskService.getTaskDetail(taskId))
        yield put({
            type: GET_TASK_DETAIL,
            data: data.content
        })
    } catch (err) {
        console.log(err)
        console.log(err.response.data)
    }
}
export function* theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga)
}


//update task status
// function * updateTaskStatusSaga(action){
//     const {taskStatusUpdate} = action;
//     try{
//         const {data,status} = yield call(taskService.updateStatusTask(taskStatusUpdate))
//         console.log('dta:',data)
//         if(status===STATUS_CODE.SUCCESS) {
//             yield put({
//                 type:'GET_PROJECT_DETAIL',
//                 projectId:taskStatusUpdate.projectId
//             })

//             // yield put({
//             //     type:GET_TASK_DETAIL_SAGA,
//             //     taskId:taskStatusUpdate.taskId
//             // })
//         }
//     }catch(err){
//         // console.log(err)
//         console.log(err.response?.data);
//     }
// }
// export function * theoDoiUpdateTaskStatusSaga(){
//     yield takeLatest(UPDATE_STATUS_TASK_SAGA,updateTaskStatusSaga)
// }

function* updateTaskStatusSaga(action) {

    const { taskUpdateStatus } = action;
    console.log(action)
    try {

        //Cập nhật api status cho task hiện tại (Task đang mở modal)
        const { data, status } = yield call(() => taskService.updateStatusTask(taskUpdateStatus));

        //Sau khi thành công gọi lại getProjectDetail saga để sắp xếp lại thông tin các task 
        // console.log(data)
        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_PROJECT_DETAIL',
                projectId: taskUpdateStatus.projectId
            })

            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateStatus.taskId
            })
        }



    } catch (err) {
        console.log(err);
        console.log(err.response?.data);

    }
}

export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga)
}


//update task
function* updateTaskSaga(action) {
   
}

export function* theoDoiUpdateTask() {
    yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga)
}


export function* handleChangePostApi(action) {
    //Gọi action làm thay đổi task detail modal.
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const {value,name} = action
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value
            });break;
        }
        case CHANGE_ASSIGNESS:{
            const {userSelect} = action
            yield put({
                type:CHANGE_ASSIGNESS,
                userSelect
            });break;
        }
        case REMOVE_USER_ASSIGN:{
            const {userId} = action
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId
            });break
        }
    }
    //sau khi thay đổi mấy cái select editor, mới thực hiện cái dưới nayf.
    //Save qua api updateTaskSaga
    //lấy dữ liệu từ state.taskDetailModal
    let { taskDetailModal } = yield select(state => state.TaskReducer);
    // console.log('task detail modal sau khi thay đổi: ',taskDetailModal)

    //biến đổi dl state.taskDetailModal thành dl api cần
    const listUserAsign = taskDetailModal.assigness?.map((user,index)=>{
        return user.id
    })
    // console.log('list user Asign',listUserAsign)
    const taskUpdateApi = {...taskDetailModal,listUserAsign}
    // console.log('taskModel detail: ',taskDetailModal)

    //gọi api đưa dl lên
    try{
        const {data,status} = yield call(()=>taskService.updateTask(taskUpdateApi))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: 'GET_PROJECT_DETAIL',
                projectId: taskUpdateApi.projectId
            })
    
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId
            })
        }
    }catch(err){
        console.log(err)
        console.log(err.response?.data)
    }
    
}
export function* theoDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi)
}