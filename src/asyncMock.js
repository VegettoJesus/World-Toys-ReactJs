import jugete1 from "./images/juguete1.jpg"
import juguete2 from "./images/juguete2.jpg"
import juguete3 from "./images/juguete3.jpg"


const juguetes = [
    {
        id:'1',
        name: 'Go Kart con Montacarga',
        price: 359.90,
        categoria: 'Autos',
        img: jugete1,
        stock: 10,
        descripcion: 'Uno de los mejores juguetes dentro de la tienda'

    },
    {id: '2', name:'Muñeca Lol Surprise Tweens Gracie Skates', price: 79.90, categoria:'Muñecos',img:juguete2,stock:50,descripcion:'Muñeca lol de las mejores'},
    {id: '3', name: 'Auto a Batería para Niños Todo Terreno 12V 4.5Ah Azul Scoop',price: 688.90,categoria:'Autos',img:juguete3, stock: 15, descripcion:'Uno de los mejores autos de jugetes'}
]

export const getJuguetes = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(juguetes)
        },1500)
    })
}

export const getJuguetesByCategory = (categoryId) =>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(juguetes.filter(toys => toys.categoria === categoryId))
        },1000)
    })
}

export const getJugueteById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(juguetes.find(toys => toys.id === id))
        },500)
    })
}