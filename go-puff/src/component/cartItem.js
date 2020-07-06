import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import axios from '../axios-gopuff';
import '../App.css';
import logo from "../logo.svg";




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


    const displayItem = (item) => {
        console.log(item);
        console.log(_.has(item, 'product_info'));
        if (_.has(item, 'product_info')) {
            return (
                <div className={'card'}>
                    <div className={'productImage'}>
                        {getImage(item)}
                    </div>
                    <div className={'productNameQuantity'}>
                        <div className={'productName'}>
                            {item.product_info.name}
                        </div>
                        <div>
                            <label>Quantity: </label>
                        </div>
                    </div>
                    <div className={'productPrice'}>
                        {getPrice()}
                    </div>
                </div>

            )
        }

        return null;
    };


    const getImage = (item) => {
        if (item.product_info.images.length >= 1 ) {
            return (
                <img src={item.product_info.images[0].thumb} className={'App-logo'}/>
            )
        }

        return null;
    };


    const getPrice = () => {
        let price = _.ceil((cartItem.price * cartItem.quantity), 2).toFixed(2);
        return (
            <div>
                ${ price }
            </div>
        );
    };


    const getDiscountedPrice = () => {
        let normalPrice = cartItem.price;
        let discountedPrice = cartItem.credit_coupon_price

    };







    return (
        <React.Fragment>
            {displayItem(cartItem)}
        </React.Fragment>
    )

    }