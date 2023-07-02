import React from 'react'
import { NavLink } from 'react-router-dom'
import { IconType } from 'react-icons/lib';

const LinkItem = (params: {path: string, title: any, icon?: IconType, onClick?: () => void, className?: string}) => (
    <li className={params.className}>
        <NavLink className={({isActive}) => (isActive ? 'active' : '')} to={params.path} onClick={params.onClick}>
            {params.icon 
                ? <>{React.createElement(params.icon)} {params.title}</>
                : params.title}
        </NavLink>
    </li>
)

export default LinkItem