import { useTranslation } from 'react-i18next'
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { FaAt, FaKey, FaLock, FaPen, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useStores } from './../../stores'
import { RegistrationResult } from './../../stores/forms/RegistrationFormStore'
import FormField from './../../components/form-field/FormField'
import { Observer } from 'mobx-react'

type ResultAlert = {
    variant: 'success' | 'warning' | 'danger'
    message: string
} | undefined

export const RegisterPage = () => {
    const { registrationFormStore, authenticationStore } = useStores()
    const { t } = useTranslation()
    const s = (translation: string) => String(t(translation))

    const submit = async () => {
        if (!registrationFormStore.form.isValid) {
            registrationFormStore.form.revealInvalid()
            return
        }

        await authenticationStore.register()

        if (registrationFormStore.result === RegistrationResult.Success) {
            registrationFormStore.form.clearAllFields()
        }
    }

    const getAlertData = (): ResultAlert => {
        switch (registrationFormStore.result) {
            case RegistrationResult.Success:
                return { variant: 'success', message: t('registration.messages.success') }
            case RegistrationResult.UsernameAlreadyTaken:
                return { variant: 'warning', message: t('registration.messages.username-already-taken') }
            case RegistrationResult.Failure:
                return { variant: 'danger', message: t('registration.messages.failure') }
        }
    }

    const getAlert = () => {
        const data = getAlertData()
        if (data) {
            return (
                <Alert className='py-2 mb-0' variant={data.variant}>
                    {data.message}
                </Alert>
            )
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
                        <Observer>
                            {() => (
                                <FormField
                                    icon={<FaUser />}
                                    field={registrationFormStore.form.fields.username}
                                    size='lg'
                                    placeholder={s('registration.form.username')}
                                    tooltip-variant='error'
                                    auto-complete='username'
                                    center-text
                                    show-tooltip
                                    disabled={registrationFormStore.submitting}
                                />
                            )}
                        </Observer>
                    </Col>
                    <Col md={columnWidth}>
                        <Observer>
                            {() => (
                                <FormField
                                    icon={<FaAt />}
                                    field={registrationFormStore.form.fields.email}
                                    size='lg'
                                    placeholder={s('registration.form.email')}
                                    tooltip-variant='error'
                                    auto-complete='email'
                                    center-text
                                    show-tooltip
                                    disabled={registrationFormStore.submitting}
                                />
                            )}
                        </Observer>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={columnWidth}>
                        <Observer>
                            {() => (
                                <FormField
                                    icon={<FaKey />}
                                    field={registrationFormStore.form.fields.password}
                                    size='lg'
                                    placeholder={s('registration.form.password')}
                                    tooltip-variant='error'
                                    auto-complete='off'
                                    type='password'
                                    center-text
                                    show-tooltip
                                    disabled={registrationFormStore.submitting}
                                />
                            )}
                        </Observer>
                    </Col>
                    <Col md={columnWidth}>
                        <Observer>
                            {() => (
                                <FormField
                                    icon={<FaLock />}
                                    field={registrationFormStore.form.fields.repeatPassword}
                                    size='lg'
                                    placeholder={s('registration.form.repeat-password')}
                                    tooltip-variant='error'
                                    auto-complete='off'
                                    type='password'
                                    center-text
                                    show-tooltip
                                    disabled={registrationFormStore.submitting}
                                    custom-validation-tooltips={{
                                        "the-same-as": s('validation.the-same-passwords')
                                    }}
                                />
                            )}
                        </Observer>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={columnWidth}>
                        <Observer>
                            {() => (
                                <FormField
                                    icon={<FaPen />}
                                    field={registrationFormStore.form.fields.firstName}
                                    size='lg'
                                    placeholder={s('registration.form.firstname')}
                                    tooltip-variant='error'
                                    auto-complete='given-name'
                                    center-text
                                    show-tooltip
                                    disabled={registrationFormStore.submitting}
                                />
                            )}
                        </Observer>
                    </Col>
                    <Col md={columnWidth}>
                        <Observer>
                            {() => (
                                <FormField
                                    icon={<FaPen />}
                                    field={registrationFormStore.form.fields.lastName}
                                    size='lg'
                                    placeholder={s('registration.form.lastname')}
                                    tooltip-variant='error'
                                    auto-complete='family-name'
                                    center-text
                                    show-tooltip
                                    disabled={registrationFormStore.submitting}
                                />
                            )}
                        </Observer>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col className='d-grid' md={buttonWidth}>
                        <Observer>
                            {() => (
                                <Button variant='primary' size='lg' onClick={submit} disabled={registrationFormStore.submitting}>
                                    {registrationFormStore.submitting ?
                                        <span>{t('common.please-wait')} <Spinner animation="border" variant="light" size="sm" /></span> :
                                        <span>{t('registration.form.register')}</span>
                                    }
                                </Button>
                            )}
                        </Observer>
                    </Col>
                </Row>
                <Observer>
                    {() => {
                        if (!registrationFormStore.result) {
                            return (<></>)
                        }

                        return (
                            <Row className='justify-content-md-center pt-3'>
                                <Col md={buttonWidth}>
                                    {getAlert()}
                                </Col>
                            </Row>
                        )
                    }}
                </Observer>
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