import React, { Component,useEffect,useState } from 'react';
import { BrowserRouter, NavLink, Route, Router, Switch, useHistory } from 'react-router-dom';
import './App.css';
import LoadingComponent from './components/GlobalSetting/LoadingComponent';
import Login from './pages/Login/Login';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import {useDispatch} from 'react-redux'
import JiraTemplate from './templates/HomeTemplate/JiraTemplate';
import CreatePropject from './pages/CreateProject/CreatePropject';
import ProjectManagement from './pages/ProjectManagement';
import DrawerJira from './HOC/DrawerJira';
import ProjectDetail from './pages/ProjectDetail';

// import history from './util/history'

function App() {

  const history = useHistory();
  const dispatch = useDispatch();

  //chạy 1 lần ddaauff tiên khi load app.
  useEffect(()=>{
    // console.log('history nè: ',history)
    dispatch({
      type: 'ADD_HISTORY',
      history: history
    })
  },[])

  return (
    <>
      <DrawerJira></DrawerJira>
      <LoadingComponent></LoadingComponent>
      <Switch>
        {/* <UserLoginTemplate exact path='/login' component={Login} /> */}
        <UserLoginTemplate path='/login' Component = {Login}></UserLoginTemplate>
        <JiraTemplate path='/jira' Component={ProjectDetail}></JiraTemplate>
        <JiraTemplate path='/createProject' Component= {CreatePropject}></JiraTemplate>
        <JiraTemplate path='/projectManagement' Component = {ProjectManagement}></JiraTemplate>
        <JiraTemplate path='/projectDetail/:projectId' Component = {ProjectDetail}></JiraTemplate>
        <JiraTemplate exact path='/' Component= {ProjectManagement}></JiraTemplate>
      </Switch>
    </>
    
  );
}

export default App;
