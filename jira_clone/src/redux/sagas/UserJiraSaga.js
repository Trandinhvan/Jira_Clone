import Axios from "axios";
import {call, delay, takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import { jiraService } from "../../services/JiraService";
import { projectService } from "../../services/ProjectServices";
import { userService } from "../../services/UserServices";
import { STATUS_CODE, TOKEN, USER_LOGIN } from "../../util/constants/settingSystem";
// import { history } from "../../util/history";   
import { USER_SIGNIN_API, USLOGIN } from "../constants/JiraType";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingType";
import { GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_SAGA } from "../constants/UserConstants";




//quản lý các action saga (là các action dispatch function)
function * signinSaga(action){
    // console.log('action nè',action);
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);

    //Gọi api 
    try{
        const {data,status} = yield call(()=> jiraService.signinJira(action.userLogin)) 
        //lưu vào localstorage khi đăng nhập thành công.
        localStorage.setItem(TOKEN,data.content.accessToken)
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content))

        //sau khi đăng nhập thành công dispatch lên reducer.
        yield put({
            type: USLOGIN,
            userLogin: data.content
        })

        // action.userLogin.history.push('/home')
        let history = yield select(state => state.HistoryReducer.history)
        history.push('/jira')

    }catch(err){
        console.log(err.response.data)
    }

    
    yield put({
        type: HIDE_LOADING
    })
}


export function * theoDoiSignIn(){
    yield takeLatest(USER_SIGNIN_API,signinSaga)
}


export function * getUserSaga(action){

    //Gọi api 
    try{
        const {data,status} = yield call(()=> userService.getUser(action.keyword)) 

        // console.log('data nè hehe: ',data)

        yield put({
            type: 'GET_USER_SEARCH',
            lstUserSearch: data.content
        })
        console.log('data',data)
        // action.userLogin.history.push('/home')
        // let history = yield select(state => state.HistoryReducer.history)
        // history.push('/jira')

    }catch(err){
        console.log(err.response.data)
    }

    
}

export function* theoDoiGetUser(){
    yield takeLatest('GET_USER_API',getUserSaga)
}


//add user project saga
function * addUserProjectSaga(action){
    try{
        const {data,status} = yield call(()=> userService.assignUserProject(action.userProject)) 

        yield put({
            type:'GET_LIST_PROJECTSAGA'
        })
    }catch(err){
        console.log(err.response.data)
    }
}
export function * theoDoiAddUserProject(){
    yield takeLatest('ADD_USER_PROJECT_API',addUserProjectSaga)
}


//REMOVE USER FROM PROJECT
function * removeUserFromProjectSaga (action){

    try{
        const {data,status} = yield call(()=>userService.deleteUserFromProject(action.userProject))
        //SAU KHI LẤY DỮ LIỆU TỪ API VỀ THÀNH CÔNG
        yield put({
            type:"GET_LIST_PROJECTSAGA"
        })
    }catch(err){
        console.log(err)
        
    }
}

export function * theoDoiRemoveUserFromProject(){
    yield takeLatest('REMOVE_USER_FROM_PROJECT',removeUserFromProjectSaga)
}



///GET USER BY PROJECT
function * getUserByProjectIdSaga(action){
    const {idProject} = action
    try{
        const {data,status} = yield call(()=>userService.getUserByProjectId(idProject))
        if(status === STATUS_CODE.SUCCESS){
            console.log('check data: ',data)
            yield put({
                type: GET_USER_BY_PROJECT,
                arrUser:data.content
            })
        }
    }catch(err){
        console.log(err);
        console.log(err.response?.data)
        if(err.response?.data.statusCode === STATUS_CODE.NOT_FOUND){
            yield put({
                type: GET_USER_BY_PROJECT,
                arrUser:[]
            })
        }
    }
}
export function * theoDoiGetUserByProjectIdSaga(){
    yield takeLatest(GET_USER_BY_PROJECT_SAGA,getUserByProjectIdSaga)
}

