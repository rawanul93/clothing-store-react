import styled from 'styled-components'; 
import { Link } from 'react-router-dom';

// const OptionContainerStyles = css` /*this css allows us to write a block of css which we can pass anywhere. So this is useful for components that have the same style.*/
//     padding: 10px 15px;
//     cursor: pointer;
// `

export const HeaderContainer  = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)` /*Now this is a styled Link component*/
    height: 100%;
    width: 70px;
    padding: 25px;
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

//for the options. Some options are links and some are divs. Since they both have the same styles, we stored them in a const called OptionContainerStyles.
export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`
// export const OptionDiv = styled.div`
//     ${OptionContainerStyles}
// `