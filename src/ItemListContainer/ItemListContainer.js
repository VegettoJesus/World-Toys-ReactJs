import { useEffect,useState } from 'react'
//import {getJuguetes, getJuguetesByCategory} from '../asyncMock'
import ItemList from '../ItemList'
import { useParams } from 'react-router-dom'
import { getDocs, collection, query, where} from 'firebase/firestore'
import { db } from '../service/firebase/firebaseConfig'

const ItemListContainer = ({greeting}) => {
    const [juguetes, setJuguetes] = useState([])
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)
    const{categoryId} = useParams()

    useEffect(() => {
        setLoading(true)

        const collectionRef = categoryId ? query(collection(db,'juguetes'),where('categoria', '==',categoryId)) : collection(db,'juguetes')
        console.log(categoryId)
        getDocs(collectionRef).then(response =>{
            const juguetesAdapted = response.docs.map(doc => {
                const data = doc.data()
                console.log(data)
                return {id: doc.id, ...data}
            })
            setJuguetes(juguetesAdapted)
            console.log(juguetesAdapted)
        }).catch(error =>{
            console.log(error)
        }).finally(() =>{
            setLoading(false)
        })
        /*if(!categoryId){
            getJuguetes().then(juguetes => {
                setJuguetes(juguetes)
            }).catch(error => {
                setError(true)
            }).finally(() =>{
                setLoading(false)
            })
        }else{
            getJuguetesByCategory(categoryId).then(juguetes => {
                setJuguetes(juguetes)
            }).catch(error => {
                setError(true)
            }).finally(() =>{
                setLoading(false)
            })
        }*/
        
    },[categoryId])
    
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
    if(error){
        return <h1>Existe un error en la plataforma...</h1>
    }

    return(
        <>
            <h1 className="container bienvenida2 text-center my-5 shadow  bg-body rounded">{greeting}</h1>
            <div className='container'>
                <div className="bienvenida2 text-center">
                    <ItemList juguetes={juguetes}/>
                </div>  
            </div>
        </>
        
         
    )
}

export default ItemListContainer