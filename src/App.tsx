import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/app.scss'
import AuthenticationService from './services/AuthenticationService';
import { observer } from 'mobx-react-lite';
import AuthorizedRouter from './components/navigation/AuthorizedRouter'
import UnauthorizedRouter from './components/navigation/UnauthorizedRouter'
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