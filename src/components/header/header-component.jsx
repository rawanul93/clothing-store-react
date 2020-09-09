import React from 'react'
//import './header-styles.scss'
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg' //basically importing the svg which is a react component and getting as a Logo component
import { auth } from '../../firebase/firebase.utils' //for signing out

//components
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

//selectors
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

const mapState = createStructuredSelector({ //createStructuredSelector passes the state into our selectors automatically and we dont need to pass it as a function either.
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

// const mapState = ({user: { currentUser }, cart: { hidden }}) => ({ //this state we're passing in is the actual root reducer.
//     currentUser: currentUser, //state is the rootReducer which has user from userReducer. In userReducer we set the state with currentUser which is initially null. So we can get it like this.
//     hidden: hidden
// })

const Header = ({ currentUser, hidden }) => { //now getting the currentUser as props from mapState instead of our app js.
    return (
        <HeaderContainer>
            <LogoContainer to="/"> {/* click logo to go back to the home page */}
                <Logo className='logo'/>
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/shop'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ? 
                    <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink> //so if we want this to return a div we just to as='div'. Otherwise it will be a link since thats how we wrote the stuled component.
                    : 
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {hidden && <CartDropdown />} {/* right beneath the options */}
        </HeaderContainer>
    )
}

export default connect(mapState)(Header);
