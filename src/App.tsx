import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'
import Loader from './components/loader/Loader'
import LanguageSelector from './components/language/LanguageSelector';
import AppRouter from './components/navigation/routing/AppRouter'
import { useEffect } from 'react'
import TokenManager, { TokenType } from './tools/TokenManager'
import { useStores } from './stores'

const App = () => {
  const { authenticationStore, loaderStore } = useStores()

  useEffect(() => {
    const refreshToken = TokenManager.getKey(TokenType.Refresh)
    if (!authenticationStore.isAuthenticated && refreshToken) {
      loaderStore.showWithBackground()
      authenticationStore.refreshToken(refreshToken).finally(() => {
        loaderStore.hide()
      })
    }
  }, [authenticationStore, loaderStore])

  return (
    <>
      <Loader />
      {/* <ApiStatus/> */}
      <LanguageSelector />      
      <AppRouter />
    </>
  )
}

export default App