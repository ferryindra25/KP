import React, { Component } from 'react';
import SideNav from "./SideNavigation";
import Master from "./catagory";
const Katagori = () =>{
    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <SideNav activeKey="3"></SideNav>
                    
                    <div className="col-10">
                        <h3>Master Katagori</h3>
                        <Master/>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default Katagori;