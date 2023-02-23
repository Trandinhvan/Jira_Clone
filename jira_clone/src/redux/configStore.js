import { combineReducers, applyMiddleware, legacy_createStore } from 'redux'
import createMiddleWareSaga from 'redux-saga'
import { rootSaga } from './sagas/rootSaga'
import LoadingReducer from './reducers/LoadingReducer'
import { HistoryReducer } from './reducers/HistoryReducer'
import {UserJiraReducer} from './reducers/UserJiraReducer'
import {ProjectCategoryReducer} from './reducers/ProjectCategoryReducer'
import { ProjectReducer } from './reducers/ProjectReducer'
import {DrawerJiraReducer} from './reducers/DrawerJiraReducer'
import {ProjectJiraReducer} from './reducers/ProjectJiraReducer'
import {TaskTypeReducer} from './reducers/TaskTypeReducer'
import {PriorityReducer} from './reducers/PriorityReducer'
import {StatusReducer} from './reducers/StatusReducer'
import {TaskReducer} from './reducers/TaskReducer'



const middleWareSaga = createMiddleWareSaga()



const rootReducer = combineReducers({
    LoadingReducer,
    HistoryReducer,
    UserJiraReducer,
    ProjectCategoryReducer,
    ProjectReducer,
    DrawerJiraReducer,
    ProjectJiraReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer,
})



const store = legacy_createStore(rootReducer,applyMiddleware(middleWareSaga))
middleWareSaga.run(rootSaga)

export default store