import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'
import AuthenticationService from './services/AuthenticationService';
import { observer } from 'mobx-react-lite';
import AuthorizedRouter from './components/navigation/routing/AuthorizedRouter'
import UnauthorizedRouter from './components/navigation/routing/UnauthorizedRouter'
import SelectLanguage from './components/SelectLanguage';

const App = observer(() => (
  <>
    <SelectLanguage value='en' />
    {AuthenticationService.isLoggedIn()
      ? <AuthorizedRouter /> 
      : <UnauthorizedRouter />}
  </>
))

export default App