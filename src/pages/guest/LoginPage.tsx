import './guest-pages.scss'
import 'react-tooltip/dist/react-tooltip.css'
import { useStores } from '../../stores'
import { useTranslation } from 'react-i18next'
import { Observer } from 'mobx-react'
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaKey, FaUser } from 'react-icons/fa'
import FormField from '../../components/form-field/FormField'

type ResultAlert = {
    variant: 'success' | 'warning' | 'danger'
    message: string
} | undefined

const LoginPage = () => {
    const navigate = useNavigate()
    const { loginStore } = useStores()
    const { t } = useTranslation()
    const s = (translationKey: string): string => String(t(translationKey))

    const submit = async () => {
        if (!loginStore.form.isValid) {
            loginStore.form.revealInvalid()
            return
        }

        if (await loginStore.submit() === 'SUCCESS') {
            navigate('/')
        }
    }

    const getAlertData = (): ResultAlert => {
        switch (loginStore.loginResult) {
            case 'INCORRECT_CREDENTIALS':
                return { variant: 'warning', message: t('login.messages.incorrect-credentials') }
            case 'ERROR':
                return { variant: 'danger', message: t('login.messages.error') }
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

    const width = 7

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
                            {t('login.subtitle')}
                        </span>
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={width}>
                        <FormField
                            icon={<FaUser />}
                            field={loginStore.form.fields.username}
                            size='lg'
                            placeholder={s('login.form.username')}
                            tooltip-place='right'
                            tooltip-variant='error'
                            auto-complete='username'
                            center-text
                            show-tooltip
                        />
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col md={width}>
                        <FormField
                            icon={<FaKey />}
                            field={loginStore.form.fields.password}
                            type='password'
                            size='lg'
                            placeholder={s('login.form.password')}
                            tooltip-place='right'
                            tooltip-variant='error'
                            auto-complete='current-password'
                            center-text
                            show-tooltip
                        />
                    </Col>
                </Row>
                <Row className='justify-content-md-center pt-3'>
                    <Col className='d-grid' md={width}>
                        <Observer>
                            {() => (
                                <Button variant='primary' size='lg' onClick={submit} disabled={loginStore.submitting}>
                                    {loginStore.submitting ?
                                        <span>{t('common.please-wait')} <Spinner animation="border" variant="light" size="sm" /></span> :
                                        <span>{t('login.form.sign-in')}</span>
                                    }
                                </Button>
                            )}
                        </Observer>
                    </Col>
                </Row>
                <Observer>
                    {() => {
                        if (!loginStore.loginResult || loginStore.loginResult === 'SUCCESS') {
                            return (<></>)
                        }
                        
                        return (
                            <Row className='justify-content-md-center pt-3'>
                                <Col md={width}>
                                    {getAlert()}
                                </Col>
                            </Row>
                        )
                    }}
                </Observer>
                
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