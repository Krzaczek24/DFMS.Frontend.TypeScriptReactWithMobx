import './api-status.scss'
import { Observer } from 'mobx-react'
import { InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useStores } from '../../stores'

const ApiStatus = () => {
    const { technicalStore } = useStores()
    const { t } = useTranslation()
    return (
        <Observer>
            {() => (
                <div className='api-status-container'>
                    <InputGroup size='lg'>
                        <InputGroup.Text id='api-status-label'>
                            {t('common.api-status-label')}
                        </InputGroup.Text>
                        <InputGroup.Text id='api-status-dot'>
                            <span className={`dot ${technicalStore.isAlive ? 'green' : 'red'}${technicalStore.playAnimation ? ' animate' : ''}`} />
                        </InputGroup.Text>
                    </InputGroup>
                </div>
            )}
        </Observer>
    )
}

export default ApiStatus