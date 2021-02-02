import React from 'react';
import '../style/CheckoutStep.css';

const CheckoutStep = () => {
    return (
        <div>
            <ol class="breadcrumb">
                <li><a href="/cart">Cart</a></li>
                <li class="active"><span>Shipping Information</span></li>
            </ol>
        </div>
    );
};

export default CheckoutStep;