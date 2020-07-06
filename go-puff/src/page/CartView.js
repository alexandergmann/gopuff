import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import axios from '../axios-gopuff';
import CartItem from "../component/cartItem";
import OrderSummary from "../component/orderSummary";




export default function CartView(props)  {
    const [cartItems, setCartItems] = useState(props.cartItems);
    const [numberOfCartItems, setNumberOfCartItems] = useState();

    console.log(cartItems);

    useEffect( () => {
        let productIds = []
        let numberOfItems = 0;
        _.forEach(props.cartItems, function (item) {
            productIds.push(item.product_id);
            numberOfItems += item.quantity;

        });

        setNumberOfCartItems(numberOfItems);



        console.log(productIds);
        axios.get(`/products`, {
            params: {
                location_id: '-1',
                product_ids: productIds.join(','),
                text: '',
                page_size: productIds.length,
                page: 1
            }
        }).then((response) => {
            console.log(response);
            addProductDataToItems(response.data.products);
            },
            (error) => {
                console.log('this is an error');
                console.log(error);
            });
    }, [props.cartItems]);


    const addProductDataToItems = (products) => {
        let newCartItems = _.clone(cartItems);

        _.forEach(newCartItems, function (item) {

            let productInfo = _.find(products, {product_id: item.product_id});

            item.product_info = productInfo;

        });

        console.log(newCartItems);

        setCartItems(newCartItems);
    };


    const getItemNumberString =  () => {
        if (numberOfCartItems <= 1 ) {
            return numberOfCartItems + ' item';
        }

        return numberOfCartItems + ' items';
    };





    return (
        <React.Fragment>
            <h2>Your Cart ( {getItemNumberString()} item) </h2>
                <div className={'container'}>
                    <div>
                            {cartItems.map((item, index) => (
                                <CartItem cartItem={item} />
                            ))}
                    </div>
                    <OrderSummary cartItems={cartItems} getItemNumberString={getItemNumberString}/>
            </div>

        </React.Fragment>
    )

}