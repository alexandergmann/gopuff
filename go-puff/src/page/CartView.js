import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import axios from '../axios-gopuff';
import CartItem from "../component/cartItem";
import OrderSummary from "../component/orderSummary";




export default function CartView(props)  {
    const [cartItems, setCartItems] = useState(props.cartItems);
    const [numberOfCartItems, setNumberOfCartItems] = useState();

    useEffect( () => {
        let items = props.cartItems;

        if (localStorage.getItem('cartItems')) {
            items = JSON.parse(localStorage.getItem('cartItems'));
        }
        let productIds = []
        let numberOfItems = 0;
        _.forEach(items, function (item) {
            productIds.push(item.product_id);
            numberOfItems += item.quantity;

        });

        setNumberOfCartItems(numberOfItems);

        axios.get(`/products`, {
            params: {
                location_id: '-1',
                product_ids: productIds.join(','),
                text: '',
                page_size: productIds.length,
                page: 1
            }
        }).then((response) => {
            let products = response.data.products;
                let newCartItems = _.clone(items);

                _.forEach(newCartItems, function (item) {

                    let productInfo = _.find(products, {product_id: item.product_id});

                    item.product_info = productInfo;

                });
                setCartItems(newCartItems);
            },
            (error) => {
                console.log('this is an error');
                console.log(error);
            });
    }, [props.cartItems]);


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems]);


    const getItemNumberString =  () => {
        if (numberOfCartItems <= 1 ) {
            return numberOfCartItems + ' item';
        }

        return numberOfCartItems + ' items';
    };


    const updateQuantity = (quantity, item) => {
        let clonedItems = _.cloneDeep(cartItems);

        if (quantity <= 0 ) {
            _.remove(clonedItems, {'product_id': item.product_id})
        } else {
            let index = _.findIndex(clonedItems, {'product_id': item.product_id});
            item.quantity = quantity;
            clonedItems[index] = item;
        }
        setCartItems(clonedItems)
    };

    const removeItem = (itemToRemove) => {
        let clonedItems = _.cloneDeep(cartItems);

        _.remove(clonedItems, {product_id: itemToRemove.product_id});

        setCartItems(clonedItems);
    };




    return (
        <React.Fragment>
            <h2>Your Cart ( {getItemNumberString()} item) </h2>
                <div className={'container'}>
                    <div className={'cartItemsContainer'}>
                            {cartItems.map((item, index) => (
                                <CartItem cartItem={item} updateQuantity={updateQuantity} key={index} removeItem={removeItem}/>
                            ))}
                    </div>
                    <OrderSummary cartItems={cartItems} getItemNumberString={getItemNumberString}/>
            </div>

        </React.Fragment>
    )

}