import React from 'react'
import './custom-button.styles.scss'

const CustomButton = ({ children, ...otherProps}) => {
    return (
        <button className='custom-button' {...otherProps}> {/*passing in the type='submit'  */}
            {children} {/* getting all the children that our custom button has */}
        </button>
    )
}

export default CustomButton;
