import logo from './../resources/images/logo.svg'
import './../styles/App.css'
import Button from 'react-bootstrap/Button'

export default function Main() {
    return (
        <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                Learn React
            </a>
        </header>
        <Button variant="primary">
            Button as link
        </Button>
        </div>
    );
}