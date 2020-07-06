import React from 'react';
import logo from './logo.svg';

import orderData from './assets/order.json'

import './App.css';
import CartView from './page/CartView'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <CartView cartItems={orderData.cart.products}/>
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
    </div>
  );
}

export default App;
