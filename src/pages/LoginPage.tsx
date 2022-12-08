import './../styles/greeting.scss'
import { useTranslation } from 'react-i18next'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaKey, FaUser } from 'react-icons/fa'
import { useStores } from '../stores'
import { Observer } from 'mobx-react'

const LoginPage = () => {
    const navigate = useNavigate()
    const { loginStore } = useStores()
    const { t } = useTranslation()
    const s = (translation: string) => String(t(translation))

    const submit = async () => {
        const loginResult = await loginStore.submit()
        switch (loginResult)
        {
            case 'SUCCESS':
                navigate('/')
                break;
            case 'FAILURE':
                break;
            default:
                break;
        }
    }

    const width = 7

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
                            {t('login.subtitle')}
                        </span>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={width}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='username'>
                                <FaUser />
                            </InputGroup.Text>
                            <Observer>
                                {() => 
                                    <Form.Control 
                                        placeholder={s('login.form.username')} 
                                        aria-describedby='username' 
                                        autoComplete='username' 
                                        value={loginStore.username} 
                                        onChange={e => loginStore.username = e.target.value}
                                    />
                                }
                            </Observer>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={width}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='password'>
                                <FaKey />
                            </InputGroup.Text>
                            <Observer>
                                {() => 
                                    <Form.Control 
                                        placeholder={s('login.form.password')} 
                                        aria-describedby='password' 
                                        autoComplete='current-password' 
                                        type='password' 
                                        value={loginStore.password}
                                        onChange={e => loginStore.password = e.target.value}
                                    />
                                }
                            </Observer>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col className='d-grid gap-2' md={width}>
                        <Button variant='primary' size='lg' onClick={submit}>
                            {t('login.form.sign-in')}
                        </Button>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={width-1}>
                        <hr />
                        {t('login.form.account-question') + ' '}
                        <Link to='/registration' className='form-link'>
                            {t('login.form.registration')}
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LoginPage