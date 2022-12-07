import './navbar.scss'
//import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaPowerOff, FaUser, FaUserFriends } from 'react-icons/fa'
import AuthenticationService from '../../services/AuthenticationService';
import { IconType } from 'react-icons/lib';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <div className='navbar'>
                {/* <p>
                    {useResolvedPath(to)}
                    useMatch({ path: resolvedPath.pathname, end: true})
                </p> */}
                <ul>
                    <LinkItem path='/' title={'DFMS'} />
                    <LinkItem path='/site-a' title='Strona A' icon={FaUser} />
                    <LinkItem path='/site-b' title='Strona B' icon={FaUserFriends} />
                    <LinkItem path='/site-b' title='Logout' icon={FaPowerOff} onClick={AuthenticationService.logout} />
                </ul>
            </div>
        </div>
    );
}

export default Navbar

const LinkItem = (params: {path: string, title: any, icon?: IconType, onClick?: () => void}) => (
    <li>
        <Link to={params.path} onClick={params.onClick}>
            {params.icon 
                ? <>{React.createElement(params.icon)} {params.title}</>
                : params.title}
        </Link>
    </li>
)