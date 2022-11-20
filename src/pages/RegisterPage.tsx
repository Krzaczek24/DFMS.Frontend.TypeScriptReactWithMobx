import { useTranslation } from 'react-i18next'
import { Button, Col, Container, InputGroup, Form, Row } from "react-bootstrap"
import { FaUser, FaLock, FaKey } from "react-icons/fa"
import { Link } from "react-router-dom"

const RegisterPage = () => {
    const { t } = useTranslation()
    const s = (translation: string) => String(t(translation))

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
                            {t('registration.subtitle')}
                        </span>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3' xs='auto'>
                    <Col xs={7}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='username'>
                                <FaUser />
                            </InputGroup.Text>
                            <Form.Control placeholder={s('registration.form.username')} aria-describedby='username' autoComplete='username'/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3' xs='auto'>
                    <Col xs={7}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='password'>
                                <FaKey />
                            </InputGroup.Text>
                            <Form.Control placeholder={s('registration.form.password')} aria-describedby='password' autoComplete='off' type='password'/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3' xs='auto'>
                    <Col xs={7}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='repeat-password'>
                                <FaLock />
                            </InputGroup.Text>
                            <Form.Control placeholder={s('registration.form.repeat-password')} aria-describedby='repeat-password' autoComplete='off' type='password'/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='greeting-buttons justify-content-md-center pt-3' xs='auto'>
                    <Col>
                        <Button variant='primary' size='lg'>
                            {t('registration.form.register')}
                        </Button>
                    </Col>
                    <Col xs={1}/>
                    <Col>
                        <Link to='/login'>
                            <Button variant='secondary' size='lg'>
                                {t('registration.form.login')}
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegisterPage