import { call, put, takeLatest } from "redux-saga/effects"
import { priorityServices } from "../../services/PriorityService";
import {GET_PRIORITY, GET_PRIORITY_SAGA} from '../constants/PriorityConstants'

function * getPriority(action){
    try{
        const {data,status} = yield call(()=>priorityServices.getPriority())
        yield put({
            type:GET_PRIORITY,
            priority: data.content
        })
    }catch(err){
        console.log(err)
    }
}
export function * theoDoiGetPriority(){
    yield takeLatest(GET_PRIORITY_SAGA,getPriority)
}