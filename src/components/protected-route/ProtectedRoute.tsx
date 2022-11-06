import React, { ReactElement } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from '../../pages/Main'
import SiteA from '../../pages/SiteA'
import SiteB from '../../pages/SiteB'
import { AuthenticationService } from '../../services/AuthenticationService'

type ProtectedRouteProps = {
    path: string,
    component: ReactElement,
    roles: Array<string> | null,
    permissions: Array<string> | null
}

export const ProtectedRoute = ({ path, component, roles = null, permissions = null, ...rest }: ProtectedRouteProps) => (
    <Route path={path} {...rest}>
        {(() => {
            const { isLoggedIn, user } = AuthenticationService
            if (isLoggedIn()) {
                if (roles && roles.length > 0) {

                }
                if (permissions && permissions.length > 0) {

                }
                <Navigate to={path}/>
            }
            return <Navigate to='/' />
        })()}
    </Route>
)