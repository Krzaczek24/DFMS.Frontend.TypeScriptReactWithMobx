import { ReactElement } from "react"
import { Navigate } from "react-router-dom"
import { useStores } from "../../../stores"
import { Role } from "../../../stores/AuthenticationStore"

type ProtectedProps = {
    element: ReactElement,
    roles?: Array<Role>,
    permissions?: Array<string>
    notAllowedPathOrElement?: string | ReactElement
}

const ProtectedRoute = ({element, roles, permissions, notAllowedPathOrElement}: ProtectedProps): ReactElement => {
    const { authenticationStore } = useStores()
    const { user } = authenticationStore
    if (!authenticationStore.isAuthenticated
    || (roles && roles.length > 0 && roles.every((role) => user!.role !== role))
    || (permissions && permissions.length > 0 && !user!.hasAnyPermission(permissions))) {
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