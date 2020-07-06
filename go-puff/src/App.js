import React from 'react';

import orderData from './assets/order.json'

import './App.css';
import CartView from './page/CartView'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CartView cartItems={orderData.cart.products}/>
      </header>
    </div>
  );
}

export default App;
