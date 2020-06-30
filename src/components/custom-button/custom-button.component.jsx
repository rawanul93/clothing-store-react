import React from 'react'
import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps}) => {
    return (
        <button className={`${ inverted ? 'inverted' : ''} ${ isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}> {/*passing in the type='submit'  */}
            {children} {/* getting all the children that our custom button has */}
        </button>
    )
}

export default CustomButton;
