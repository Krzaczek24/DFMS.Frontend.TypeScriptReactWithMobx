import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import AuthenticationService, { Role } from '../services/FakeAuthenticationService'

type ProtectedProps = {
    element: ReactElement,
    roles?: Array<Role>,
    permissions?: Array<string>
    notAllowedPathOrElement?: string | ReactElement
}

const ProtectedRoute = ({element, roles, permissions, notAllowedPathOrElement}: ProtectedProps): ReactElement => {
    const { isLoggedIn, user } = AuthenticationService
    if (!isLoggedIn()
    || (roles && roles.length > 0 && roles.every((role) => user.role !== role))
    || (permissions && permissions.length > 0 && !user.hasAnyPermission(permissions))) {
        if (notAllowedPathOrElement === undefined) {
            return <Navigate to='/' />
        } else if (typeof notAllowedPathOrElement === 'string') {
            return <Navigate to={notAllowedPathOrElement} />
        } else {
            return notAllowedPathOrElement
        }
    }
    return element
}

export default ProtectedRoute