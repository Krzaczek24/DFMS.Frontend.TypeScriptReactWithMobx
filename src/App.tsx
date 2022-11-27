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
import SelectLanguage from './components/SelectLanguage'

const App = observer(() => {
  if (FakeAuthenticationService.isLoggedIn()) {
    return (
      <>
        <div className='navbar-container'>
          <Navbar />
        </div>
        <div className='language-container'>
          <SelectLanguage value="en" onChange={() => { }} />
        </div>
        <div className='content-container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/protected' element={<ProtectedRoute roles={['ADMIN']} permissions={['TESTOWE_PRAWO']} element={<LoginPage />} />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='language-container'>
        <SelectLanguage value="en" onChange={() => { }} />
      </div>
      <div className='guest-content-container'>
      <Routes>
        <Route path='/' element={<GreetingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
    </>
  )
})

export default App