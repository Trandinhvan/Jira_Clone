import { call, takeLatest,put, delay,select } from "redux-saga/effects";
import { jiraService } from "../../services/JiraService";
import {STATUS_CODE} from '../../util/constants/settingSystem'
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingType";
//import {history} from '../../util/history'
import { projectService } from "../../services/ProjectServices";
import { notifiFunction } from "../../util/Notification/NontificationJira";
import {GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA} from '../constants/ProjectJiraConstants'
import { GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_SAGA } from "../constants/UserConstants";

function* createProjectSaga(action) {
    // console.log('actionSaga', action);
    // hiển thị loading.
    yield put({
        type:DISPLAY_LOADING
    })
    yield delay(500);
    try {

        //Gọi api lấy dữ liệu về
        // const { data, status } = yield call(() => jiraService.createProject(action.newProject));
        const { data, status } = yield call(() => jiraService.createProjectAuthorization(action.newProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)
            let history = yield select(state => state.HistoryReducer.history)
            history.push('/projectManagement')
        }


    } catch (err) {
        console.log(err);
    }
    yield put({
        type: HIDE_LOADING
    })

}





export function* theodoiCreateProject() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}




function * getListProjectSaga(action){
    try{    
        const {data,status} = yield call(()=>jiraService.getListProject())
        //SAU KHI LẤY DỮ LIỆU TỪ API VỀ THÀNH CÔNG
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type:'GET_LIST_PROJECT',
                projectList: data.content
            })
        }
    }catch(err){
        console.log(err)
    }
}

// ----SAGA dùng để get all project từ api
export function* theodoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECTSAGA', getListProjectSaga);
}


function * updateProjectSaga (action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try{
        const {data,status} = yield call(()=>jiraService.updateProject(action.projectUpdate))
        //SAU KHI LẤY DỮ LIỆU TỪ API VỀ THÀNH CÔNG
        if(status === STATUS_CODE.SUCCESS){
           console.log(data)
           //thành công thi gọi lại getall để nó tự load lại 
        //    yield put({
        //     type: 'GET_LIST_PROJECTSAGA'
        //    })
            yield call(getListProjectSaga)
           //tắt cái drawer.
           yield put({
             type: 'CLOSE_DRAWER'
           })
        }
    }catch(err){
        console.log(err)
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiUpdateProject(){
    yield takeLatest('UPDATE_PROJECTSAGA',updateProjectSaga)
}


// DELETE PROJECT SAGA

function * deleteProjectSaga (action){
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try{
        const {data,status} = yield call(()=>projectService.deleteProject(action.idProject))
        //SAU KHI LẤY DỮ LIỆU TỪ API VỀ THÀNH CÔNG
        if(status === STATUS_CODE.SUCCESS){
           console.log(data)
           //thành công thi gọi lại getall để nó tự load lại 
        //    yield put({
        //     type: 'GET_LIST_PROJECTSAGA'
        //    })
            notifiFunction('success','delete project successfuly!')
            yield call(getListProjectSaga)
           //tắt cái drawer.
           yield put({
             type: 'CLOSE_DRAWER'
           })
        }else{
        notifiFunction('error','delete project fail!')

        }
    }catch(err){
        console.log(err)
        notifiFunction('error','delete project fail!')
        
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function * theoDoiDeleteProject(){
    yield takeLatest('DELETE_PROJECT_SAGA',deleteProjectSaga)
}

//GET PROJECT DETAIL SAGA
function * getProjectDetailSaga (action){
    // yield put({
    //     type: DISPLAY_LOADING
    // })
    // yield delay(500)
    try{
        const {data,status} = yield call(()=>projectService.getProjectDetail(action.projectId))
        //lấy dl thành công thì đưa dl lên redux
        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content
        })

    }catch(err){
        console.log('404 NOT FOUND!!!')
        //history.push('/projectManagement')
        let history = yield select(state => state.HistoryReducer.history)
        history.push('/projectManagement')
    }

    // yield put({
    //     type: HIDE_LOADING
    // })
}

export function * theoDoiGetProjectDetail(){
    yield takeLatest('GET_PROJECT_DETAIL',getProjectDetailSaga)
}

// GET ALL PROJECT 
function * getAllProjectSaga (action){

    try{
        const {data,status} = yield call(()=>projectService.getAllProject())

        //SAU KHI LẤY DỮ LIỆU TỪ API VỀ THÀNH CÔNG
        yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })
        yield put({
            type:GET_USER_BY_PROJECT_SAGA,
            idProject:data.content[0].id
        })
    }catch(err){
        console.log(err)
        
    }
}

export function * theoDoiGetAllProject(){
    yield takeLatest(GET_ALL_PROJECT_SAGA,getAllProjectSaga)
}