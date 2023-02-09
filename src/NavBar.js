import { useContext } from 'react';
import{Link} from 'react-router-dom'
import { useRef } from "react";
import { FaBars,FaTimes }  from "react-icons/fa";
import logo from "./images/logo.png"
import CartWidget from "./CartWidget/CartWidget";
import { CartContext } from './context/CartContext';

function NavBar(){
    
    const navRef = useRef();//crear efectos
    const{totalQuantity} = useContext(CartContext)

    const mostrarNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return(
        <header>
            <div>
                <img className="logo" src={logo} alt="LOGO"/>
            </div>
            
            <nav ref={navRef}>
                <a className="letra" href="/#">Catalogo</a>
                <Link to={`/category/Autos`} className="btn3 p-3 mx-4 m-2">Autos</Link>
                <Link to={`/category/Muñecos`} className="btn3 p-3 mx-4">Muñecos</Link>
                <CartWidget totalQuantity = {totalQuantity}/>
                <button className="nav-btn nav-close-btn" onClick={mostrarNavBar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={mostrarNavBar}>
                <FaBars/>
            </button>
        </header>
    );
}
export default NavBar;