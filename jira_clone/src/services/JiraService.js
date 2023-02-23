import Axios from "axios"
import { DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem"

export const jiraService = {
    signinJira: (userLogin)=>{
        return Axios({
            url:`${DOMAIN_JIRA}/users/signin`,
            method:'POST',
            data: userLogin
        })
    },
    getAllProjectCategory: ()=>{
        return Axios({
            url:`${DOMAIN_JIRA}/ProjectCategory`,
            method:'GET'
        })
    },
    createProject: (newProject)=>{
        return Axios({
            url:`${DOMAIN_JIRA}/Project/createProject`,
            method:'POST',
            data: newProject
        })
    },

    createProjectAuthorization: (newProject) =>{
        return Axios({
            url: `${DOMAIN_JIRA}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },

    getListProject: ()=>{
        return Axios({
            url: `${DOMAIN_JIRA}/Project/getAllProject`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },

    updateProject: (projectUpdate)=>{
        return Axios({
            url: `${DOMAIN_JIRA}/Project/updateProject?projectId=${projectUpdate.id}`,
            method:'PUT',
            data: projectUpdate,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}