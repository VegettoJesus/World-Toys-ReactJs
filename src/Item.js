import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Item = ({id,name,img,price}) =>{
    return(
        <div className='col-md-3 flex my-5 mx-3'>
            <div className='card me-5 shadow mb-5  rounded bg-dark' style={{width: '20rem',height:'30rem'}}>
                    <img className='card-img-top'  src={img} alt={name}/>
                    <div className='card-body'>
                        <h2 className='card-title text-center fs-6 text-light'>
                            {name}
                        </h2>
                        <p className='card-text text-success'>
                            Precio: ${price}
                        </p>
                        <Link to={`/detail/${id}`}>Ver Detalle</Link>
                    </div>
            </div>
        </div>
        
        
    )
}

export default Item