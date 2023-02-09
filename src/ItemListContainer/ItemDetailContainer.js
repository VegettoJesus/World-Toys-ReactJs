
import {useState, useEffect} from 'react'
//import {getJugueteById} from '../asyncMock'
import ItemDetail from "../ItemDetail"
import { useParams } from "react-router-dom"

import {getDoc, doc} from 'firebase/firestore'
import { db } from '../service/firebase/firebaseConfig'

const ItemDetailContainer = ({setCart}) => {

    const [juguetes, setJuguetes] = useState()
    const [loading, setLoading] = useState(true)

    const {jugueteId} = useParams()

    useEffect(() => {
        const docRef = doc(db,'juguetes',jugueteId)
        getDoc(docRef).then(doc =>{
            console.log(doc)
            const data = doc.data()
            const jugueteAdapted = {id:doc.id, ...data}
            console.log(jugueteAdapted)
            setJuguetes(jugueteAdapted)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
        //getJugueteById(jugueteId).then(response => {
        //    setJuguetes(response)
        //}).finally(() => {
        //    setLoading(false)
        //})
    },[jugueteId])

    if(loading){
        return(
            <>
                <div className='contenedor'>
                    <div className='contenedor-loader'>
                        <div className='rueda'></div>
                    </div>
                    <div className='cargando'>Cargando...</div>
                </div>
            </>
        )
    }

    return(
        <div className=" bienvenida2 text-center ">
            <h1 className='text-center detalle'>Detalle {juguetes.name}</h1>
            <ItemDetail {...juguetes} setCart={setCart}/>
        </div>
        
    )
}

export default ItemDetailContainer