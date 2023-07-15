import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'
import Loader from './components/loader/Loader'
import ApiStatus from './components/api-status/ApiStatus'
import LanguageSelector from './components/language/LanguageSelector';
import AppRouter from './components/navigation/routing/AppRouter'

const App = () => {
  return (
    <>
      <Loader />
      <ApiStatus/>
      <LanguageSelector />      
      <AppRouter />
    </>
  )
}

export default App