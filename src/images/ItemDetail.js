import ItemCount from "./ItemCount"
import{useContext, useState} from 'react'
import{Link} from 'react-router-dom'
import { CartContext } from "../App"


const InputCount = ({initial,stock,onAdd}) =>{
    const[count,setCount] = useState(initial)


    const handleChange = (e) =>{
        if(e.target.value <= stock){
            setCount(e.target.value)
        }
    }

    return(
        <>
            <div className='d-flex justify-content-center p-4'>
                <input type='number' onChange={handleChange} value={count}/>
            </div>
            <div>
                <button className='btn2' disabled={stock <=0} onClick={() => onAdd(count)}>Agregar Carrito</button>
            </div>
        </>
        
    )
}

const ButtonCount = ({initial,stock,onAdd}) =>{
    const[count,setCount] = useState(initial)


    const decrement = () => {
       setCount(count - 1) 
    }

    const increment = () => {
        setCount(count + 1) 
    }

    return(
        <>
            <div className='d-flex justify-content-center p-4'>
                <button className='btn1' disabled={count <=1} onClick={decrement}>-</button>
                <h2 className='pe-4 px-4'>{count}</h2>
                <button className='btn1' disabled={count >= stock} onClick={increment}>+</button>
            </div>
            <div>
                <button className='btn2' disabled={stock <=0} onClick={() => onAdd(count)}>Agregar Carrito</button>
            </div>
        </>
        
    )
}

const ItemDetail = ({id,name,img,categoria,descripcion,price,stock}) =>{

    const [inputType,setInputType] = useState('input')
    const ItemCount = inputType === 'input' ? InputCount : ButtonCount
    
    const[quantity,setQuantity] = useState(0)

    const {addItem,isInCart} = useContext(CartContext)

    const onAdd = (cantidad) => {
        let itemCart ={
            id,name,img,price,stock,quantity:cantidad
        }
        console.log(`Compraste ${cantidad} unidades`)
        setQuantity(parseInt(cantidad))
        addItem(itemCart)
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
                                    <div>
                                        <button className='btn4' onClick={() => setInputType(inputType === 'input' ? 'button' : 'input')}>Cambiar Contador</button>
                                    </div>
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