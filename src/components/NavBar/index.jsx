import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import { useHistory } from 'react-router-dom';
import { Navbar, Dropdown, Icon, Nav } from 'rsuite';

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
const NavBar = () => {
  const history = useHistory();
  const [katagori, setKatagori] = useState([]);

  async function getDataKatagoriFromAPI(){
    try {
        const data = await fetch("api/getKatagori", {method : "GET"});
        setKatagori(await data.json());
    } catch (error) {
        console.log("gagal");
        console.log(error);
    }
  }

  useEffect(() => {
    getDataKatagoriFromAPI();
  }, []);

  const styl = {
    padding: "18px 20px",
    display: "inline-block"
  };
  const onClickLogout = (e) => {
    
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("nama");
    sessionStorage.removeItem("alamat");
    sessionStorage.removeItem("telp");
    history.push("/");
  }
  let dataUser = (
    <Nav.Item icon={<Icon icon="avatar" />} href="/login">Login</Nav.Item>
  );
  if (window.sessionStorage.getItem("email") !== null){
    
    dataUser = (<>
      <Nav.Item icon={<Icon icon="avatar" />} >{window.sessionStorage.getItem("nama")}</Nav.Item>
      <Nav.Item icon={<Icon icon="sign-out" />} onSelect={(e) => onClickLogout(e)}>Logout</Nav.Item>
    </>);
  }
  return (
    <React.Fragment>
      <Navbar>
        <Navbar.Header>
          <a href="/" style={styl}>Toko Sepeda Bintang Terang</a>
        </Navbar.Header>
        <Navbar.Body>
          <Nav pullRight>
            <Dropdown title="Produk">
              {katagori.map((item, index) => {
                return (
                  <Dropdown.Item value={item.id_katagori}>{item.nama_katagori}</Dropdown.Item>
                );
              })}
            </Dropdown>
            <Nav.Item>Tentang Kami</Nav.Item>
            <Nav.Item>Lokasi Toko</Nav.Item>
            {dataUser}
            
          </Nav>
        </Navbar.Body>
      </Navbar>
    </React.Fragment>
  );
}
export default NavBar;
