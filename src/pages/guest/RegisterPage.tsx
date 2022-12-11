import { useTranslation } from 'react-i18next'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { FaAt, FaKey, FaLock, FaPen, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useStores } from '../../stores'
import FormField from '../../components/form-field/FormField'

const RegisterPage = () => {
    const navigate = useNavigate()
    const { registrationStore } = useStores()
    const { t } = useTranslation()
    const s = (translation: string) => String(t(translation))

    const submit = async () => {
        if (!registrationStore.form.isValid) {
            registrationStore.form.revealInvalid()
            return
        }

        if (await registrationStore.submit() === 'SUCCESS') {
            navigate('/')
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
                        <FormField
                            icon={<FaUser />}
                            field={registrationStore.form.fields.username}
                            size='lg'
                            placeholder={s('registration.form.username')}
                            tooltip-variant='error'
                            auto-complete='username'
                            center-text
                            show-tooltip
                        />
                    </Col>
                    <Col md={columnWidth}>
                        <FormField
                            icon={<FaAt />}
                            field={registrationStore.form.fields.email}
                            size='lg'
                            placeholder={s('registration.form.email')}
                            tooltip-variant='error'
                            auto-complete='email'
                            center-text
                            show-tooltip
                        />
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={columnWidth}>
                        <FormField
                            icon={<FaKey />}
                            field={registrationStore.form.fields.password}
                            size='lg'
                            placeholder={s('registration.form.password')}
                            tooltip-variant='error'
                            auto-complete='off'
                            type='password'
                            center-text
                            show-tooltip
                        />
                    </Col>
                    <Col md={columnWidth}>
                        <FormField
                            icon={<FaLock />}
                            field={registrationStore.form.fields.repeatPassword}
                            size='lg'
                            placeholder={s('registration.form.repeat-password')}
                            tooltip-variant='error'
                            auto-complete='off'
                            type='password'
                            center-text
                            show-tooltip
                            custom-validation-tooltips={{
                                "the-same-as": s('validation.the-same-passwords')
                            }}
                        />
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={columnWidth}>
                        <FormField
                            icon={<FaPen />}
                            field={registrationStore.form.fields.firstName}
                            size='lg'
                            placeholder={s('registration.form.firstname')}
                            tooltip-variant='error'
                            auto-complete='given-name'
                            center-text
                            show-tooltip
                        />
                    </Col>
                    <Col md={columnWidth}>
                        <FormField
                            icon={<FaPen />}
                            field={registrationStore.form.fields.lastName}
                            size='lg'
                            placeholder={s('registration.form.lastname')}
                            tooltip-variant='error'
                            auto-complete='family-name'
                            center-text
                            show-tooltip
                        />
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col className='d-grid' md={buttonWidth}>
                        <Button variant='primary' size='lg' onClick={submit} disabled={registrationStore.submitting}>
                            {registrationStore.submitting ?
                                <span>{t('common.please-wait')} <Spinner animation="border" variant="light" size="sm" /></span> :
                                <span>{t('registration.form.register')}</span>
                            }
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