import React from 'react'
import './header-styles.scss'

import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg' //basically importing the svg which is a react component and getting as a Logo component
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils' //for signing out

const mapState = (state) => ({ //this state we're passing in is the actual root reducer.
    currentUser: state.user.currentUser //state is the rootReducer which has user from userReducer. In userReducer we set the state with currentUser which is initially null. So we can get it like this.
})

const Header = ({ currentUser }) => { //now getting the currentUser as props from mapState instead of our app js.
    return (
        <div className='header'>
            <Link className='logo-container' to="/"> {/* click logo to go back to the home page */}
                <Logo className='logo'/>
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/shop'>
                    CONTACT
                </Link>
                {
                    currentUser ? 
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    : 
                    <Link className='option' to='/signin'>SIGN IN</Link>
                }
            </div>
            
        </div>
    )
}

export default connect(mapState)(Header);
