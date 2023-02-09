import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ItemCart from "./ItemCart";

const Cart = () => {
    const {cart,totalPrice,clearCart} = useContext(CartContext)

    if(cart.length === 0){
        return(
            <>
                <div className="contenedor">
                    <h2 className="letra-card">No hay elementos en el carrito <Link to='/'>Hacer compras</Link></h2>
                    
                </div>
                
            </>
        )
    }

    return(
        <>
            <div className="bienvenida2 text-center">
                <h1 className='text-center detalle'>Carrito de Compras</h1>
            </div>
            <div className="contenedor2">
                {cart.map(juguete => <ItemCart key={juguete.id} juguete={juguete}/>)}
                <h1 className="itemCart letra-card fs-5 text-end detalle">total: {totalPrice()}</h1>
                <div className="text-center">
                    <button className=" letra-card btn2 pb-3" onClick={() => clearCart()}>Limpiar</button>
                </div> 
                <div className="text-center m-2">
                    <Link type='button' className=" letra-card btn4 shadow-card pb-3" to='/checkout'>Checkout</Link>
                </div>
            </div>
            
            
        </>
    )
}

export default Cart