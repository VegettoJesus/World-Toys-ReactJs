import carrito from "../images/carrito.png"
import '../index.css'

const CartWidget = ({totalQuantity}) => {
    return (
        <div className="car">
            <img className="carrito" src={carrito} alt="carrito" />{totalQuantity}
        </div>
    )
}

export default CartWidget