import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import '../App.css';




export default function OrderSummary(props)  {
    const [cartItems, setCartItems] = useState(props.cartItems);


    useEffect( () => {
        setCartItems(props.cartItems);
    }, [props.cartItems]);


    const displayItem = (item) => {
        console.log(item);
        console.log(_.has(item, 'product_info'));
        if (_.has(item, 'product_info')) {
            return (
                <div className={'card'}>
                    <div className={'productImage'}>
                    </div>
                    <div className={'productName'}>
                        {item.product_info.name}
                    </div>
                    <div className={'productDescription'}>

                    </div>
                </div>

            )
        }

        return null;
    };


    const getSubtotal = () => {
        let price = 0;
        _.forEach(cartItems, (item) => {
            price += (item.price * item.quantity)
        });

        return _.ceil(price, 2).toFixed(2);
    };







    return (
        <React.Fragment>
            <div className={'orderSummaryBox'}>
                <div>
                    <span className={'orderSummaryLabel'}>Subtotal ( {props.getItemNumberString() } )</span>
                    <span className={'orderSummaryPrice'}>${getSubtotal()}</span>
                </div>
                <div>
                    <span className={'orderSummaryLabel'}>Estimated Tax</span>
                    <span className={'orderSummaryPrice'}>${getSubtotal()}</span>
                </div>
                <div className={'orderSummaryTotal'}>
                    <span className={'orderSummaryLabel'}>Total</span>
                    <span className={'orderSummaryPrice'}>${getSubtotal()}</span>
                </div>
            </div>

        </React.Fragment>
    )

}