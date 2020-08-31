import React from 'react'
// import './custom-button.styles.scss'
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({children, ...props}) => {
    return (
        <CustomButtonContainer {...props}>
            {children} {/* getting all the children that our custom button has */}
        </CustomButtonContainer>
    )
}

export default CustomButton;
