import { observer } from 'mobx-react-lite'
import { Navigate, Route, Routes } from 'react-router-dom'
import GreetingPage from '../../pages/GreetingPage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'

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