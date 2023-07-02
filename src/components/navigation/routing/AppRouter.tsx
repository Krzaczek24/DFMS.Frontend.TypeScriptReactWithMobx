import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { GreetingPage, HomePage, LoginPage, RegisterPage } from './../../../pages'
import Navbar from '../Navbar'
import { useStores } from '../../../stores'
import { Observer } from 'mobx-react'

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
                            <Route path='/protected' element={<ProtectedRoute roles={['ADMIN']} permissions={['TESTOWE_PRAWO']} element={<LoginPage />} />} />
                            <Route path='*' element={<Navigate to='/' />} />
                        </Routes>
                    </div>
                </>
            )}
        </Observer>
    )
}

export default AppRouter