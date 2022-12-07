import { observer } from 'mobx-react-lite'
import { Navigate, Route, Routes } from 'react-router-dom'
import GreetingPage from '../../../pages/guest/GreetingPage'
import LoginPage from '../../../pages/guest/LoginPage'
import RegisterPage from '../../../pages/guest/RegisterPage'

const UnauthorizedRouter = observer(() => (
    <>
      <div className='guest-content-container'>
        <Routes>
          <Route path='/' element={<GreetingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegisterPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  ))
  
  export default UnauthorizedRouter