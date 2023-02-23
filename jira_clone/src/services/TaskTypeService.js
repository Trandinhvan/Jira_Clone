import {baseService} from './baseService'

import React, { Component } from 'react'

export class TaskTypeService extends baseService
{
    constructor(){
        super()
    }

    getTaskType = ()=>{
        return this.get(`TaskType/getAll`)
    }

}
export const taskTypeService = new TaskTypeService()
