import './loader.scss'
import { Observer } from 'mobx-react'
import { useStores } from './../../stores'
import Spinner from '../spinner/Spinner'

const Loader = () => {
    const { loaderStore } = useStores()

    return (
        <Observer>
            {() => (
                <div id='loader' className={loaderStore.isTransparent ? 'transparent' : ''} hidden={!loaderStore.isLoading}>
                    <Spinner />
                </div>
            )}
        </Observer>
    )
}

export default Loader