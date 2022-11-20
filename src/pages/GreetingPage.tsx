import './../styles/greeting.scss'
import { Container, Row, Col, Button } from 'react-bootstrap';
import AuthenticationService from '../services/FakeAuthenticationService';
import { Link } from 'react-router-dom';
import { LogClickedButtonEvent } from '../helpers/GlobalFunctions';

const GreetingPage = () => {
    return (
        <div className='greeting-container'>
            <Container className='greeting-grid'>
                <Row className='greeting-logo'>
                    <Col>
                        <span className='logo'>
                            DFMS
                        </span>
                    </Col>
                </Row>
                <Row className='greeting-text'>
                    <Col>
                        <span>
                            Witaj w Dynamic Forms Management System
                        </span>
                    </Col>
                </Row>
                <Row className='greeting-buttons justify-content-md-center' xs='auto'>
                    <Col>
                        <Link to='/login'>
                            <Button variant='primary' size='lg' onClick={LogClickedButtonEvent}>
                                Logowanie
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={1}/>
                    <Col>
                        <Link to='/register'>
                            <Button variant='secondary' size='lg' onClick={LogClickedButtonEvent}>
                                Rejestracja
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GreetingPage

//import reportWebVitals from './reportWebVitals'
//reportWebVitals(console.log)