import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { IconType } from 'react-icons/lib';
import { useStores } from './../../stores'
import { Role } from './../../stores/AuthenticationStore'

type LinkProps = {
    path: string,
    title: any,
    icon?: IconType,
    roles?: Array<Role>,
    permissions?: Array<string>,
    onClick?: () => void,
    className?: string
}

const LinkItem = ({path, title, icon, roles, permissions, onClick, className}: LinkProps): ReactElement => {
    const { authenticationStore } = useStores()
    const { user } = authenticationStore

    if (user?.hasAccess(roles, permissions)) {
        return (
            <li className={className}>
                <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={path} onClick={onClick}>
                    {icon 
                        ? <>{React.createElement(icon)} {title}</>
                        : title}
                </NavLink>
            </li>
        )
    } else {
        return (<></>)
    }
}

export default LinkItem