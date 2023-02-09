import './index.css';
import NavBar from './NavBar';
import ItemListContainer from './ItemListContainer/ItemListContainer';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import ItemDetailContainer from './ItemListContainer/ItemDetailContainer';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './Notification/NotificationService';
import Cart from '../src/Cart/Cart'
import Checkout from './Checkout/Checkout';



function App() {
  
  return (
    <div className='App'>
      <NotificationProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar/>
            <Routes>
              <Route path='/' element={<ItemListContainer greeting='Bienvenido a la jugeteria mas popular del pais!'/>}></Route>
              <Route path='/category/:categoryId' element={<ItemListContainer greeting='Categoria Filtrada'/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/detail/:jugueteId' element={<ItemDetailContainer/>}/>
              <Route path='/checkout' element={<Checkout />}></Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
