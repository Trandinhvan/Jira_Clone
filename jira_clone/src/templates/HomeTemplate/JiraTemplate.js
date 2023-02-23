import React from 'react'
import { Route } from 'react-router-dom'
import ContentMain from '../../components/Jira/Main/ContentMain';
import HeaderMain from '../../components/Jira/Main/HeaderMain';
import InforMain from '../../components/Jira/Main/InforMain';
import MenuJira from '../../components/Jira/MenuJira';
import ModealJira from '../../components/Jira/ModalJira/ModealJira';
import SidebarJira from '../../components/Jira/SidebarJira';
import '../../index.css'

export default function JiraTemplate(props) {
    let { Component, ...restRoute } = props;

    return <Route {...restRoute} render={(propsRoute) => {
        return <>
            <div className="jira">
                <SidebarJira></SidebarJira>
                <MenuJira></MenuJira>
                    <Component {...propsRoute}></Component>
                <ModealJira></ModealJira>
            </div>
        </>
    }} />

}
