import { collection, query, where,documentId, getDocs,writeBatch, addDoc } from "firebase/firestore"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { db } from "../service/firebase/firebaseConfig"

const Checkout = () => {

    const {cart,totalPrice} = useContext(CartContext)

    const createOrder = async () =>{
        const objOrder = {
            buyer: {
                name: 'Christian Leon',
                phone: '12345678',
                email: 'jesusleonangulo@hotmail.com'
            },
            items: cart,
            total: totalPrice
        }

        const batch = writeBatch(db)

        const ids = cart.map(toys => toys.id)
        const juguetesRef = query(collection(db, 'juguetes'), where(documentId(),'in',ids))

        const juguetesAddredToCartFromFirestore = await getDocs(juguetesRef)
        const { docs } = juguetesAddredToCartFromFirestore

        const outOfStock = []

        docs.forEach(doc =>{
            const dataDoc = doc.data()
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
            console.log(id)
        }
    }

    return (
        <>
            <div className="bienvenida2 text-center">
                <h1 className='text-center detalle'>chekout</h1>
            </div>
            <div className="text-center m-2 ">
                <button className="letra-card btn4 shadow-card pb-3" onClick={createOrder}>Generar Orden</button>
            </div>
        </>  
    )
}

export default Checkout