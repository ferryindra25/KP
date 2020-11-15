import React from "react";
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faPhone, faEnvelope, faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './index.css';

const Footer = () => {
  return (
    <div className="mt-5">
			<br/><br/><br/><br/><br/>
			<footer class="footer-distributed">
	
			<div class="footer-left">
	
			<h3>Toko Sepeda Bintang Terang</h3>
	
	
			<p class="footer-company-name">Bintang Terang &copy; 2020</p>
			</div>
	
			<div class="footer-center">
	
			<div>
			<i class="circleIcon"><FontAwesomeIcon icon={ faLocationArrow } style={{width:"40%"}}/></i>
			<p><span>Pasar Turi 25</span> Surabaya, Indonesia</p>
			</div>
	
			<div>
			<i class="circleIcon"><FontAwesomeIcon icon={ faPhone } style={{width:"40%"}}/></i>
			<p>031 3537081</p>
			</div>	

			</div>
	
			</footer>
		</div>
  );
}
export default Footer;