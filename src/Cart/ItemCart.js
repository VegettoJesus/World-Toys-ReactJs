import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ItemCart = ({juguete}) => {
    const {removeItem} = useContext(CartContext)
    return(
        <div className="card mb-5 itemCart shadow-card" style={{width: '540px'}}>
            <div className="row g-0" >
                <div className="col-md-4">
                    <img style={{width: '12rem',height:'15rem'}} src={juguete.img} alt={juguete.name} />
                </div>
                <div className="col-md-8 p-2">
                    <div className="card-body">
                        <h5 className="card-title ps-3 letra-card">Nombre: {juguete.name}</h5>
                        <p className="card-text ps-3 letra-card">Cantidad: {juguete.quantity}</p>
                        <p className="card-text ps-3 letra-card">Precio: S/.{juguete.price}</p>
                        <p className="card-text ps-3 letra-card">SubTotal: S/.{juguete.quantity*juguete.price}</p>
                        <div className="text-center letra-card">
                            <button className="card-text ms-3 btn btn-danger text-center" onClick={() => removeItem(juguete.id)}>Eliminar</button>
                        </div>
                    </div>
                    
                </div> 

            </div>
        </div>
        
    )
}

export default ItemCart