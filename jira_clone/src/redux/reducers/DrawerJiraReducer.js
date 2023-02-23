const initialState = {
    open: false,
    title:'',
    ComponentContentDrawer: <p>default drawer content</p>,
    callBackSubmit: (propsValues)=>{
        alert('click demo')
    }
}

export const DrawerJiraReducer = (state = initialState,action) => {
  switch (action.type) {

  case 'OPEN_DRAWER':{
    return { ...state,open: true }
  }
  case 'CLOSE_DRAWER':{
    return {...state,open:false}
  }
  case 'OPEN_EDIT_PROJECT':{
    return {...state,open: true, ComponentContentDrawer: action.Component, title: action.title}
  }
  case 'SET_SUBMIT_EDIT_PROJECT':{
    state.callBackSubmit = action.submitFunction
    return {...state}
  }
  case 'SET_SUBMIT_CREATE_TASK':{
    return {...state,callBackSubmit:action.submitFunction}
  }
  case 'OPEN_FORM_CREATE_TASK':{
      state.open = true
      state.ComponentContentDrawer = action.Component
      state.title = action.title
      return {...state}
  }

  default:
    return state
  }
}
