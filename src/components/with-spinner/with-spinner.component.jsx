import React from 'react'
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = (WrappedComponent) => {//WithSpinner is the HOC we're creating that takes in a regular component (we call it WrappedComponent),
    const Spinner = ({ isLoading, ...otherProps}) => { //the WithSpinner with the component we pass in is a HOC that will return a functional component which in this case we name Spinner, that either returns a loading spinner, or just the wrapped component itself.
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer /> 
            </SpinnerOverlay>
        ) :
        <WrappedComponent {...otherProps}/> //otherprops has all the props we originally passed into the WrappedComponent.
    }

    return Spinner;
}

export default WithSpinner;
