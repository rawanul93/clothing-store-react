import React from 'react'
import './header-styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg' //basically importing the svg which is a react component and getting as a Logo component
import { Link } from 'react-router-dom'

const Header = () => {
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
            </div>
            
        </div>
    )
}

export default Header;
