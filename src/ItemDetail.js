import ItemCount from "./ItemCount"
import{useContext, useState} from 'react'
import{Link} from 'react-router-dom'
import {CartContext} from './context/CartContext'
import { NotificationContext } from "./Notification/NotificationService"


const ItemDetail = ({id,name,img,categoria,descripcion,price,stock}) =>{
    //const[quantity,setQuantity] = useState(0)
    const {addItem,isInCart} = useContext(CartContext)
    const setNotification = useContext(NotificationContext)
    const onAdd = (quantity) => {
        let item ={
            id,name,img,price,quantity
        }
        console.log(`Compraste ${quantity} unidades`)
        //setQuantity(quantity)
        addItem(item)
        setNotification('success',`Se agrego correctamente ${quantity} ${name}`,5)
    }
    return(
        <>
            <div className=' rounded p-5 d-flex'>
                <div className='card mx-auto   mb-4  shadow  bg-body rounded p-5'>
                    <img className='card-img-top rounded mx-auto d-block' style={{width: '15rem'}} src={img} alt={name}/>
                    <div className='card-body'>
                        <h2 className='text-primary card-title text-center fs-2'>
                            {name}
                        </h2>
                        <p className='card-text text-success fs-3'>
                            Precio: ${price}
                        </p>
                        <p className='text-danger fs-5'>
                            Categoria: {categoria}
                        </p>
                        <p>
                            Descripcion: {descripcion}
                        </p>

                    </div>
                    
                    <div>
                        {
                            isInCart(id) ? (
                                <Link to='/cart'>Terminar Compra</Link>
                            ):(
                                <>
                                    
                                    <ItemCount initial={1} stock={stock} onAdd={onAdd}/>
                                </>
                                
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default ItemDetail