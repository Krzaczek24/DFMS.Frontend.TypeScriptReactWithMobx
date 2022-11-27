import { observer } from 'mobx-react-lite'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import ProtectedRoute from './ProtectedRoute'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'

const AuthorizedRouter = observer(() => (
    <>
      <Navbar />
      <div className='content-container'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/protected' element={<ProtectedRoute roles={['ADMIN']} permissions={['TESTOWE_PRAWO']} element={<LoginPage />} />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  ))
  
  export default AuthorizedRouter