import React, { Component } from 'react';
import SideNav from "./SideNavigation";

const Dashboard = () =>{
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="1"></SideNav>
                </div>
            </div>
        </React.Fragment>
        
    );
}

export default Dashboard;