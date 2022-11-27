import './../styles/navbar.scss'
//import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { Link, Navigate } from 'react-router-dom'
import { FaPowerOff, FaUser } from 'react-icons/fa'
import AuthenticationService from '../services/FakeAuthenticationService';

const Navbar = () => {
    return (
        <div className='navbar'>
            {/* <p>
                {useResolvedPath(to)}
                useMatch({ path: resolvedPath.pathname, end: true})
            </p> */}
            <ul>
                <li>
                    <Link to='/'>
                        DFMS
                    </Link>
                </li>
                <li>
                    <Link to='/site-a'>
                        <FaUser/> Strona A
                    </Link>
                </li>
                <li>
                    <Link to='/site-b'>
                        <FaPowerOff/> Strona B
                    </Link>
                </li>
                <LinkItem path='site-b' title={<><FaPowerOff/> Logout</>} onClick={AuthenticationService.logout} />
            </ul>
        </div>
    );
}

export default Navbar

const LinkItem = (params: {path: string, title: any, onClick?: () => void}) => {
    return (
        <li>
            <Link to={params.path} onClick={params.onClick}>
                {params.title}
            </Link>
        </li>
    )
}