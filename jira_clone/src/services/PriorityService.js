import {baseService} from './baseService'

export class PriorityService extends baseService{
    constructor(){
        super()
    }

    getPriority = ()=>{
        return this.get(`Priority/getAll`)
    }
}

export const priorityServices = new PriorityService()