import 'bootstrap/dist/css/bootstrap.min.css'
import './app.scss'
import { observer } from 'mobx-react-lite';
import SelectLanguage from './components/SelectLanguage';
import AppRouter from './components/navigation/routing/AppRouter'

const App = observer(() => (
  <>
    <SelectLanguage />
    <AppRouter />
  </>
))

export default App