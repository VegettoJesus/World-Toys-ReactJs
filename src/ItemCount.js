import{useState} from 'react'

const ItemCount = ({initial,stock,onAdd}) =>{
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
export default ItemCount