import { GET_ALL_TASK_TYPE } from "../constants/TaskTypeConstants"

const stateDefault = {
    arrTaskType: []
}

export const TaskTypeReducer = (state = stateDefault,action)=>{
    switch(action.type){
        case GET_ALL_TASK_TYPE:{
            return {...state,arrTaskType: action.taskType}
        }
        default: return {...state}
    }
}