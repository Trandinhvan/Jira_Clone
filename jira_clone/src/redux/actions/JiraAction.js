import { USER_SIGNIN_API } from "../constants/JiraType";

export const singinJiraAction = (email,password) => ({
  type: USER_SIGNIN_API,
  userLogin:{
    email: email,
    password: password,
    // history: history
  }
})
