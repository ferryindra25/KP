import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import ListItem from "../shop/listProduk";

const Blank = () => {
  const [index, setIndex] = useState(0);
  var [barang, setBarang] = useState([]);
  var [barangView, setBarangView] = useState([]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  useEffect(() => {
    getBarangFromAPI()
  }, []);
  async function getBarangFromAPI(){
    try {
      const data = await fetch("/api/getBarang", {method : "GET"});
      let json_data = await data.json();
      //console.log(json_data);
      setBarang(json_data);
      setBarangView(json_data);
    } catch (error) {
      console.log("gagal");
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <NavBar/>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/wallpaper/wallpaper.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>TOKO SEPEDA BINTANG TERANG</h3>
                  <p>Berlokasi di jalan pasar turi 25 surabaya</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/wallpaper/wallpaper.jpg"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/wallpaper/wallpaper.jpg"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <hr/>
            <h3 className="text-center">Produk Terbaru Dari Kami</h3>
            <hr/>
          </div>
          {
            barangView.map((item,index) => {
              console.log(barangView.length);
              return (
                <ListItem nama={item.nama_barang} id={item.id_barang} deskripsi={item.deskripsi} gambar={item.gambar} harga={item.harga_barang}/>
              )
            })
          }
        </div>
      </div>
    </React.Fragment>
  );
}
export default Blank;
