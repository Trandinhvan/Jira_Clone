import { USER_LOGIN } from "../../util/constants/settingSystem"
import { USLOGIN } from "../constants/JiraType";
import { GET_USER_BY_PROJECT } from "../constants/UserConstants";

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault =  {
    userLogin : usLogin,
    userSearch: [],
    arrUser: []
    // userSearch: [],
    // arrUser:[]//Array user cho thẻ select create task
}

export const UserJiraReducer = (state = stateDefault,action)=>{
  switch(action.type){
    case USLOGIN:{
        state.userLogin = action.userLogin
        return {...state}
    }
    case 'GET_USER_SEARCH':{
        state.userSearch = action.lstUserSearch;
        console.log('state đây ku:',state)
        return {...state}
    }
    case GET_USER_BY_PROJECT:{
        return {...state,arrUser:action.arrUser}
    }
    default: return {...state}
  }
}