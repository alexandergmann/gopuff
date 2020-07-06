import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import '../App.css';




export default function OrderSummary(props)  {
    const [cartItems, setCartItems] = useState(props.cartItems);
    const [subTotal, setSubTotal] = useState(0);
    const [discountedSubTotal, setDiscountedSubTotal] = useState(0);


    useEffect( () => {
        setCartItems(props.cartItems);
        let subTotal = getSubtotal(props.cartItems)
        setSubTotal(subTotal);
        setDiscountedSubTotal(getDiscountedSubtotal(props.cartItems,subTotal))


    }, [props.cartItems]);


    const getSubtotal = () => {
        let price = 0;
        _.forEach(cartItems, (item) => {
            price += (item.price * item.quantity)
        });

        return _.ceil(price, 2).toFixed(2);
    };


    const getDiscountedSubtotal = (cartItems, subTotal) =>  {
        let discountedTotal = 0;


        _.forEach(cartItems, (item) => {
            if (item.credit_coupon_price >= item.price) {
                discountedTotal += (item.price * item.quantity)
            } else {
                discountedTotal += (item.credit_coupon_price * item.quantity)

            }
        });

        return  _.ceil(discountedTotal, 2).toFixed(2);
    };

    const displayDiscountedSubTotal = () => {
        if (discountedSubTotal === subTotal) {
            return null;
        }

        return (
            <div className={['discountedSubtotal']}>
                <span className={'orderSummaryLabel'}>Discounted Subtotal ( {props.getItemNumberString() } )</span>
                <span className={'orderSummaryPrice'}>${discountedSubTotal}</span>
            </div>
        )
    }







    return (
        <React.Fragment>
            <div className={'orderSummaryBox'}>
                <div>
                    <span className={'orderSummaryLabel'}>Subtotal ( {props.getItemNumberString() } )</span>
                    <span className={'orderSummaryPrice'}>${subTotal}</span>
                </div>
                {displayDiscountedSubTotal()}
                <div className={'marginTop5'}>
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