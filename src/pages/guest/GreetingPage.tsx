import './guest-pages.scss'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GreetingPage = () => {
    const { t } = useTranslation()

    return (
        <div className='guest-container'>
            <Container className='guest-grid'>
                <Row className='guest-logo'>
                    <Col>
                        <Link to='/'>
                            <span className='logo'>
                                DFMS
                            </span>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span className='guest-subtitle'>
                            {t('guest-screen.subtitle')}
                        </span>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-5'>
                    <Col>
                        <Link to='/login'>
                            <Button variant='primary' size='lg' className='w-100'>
                                {t('guest-screen.login')}
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                        <Link to='/registration'>
                            <Button variant='secondary' size='lg' className='w-100'>
                                {t('guest-screen.registration')}
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