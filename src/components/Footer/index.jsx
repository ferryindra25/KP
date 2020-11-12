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
	
	
			<p class="footer-company-name">Bintag Terang &copy; 2020</p>
			</div>
	
			<div class="footer-center">
	
			<div>
			<i class="circleIcon"><FontAwesomeIcon icon={ faLocationArrow } style={{width:"40%"}}/></i>
			<p><span>73-77 Ngagel Jaya Utara</span> Surabaya, Indonesia</p>
			</div>
	
			<div>
			<i class="circleIcon"><FontAwesomeIcon icon={ faPhone } style={{width:"40%"}}/></i>
			<p>+6281 2345 6789</p>
			</div>
	
			<div>
			<i class="circleIcon"><FontAwesomeIcon icon={ faEnvelope } style={{width:"40%"}}/></i>
			<p><a href="mailto:support@company.com">contact@alaskakiqu.com</a></p>
			</div>
	
			</div>
	
			<div class="footer-right">
	
			<p class="footer-company-about">
			<span>About the company</span>
				Styles come and go. Good design is a language, not a style.
			</p>
	
			<div class="footer-icons">
	
			<a href="#"><FontAwesomeIcon icon={ faFacebook }/></a>
			<a href="#"><FontAwesomeIcon icon={ faTwitter }/></a>
			<a href="#"><FontAwesomeIcon icon={ faInstagram }/></a>
			<a href="#"><FontAwesomeIcon icon={ faWhatsapp }/></a>
	
			</div>
	
			</div>
	
			</footer>
		</div>
  );
}
export default Footer;