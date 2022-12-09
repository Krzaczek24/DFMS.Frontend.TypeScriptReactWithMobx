import { useTranslation } from 'react-i18next'
import { Button, Col, Container, InputGroup, Form, Row } from 'react-bootstrap'
import { FaAt, FaKey, FaLock, FaPen, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useStores } from '../../stores'
import { Observer } from 'mobx-react'

const RegisterPage = () => {
    const { registrationStore } = useStores()
    const { t } = useTranslation()
    const s = (translation: string) => String(t(translation))

    const submit = async () => {
        const registerResult = await registrationStore.submit()
        switch (registerResult)
        {
            case 'SUCCESS':
                break;
            case 'FAILURE':
                break;
            default:
                break;
        }
    }

    const columnWidth = 6
    const buttonWidth = 7

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
                            {t('registration.subtitle')}
                        </span>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={columnWidth}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='username'>
                                <FaUser />
                            </InputGroup.Text>
                            <Observer>
                                {() => 
                                    <Form.Control 
                                        placeholder={s('registration.form.username')} 
                                        aria-describedby='username' 
                                        autoComplete='username'
                                        value={registrationStore.username}
                                        onChange={e => registrationStore.username = e.target.value}/>
                                }
                            </Observer>
                        </InputGroup>
                    </Col>
                    <Col md={columnWidth}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='email'>
                                <FaAt />
                            </InputGroup.Text>
                            <Observer>
                                {() => 
                                    <Form.Control 
                                        placeholder={s('registration.form.email')} 
                                        aria-describedby='email' 
                                        autoComplete='email' 
                                        type='email'
                                        value={registrationStore.email}
                                        onChange={e => registrationStore.email = e.target.value}/>
                                }
                            </Observer>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={columnWidth}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='password'>
                                <FaKey />
                            </InputGroup.Text>
                            <Observer>
                                {() => 
                                    <Form.Control 
                                        placeholder={s('registration.form.password')} 
                                        aria-describedby='password' 
                                        autoComplete='off' 
                                        type='password'
                                        value={registrationStore.password}
                                        onChange={e => registrationStore.password = e.target.value}/>
                                }
                            </Observer>
                        </InputGroup>
                    </Col>
                    <Col md={columnWidth}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='repeat-password'>
                                <FaLock />
                            </InputGroup.Text>
                            <Observer>
                                {() => 
                                    <Form.Control 
                                        placeholder={s('registration.form.repeat-password')} 
                                        aria-describedby='repeat-password' 
                                        autoComplete='off' 
                                        type='password'/>
                                }
                            </Observer>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={columnWidth}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='first-name'>
                                <FaPen />
                            </InputGroup.Text>
                            <Observer>
                                {() => 
                                    <Form.Control 
                                        placeholder={s('registration.form.firstname')} 
                                        aria-describedby='first-name' 
                                        autoComplete='given-name'
                                        value={registrationStore.firstName}
                                        onChange={e => registrationStore.firstName = e.target.value}/>
                                }
                            </Observer>
                        </InputGroup>
                    </Col>
                    <Col md={columnWidth}>
                        <InputGroup size='lg'>
                            <InputGroup.Text id='last-name'>
                                <FaPen />
                            </InputGroup.Text>
                            <Observer>
                                {() => 
                                    <Form.Control 
                                        placeholder={s('registration.form.lastname')} 
                                        aria-describedby='last-name' 
                                        autoComplete='family-name'
                                        value={registrationStore.lastName}
                                        onChange={e => registrationStore.lastName = e.target.value}/>
                                }
                            </Observer>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col className='d-grid gap-2' md={buttonWidth}>
                        <Button variant='primary' size='lg' onClick={submit}>
                            {t('registration.form.register')}
                        </Button>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={buttonWidth-1}>
                        <hr />
                        {t('registration.form.account-question') + ' '}
                        <Link to='/login' className='form-link'>
                            {t('registration.form.login')}
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default RegisterPage