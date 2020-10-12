import React, { Component } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import { Sidenav, Dropdown, Icon, Nav } from 'rsuite';
import { useHistory } from 'react-router-dom';

const SideNavigation = (props) => {
    
    const history = useHistory();

    const onClickTambahProduk = (e) =>{
        
        history.push("/admin/tambahProduk");
    }
    const onClickDashboard = (e) =>{
        
        history.push("/admin");
    }
    
    const onClickDaftarProduk = (e) =>{
        history.push("/admin/daftarProduk");
    }

    const onClickKatagori = (e) =>{
        
        history.push("/admin/katagori");
    }

    return(
        <div className="col-2 pl-0">
            <Sidenav defaultOpenKeys={['2']} activeKey={props.activeKey}>
                <Sidenav.Body>
                    <Nav>
                        
                        <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />} onClick={(e) => onClickDashboard(e)}>
                            Dashboard
                        </Nav.Item>
                        
                        <Dropdown eventKey="2" title="Produk" icon={<Icon icon="archive" />}>
                            <Dropdown.Item eventKey="2-1" onSelect={(e) => onClickTambahProduk(e)}>Tambah Produk</Dropdown.Item>
                            <Dropdown.Item eventKey="2-2" onSelect={(e) => onClickDaftarProduk(e)}>Daftar Produk</Dropdown.Item>
                        </Dropdown>
                        <Nav.Item eventKey="3" title="Katagori" icon={<Icon icon="list" />} onClick={(e) => onClickKatagori(e)}>
                            katagori
                        </Nav.Item>
                        <Nav.Item eventKey="4" title="Katagori" icon={<Icon icon="money" />}>
                            Penjualan
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
}

export default SideNavigation;