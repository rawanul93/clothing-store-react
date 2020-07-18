import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => { 
    const priceForStripe = price*100; //stripe needs to get all the prices in terms of cents. Since we have our prices in dollars, we're gonna convert to cents before passing it to stripe.
    const publishableKey = 'pk_test_51H5gOTCZuTdqFNonlyjRi5DDmHRDFrGcxi552aGHzC08M0oAtomTgCGZG3nAptEtMCSOgWjeq8vRMk0s09lH3LA7009P6muRnI';
    
    const onToken = token => {
        console.log(token); //we pass this token to the backend which then creates the charge to the customer.
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label= 'Pay Now'
            name= 'BD Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken} //on success callback which triggers when we submit
            stripeKey={publishableKey}

        />
    );
};

export default StripeCheckoutButton;
