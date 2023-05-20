import "bootstrap/dist/css/bootstrap.min.css"
import "./app.scss"
import SelectLanguage from "./components/language/SelectLanguage";
import AppRouter from "./components/navigation/routing/AppRouter"

const App = () => {
  return (
    <>
      <SelectLanguage />
      <AppRouter />
    </>
  )
}

export default App