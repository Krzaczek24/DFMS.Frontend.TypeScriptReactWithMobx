import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Navbar from '../Navbar'
import { useStores } from '../../../stores'
import { Observer } from 'mobx-react'
import { HomePage } from '../../../pages/user/HomePage'
import { GreetingPage } from '../../../pages/guest/GreetingPage'
import { LoginPage } from '../../../pages/guest/LoginPage'
import { RegisterPage } from '../../../pages/guest/RegisterPage'
import { PermissionManagementPage } from '../../../pages/user/PermissionManagementPage'
import { ProfilePage } from '../../../pages/user/ProfilePage'
import { SettingsPage } from '../../../pages/user/SettingsPage'
import { UserManagemenetPage } from '../../../pages/user/UserManagementPage'

const AppRouter = () => {
    const { authenticationStore } = useStores()

    return (
        <Observer>
            {() => (
                <>
                    {authenticationStore.isAuthenticated ? (
                        <div className='navbar-container'>
                            <Navbar />
                        </div>
                    ) : <></>}
                    
                    <div className='content-container'>
                        <Routes>
                            <Route path='/' element={<ProtectedRoute element={<HomePage />} notAllowedPathOrElement={<GreetingPage />} />} />
                            <Route path='/login' element={<ProtectedRoute element={<Navigate to='/' />} notAllowedPathOrElement={<LoginPage />} />} />
                            <Route path='/registration' element={<ProtectedRoute element={<Navigate to='/' />} notAllowedPathOrElement={<RegisterPage />} />} />
                            <Route path='/user-management' element={<ProtectedRoute element={<UserManagemenetPage />} />} />
                            <Route path='/permission-management' element={<ProtectedRoute element={<PermissionManagementPage />} />} />
                            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />} />} />
                            <Route path='/settings' element={<ProtectedRoute element={<SettingsPage />} />} />
                            <Route path='*' element={<Navigate to='/' />} />
                        </Routes>
                    </div>
                </>
            )}
        </Observer>
    )
}

export default AppRouter