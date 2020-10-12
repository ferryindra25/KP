import React, { Component } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { useHistory } from 'react-router-dom';
import { Navbar, Dropdown, Icon, Nav } from 'rsuite';

const NavbarAdmin = () => {
    const styl = {
        padding: "18px 20px",
        display: "inline-block"
    };
    return (
        <React.Fragment>
        <Navbar>
            <Navbar.Header>
            <a href="/admin" style={styl}>Admin Toko Sepeda Bintang Terang</a>
            </Navbar.Header>
            <Navbar.Body>
            <Nav pullRight>
                <Nav.Item icon={<Icon icon="sign-out" />}>Logout</Nav.Item>
                
            </Nav>
            </Navbar.Body>
        </Navbar>
        </React.Fragment>
    );
}

export default NavbarAdmin;