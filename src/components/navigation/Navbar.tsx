import './navbar.scss'
//import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaPowerOff, FaUser, FaUserFriends } from 'react-icons/fa'
import { IconType } from 'react-icons/lib';
import { useStores } from '../../stores'
import { useTranslation } from 'react-i18next'
import { Observer } from 'mobx-react'

const Navbar = () => {
    const { authenticationStore } = useStores()
    const { t } = useTranslation()

    return (
        <Observer>
            {() => (
                <div className='navbar'>
                    {/* <p>
                        {useResolvedPath(to)}
                        useMatch({ path: resolvedPath.pathname, end: true})
                    </p> */}
                    <ul>
                        <LinkItem path='/' title={'DFMS'} className="main"/>
                        <LinkItem path='/site-a' title='Strona A' icon={FaUser} />
                        <LinkItem path='/site-b' title='Strona B' icon={FaUserFriends} />
                        <LinkItem path='/site-b' title={t('navmenu.logout')} icon={FaPowerOff} onClick={authenticationStore.logout} />
                    </ul>
                </div>
            )}
        </Observer>
    );
}

export default Navbar

const LinkItem = (params: {path: string, title: any, icon?: IconType, onClick?: () => void, className?: string}) => (
    <li className={params.className}>
        <Link to={params.path} onClick={params.onClick}>
            {params.icon 
                ? <>{React.createElement(params.icon)} {params.title}</>
                : params.title}
        </Link>
    </li>
)