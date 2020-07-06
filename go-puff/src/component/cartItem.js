import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import '../App.css';
import {FaMinusCircle} from "react-icons/fa";


export default function CartItem(props)  {
    const [cartItem, setCartItem] = useState(props.cartItem);
    const [quantity, setQuantity] = useState(props.cartItem.quantity);




    useEffect( () => {
        setCartItem(props.cartItem);
        setQuantity(props.cartItem.quantity)
    }, [props.cartItem]);



    const changeQuantity = (event) => {
        let newQuantity = event.target.value;

        if ( newQuantity <= 0 ) {
            newQuantity = 0;
        }
        setQuantity(newQuantity);
    };

    const getImage = (item) => {
        if (item.product_info.images.length >= 1 ) {
            return (
                <img src={item.product_info.images[0].thumb} className={'App-logo'} alt={'thumb'}/>
            )
        }

        return null;
    };


    const getPrice = () => {
        let price = _.ceil((cartItem.price * cartItem.quantity), 2).toFixed(2);
        return (
            <div>
                Price: ${ price }
            </div>
        );
    };


    const getDiscountedPrice = () => {
        let normalPrice = cartItem.price;
        let discountedPrice = cartItem.credit_coupon_price;

        // if discounted price is less, display it
        if (discountedPrice < normalPrice) {

            let fullDiscountedPrice = cartItem.credit_coupon_price * quantity;

            return (
                <div className={'discountedPrice'}>
                    Promotion Price:  ${fullDiscountedPrice}
                </div>
            )
        }

        // if the discounted price is the same, don't display;
        return null;
    };


    const displayItem = () => {
        if (_.has(cartItem, 'product_info')) {
            return (
                <div className={'card'}>
                    <div>
                        <FaMinusCircle className={'removeIcon'} onClick={() => props.removeItem(cartItem)}/>
                    </div>
                    <div className={'productImage'}>
                        {getImage(cartItem)}
                    </div>
                    <div className={'productNameQuantity'}>
                        <div className={'productName'}>
                            {cartItem.product_info.name}
                        </div>
                        <div>
                            <label>Quantity: </label>
                            <input type={'number'} value={quantity} min={0} onChange={(event) => changeQuantity(event)}/>
                            <button onClick={() => props.updateQuantity(quantity, cartItem)}>Update</button>
                        </div>
                    </div>
                    <div className={'productPrice'}>
                        {getPrice()}
                        {getDiscountedPrice()}
                    </div>
                </div>

            )
        }

        return null;
    };

    return (
        <React.Fragment>
            {displayItem()}
        </React.Fragment>
    )

    }