import { GET_PRIORITY } from "../constants/PriorityConstants"

const initialState = {
    arrPriority: []
}

export const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_PRIORITY:
    return { ...state,arrPriority: action.priority}

  default:
    return state
  }
}
