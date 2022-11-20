import { ReactElement } from 'react'
import { Route, Navigate } from 'react-router-dom'
import AuthenticationService from '../services/AuthenticationService'

type ProtectedRouteProps = {
    path: string,
    element: ReactElement,
    roles?: Array<string>,
    permissions?: Array<string>,
    notAllowedElement?: string
}

const ProtectedRoute = ({path, element, roles, permissions, notAllowedElement, ...rest }: ProtectedRouteProps) => (
    <Route path={path} element={xyz()} {...rest}>
        {/* {(() => {
            const { isLoggedIn, user } = AuthenticationService
            if (!isLoggedIn()
            || (roles && roles.length > 0 && roles.every(role => user.role !== role))
            || (permissions && permissions.length > 0 && !user.hasAnyPermission(permissions))) {
                return notAllowedElement ?? <Route path={path} element={notAllowedElement ?? <Navigate to='/' />} />
            }
            return element
        })()} */}
    </Route>
)

export default ProtectedRoute

const xyz = (): ReactElement => (
    <Navigate to='/' />
)