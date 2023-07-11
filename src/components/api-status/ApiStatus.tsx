import './api-status.scss'
import { Observer } from 'mobx-react'
import { InputGroup } from 'react-bootstrap'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import { useStores } from './../../stores'

const ApiStatus = () => {
    const { pingStore } = useStores()
    const { t } = useTranslation()
    const dotId = 'api-status-dot'
    return (
        <Observer>
            {() => (
                <div className='api-status-container'>
                    <InputGroup size='lg'>
                        <InputGroup.Text>
                            {t('common.api-status.label')}
                        </InputGroup.Text>
                        <InputGroup.Text>
                            <span
                                id={dotId}
                                className={`dot ${pingStore.isAlive ? 'green' : 'red'}${pingStore.playAnimation ? ' animate' : ''}`}
                                data-tooltip-content={t(`common.api-status.description.${pingStore.isAlive ? 'alive' : 'dead'}`)}
                            />
                        </InputGroup.Text>
                    </InputGroup>
                    <Tooltip
                        anchorId={dotId}
                        variant='info'
                        place='top'
                        offset={5}
                    />
                </div>
            )}
        </Observer>
    )
}

export default ApiStatus