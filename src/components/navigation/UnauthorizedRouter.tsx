import { observer } from 'mobx-react-lite'
import { Navigate, Route, Routes } from 'react-router-dom'
import SelectLanguage from '../SelectLanguage'
import GreetingPage from '../../pages/GreetingPage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'

const UnauthorizedRouter = observer(() => (
    <>
      <div className='guest-content-container'>
        <Routes>
          <Route path='/' element={<GreetingPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  ))
  
  export default UnauthorizedRouter