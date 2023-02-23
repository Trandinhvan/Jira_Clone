import Axios from "axios"
import { DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem"

export class baseService{

    //put json về backend
    put = (url,model) =>{
        return Axios({
            url:`${DOMAIN_JIRA}/${url}`,
            method: 'PUT',
            data:model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        
        })
    }
    post = (url,model) =>{
        return Axios({
            url:`${DOMAIN_JIRA}/${url}`,
            method: 'POST',
            data:model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        
        })
    }

    get = (url) =>{
        return Axios({
            url:`${DOMAIN_JIRA}/${url}`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        
        })
    }

    delete = (url) =>{
        return Axios({
            url:`${DOMAIN_JIRA}/${url}`,
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        
        })
    }
}