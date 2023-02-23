import {all} from 'redux-saga/effects'
import * as UserJiraSaga from './UserJiraSaga'
import * as ProjectCategorySaga from './ProjectCategorySaga'
import * as ProjectSaga from './ProjectSaga'
import * as TaskTypeSaga from './TaskTypeSaga'
import * as PrioritySaga from './PrioritySaga'
import * as TaskSaga from './TaskSaga'
import * as StatusSaga from './StatusSaga'


export function * rootSaga(){
    yield all([
        //nghiệp vụ Jira.
        UserJiraSaga.theoDoiSignIn(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theodoiCreateProject(),
        ProjectSaga.theodoiGetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProject(),
        ProjectSaga.theoDoiDeleteProject(),
        UserJiraSaga.theoDoiGetUser(),
        UserJiraSaga.theoDoiAddUserProject(),
        UserJiraSaga.theoDoiRemoveUserFromProject(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetAllProject(),
        TaskTypeSaga.theoDoigetAllTaskType(),
        PrioritySaga.theoDoiGetPriority(),
        TaskSaga.theoDoiCreateTaskSaga(),
        StatusSaga.theoDoiGetAllStatusSaga(),
        UserJiraSaga.theoDoiGetUserByProjectIdSaga(),
        TaskSaga.theoDoiGetTaskDetailSaga(),
        TaskSaga.theoDoiUpdateTaskStatusSaga(),
        TaskSaga.theoDoiUpdateTask(),
        TaskSaga.theoDoiHandleChangePostApi()
    ])
}