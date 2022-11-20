import './../styles/greeting.scss'
import AuthenticationService from '../services/FakeAuthenticationService';
import { useTranslation } from 'react-i18next'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GreetingPage = () => {
    const { t } = useTranslation()

    return (
        <div className='greeting-container'>
            <Container className='greeting-grid'>
                <Row className='greeting-logo'>
                    <Col>
                        <Link to='/'>
                            <span className='logo'>
                                DFMS
                            </span>
                        </Link>
                    </Col>
                </Row>
                <Row className='greeting-text'>
                    <Col>
                        <span>
                            {t('greeting.subtitle')}
                        </span>
                    </Col>
                </Row>
                <Row className='greeting-buttons justify-content-md-center mt-5' xs='auto'>
                    <Col>
                        <Link to='/login'>
                            <Button variant='primary' size='lg'>
                                {t('greeting.login')}
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={1}/>
                    <Col>
                        <Link to='/register'>
                            <Button variant='secondary' size='lg'>
                                {t('greeting.registration')}
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