import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/app.scss'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import GreetingPage from './pages/GreetingPage'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthenticationService from './services/AuthenticationService';
import FakeAuthenticationService from './services/FakeAuthenticationService';
import ProtectedRoute from './components/ProtectedRoute'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  if (false) {
    console.log('Showing authorized user app')
    return (
      <>
        <div className='navbar-container'>
          <Navbar />
        </div>
        <div className='content-container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            {/* <ProtectedRoute path='/protected' element={<SiteA />} /> */}
            {/* <Route path='/protected'>
              {(() => {
                  const { isLoggedIn, user } = AuthenticationService
                  const roles = ['raz']
                  const permissions = ['dwa']
                  if (!isLoggedIn()
                  || (roles && roles.length > 0 && roles.every(role => user.role !== role))
                  || (permissions && permissions.length > 0 && !user.hasAnyPermission(permissions))) {
                    //return <Route path='/protected' element={<Navigate to='guest' />} />
                  }
                  return <SiteB />
              })()}
            </Route> */}
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </>
    )
  }

  console.log('Showing unauthorized user app')
  return (
    <div className='guest-content-container'>
      <Routes>
        <Route path='/' element={<GreetingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
})

export default App