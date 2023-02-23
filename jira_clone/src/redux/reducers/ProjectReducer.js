const stateDefault = {
    projectList: [
        //{id:'1',projectName:'acb',description: '<p style="color:red">Projec nè</p>'}
    ],
    arrProject: [] //get allproject cho dropdown
}

export const ProjectReducer = (state = stateDefault,action) =>{
    switch(action.type){
        case 'GET_LIST_PROJECT':{
            state.projectList = action.projectList
            return {...state}
        }
        case 'GET_ALL_PROJECT':{
            state.arrProject = action.arrProject
            return {...state}
        }
        default: return {...state}
    }
}