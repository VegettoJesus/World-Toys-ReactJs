import { useState,createContext } from "react"

export const CartContext = createContext()
export const CartProvider = ({children}) =>{

    const [cart,setCart] = useState([])
    console.log('carrito:', cart)

    const addItem = (jugueteToAdd) => {
        if(!isInCart(jugueteToAdd.id)){
        setCart(prev => {
            return [...prev, jugueteToAdd]
        })
        }else{
            console.error('YA ESTA AGREGADO')
        }
    }
    const isInCart = (id) => cart.some(toys => id === toys.id)
    const getTotalQuantity = () =>{
        let accu = 0
        
        cart.forEach(toys =>{
            accu+=toys.quantity
        })
        return accu
    }
    const totalQuantity = getTotalQuantity()
    
    const clearCart = () => setCart([])

    const removeItem = (id) => setCart(cart.filter(toys => toys.id !== id))

    const totalPrice = () => { return cart.reduce((prev,act) => prev + act.quantity*act.price,0)}

    return(
        <CartContext.Provider value={{addItem,isInCart,totalQuantity,clearCart,removeItem,totalPrice,cart}}>
            {children}
        </CartContext.Provider>
    )
}