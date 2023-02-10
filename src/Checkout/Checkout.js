import { collection, query, where,documentId, getDocs,writeBatch, addDoc } from "firebase/firestore"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { db } from "../service/firebase/firebaseConfig"

const Checkout = () => {

    const [loading,setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')
    const {cart,totalPrice,clearCart} = useContext(CartContext)
    const navigate = useNavigate()
    const [buyer,setBuyer] = useState({
        name:'',
        phone:'',
        email:''
    })

    const createOrder = async () =>{
        setLoading(true)
        try{
            const objOrder = {
                buyer,
                items: cart,
                total: totalPrice(),
            };
    
            const batch = writeBatch(db)
    
            const ids = cart.map(toys => toys.id)
            const juguetesRef = query(collection(db, 'juguetes'), where(documentId(),'in',ids))
            const juguetesAddredToCartFromFirestore = await getDocs(juguetesRef)
            const { docs } = juguetesAddredToCartFromFirestore
    
            const outOfStock = []
    
            docs.forEach(doc =>{
                const dataDoc = doc.data()
                console.log('dataDoc: ',dataDoc)
                const stockDb = dataDoc.stock
                const jugueteAddedToCart = cart.find(toys => toys.id === doc.id)
                const jugueteQuantity = jugueteAddedToCart.quantity
    
                if(stockDb >= jugueteQuantity){
                    batch.update(doc.ref,{stock:stockDb-jugueteQuantity})
                }else{
                    outOfStock.push({id:doc.id,...dataDoc})
                }
            })
            console.log('outOfStock',outOfStock)
            if(outOfStock.length === 0){
                await batch.commit()
    
                const orderRef = collection(db,"orders")
                
    
                const orderAddred = await addDoc(orderRef,objOrder)
                
                const { id } = orderAddred
                setOrderId(id)
                clearCart()
                setTimeout(() =>{
                    navigate('/')
                },5000)
                console.log(id)
                console.log('compra: ',objOrder)
            }else{
                console.error('hay productos fuera de stock')
            }
        }catch (error){
            console.error(error)
        }finally{
            setLoading(false)
        }
        
        
    }
    
    if(loading){
        return(
            <>
                <div className='contenedor'>
                    <div className='contenedor-loader'>
                        <div className='rueda'></div>
                    </div>
                    <div className='cargando'>Generando Orden...</div>
                </div>
            </>
        )
    }

    if(orderId){
        return(
            <>
                <div className='contenedor bienvenida2 text-center'>
                    <h1 className='cargando detalle text-dark'>El id de su compra es: {orderId}</h1>
                </div>
            </>
        )
    }
    
    if(cart.length === 0){
        return (
            <div className='contenedor bienvenida2 text-center'>
                    <h1 className='cargando detalle text-dark'>No hay productos en el carrito</h1>
            </div>
        )
    }

    console.log(buyer)
    const handleInputChange = (e) => {
        setBuyer({...buyer,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    
    return (
        <>
            <div className="formulario letra-card detalle text-center">
                <div>
                    <h1>chekout</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="name" className='form-control' value={buyer.name} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Telefono</label>
                        <input type="text" name='phone' className='form-control' value={buyer.phone} onChange={handleInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name='email' className='form-control' value={buyer.email} onChange={handleInputChange}></input>
                    </div>
                    <div className="text-center m-2 ">
                        <button className="letra-card btn4 shadow-card pb-3" onClick={createOrder}>Generar Orden</button>
                    </div> 
                </form>
            </div>
            
            
        </>  
    )
}

export default Checkout