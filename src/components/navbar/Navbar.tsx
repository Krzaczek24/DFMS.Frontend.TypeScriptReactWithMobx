import './style.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='Navbar'>
            {/* <p>
                {useResolvedPath(to)}
                useMatch({ path: resolvedPath.pathname, end: true})
            </p> */}
            <Link to='/' className='navbar-link'>
                Strona główna
            </Link>
            <Link to='/site-a' className='navbar-link'>
                Strona A
            </Link>
            <Link to='/site-b' className='navbar-link'>
                Strona B
            </Link>
        </div>
    );
}