import Item from "./Item"

const ItemList = ({juguetes}) => {
    return(
        <div className="row">
            {juguetes.map(toys => <Item key={toys.id} id={toys.id} name={toys.name} img={toys.img} price={toys.price}/>)}
        </div>
    )
}
export default ItemList