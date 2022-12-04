import './../styles/greeting.scss'
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
                <Row className='greeting-buttons justify-content-md-center mt-5'>
                    <Col md={5}>
                        <Link to='/login'>
                            <Button variant='primary' size='lg'>
                                {t('greeting.login')}
                            </Button>
                        </Link>
                    </Col>
                    <Col md={1}/>
                    <Col md={5}>
                        <Link to='/registration'>
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