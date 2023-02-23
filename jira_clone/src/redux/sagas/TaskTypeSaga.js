import { call, put, takeLatest } from "redux-saga/effects";
import { taskTypeService } from "../../services/TaskTypeService";
import {GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA} from '../constants/TaskTypeConstants'

function * getAllTaskTypeSaga(action){
    try{
        const {data,status} = yield call(()=>taskTypeService.getTaskType())
        console.log('this is the data: ',data.content)
        yield put({
            type: GET_ALL_TASK_TYPE,
            taskType: data.content
        })
    }catch(err){
        console.log(err)
    }
}
export function * theoDoigetAllTaskType(){
    yield takeLatest(GET_ALL_TASK_TYPE_SAGA,getAllTaskTypeSaga)
}