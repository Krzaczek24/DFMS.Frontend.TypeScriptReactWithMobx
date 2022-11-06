import './style.css'
//import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { AuthenticationService } from '../../services/AuthenticationService';

export default function Navbar() {
    return (
        <div className='Navbar'>
            {/* <p>
                {useResolvedPath(to)}
                useMatch({ path: resolvedPath.pathname, end: true})
            </p> */}
            <NavLink to='/' className={x => getClass(x.isActive)}>
                Strona główna
            </NavLink>
            <NavLink to='/site-a' className={x => getClass(x.isActive)}>
                Strona A
            </NavLink>
            <NavLink to='/site-b' className={x => getClass(x.isActive)}>
                Strona B
            </NavLink>
        </div>
    );
}

const getClass = (isActive: boolean) => {
    let classes = ['navbar-link']
    if (isActive)
        classes.push('active')
    return classes.join(' ')
}