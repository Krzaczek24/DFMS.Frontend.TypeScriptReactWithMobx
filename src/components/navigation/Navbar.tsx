import './navbar.scss'
import { FaCogs, FaKey, FaPowerOff, FaUser, FaUserFriends } from 'react-icons/fa'
import { useStores } from '../../stores'
import { useTranslation } from 'react-i18next'
import { Observer } from 'mobx-react'
import LinkItem from './LinkItem'

const Navbar = () => {
    const { authenticationStore } = useStores()
    const { t } = useTranslation()

    return (
        <Observer>
            {() => (
                <div className='navbar'>
                    <ul>
                        <LinkItem path='/' title='DFMS' className='main'/>
                        <LinkItem path='/user-management' title={t('navmenu.users')} icon={FaUserFriends} roles={['ADMIN']} />
                        <LinkItem path='/permission-management' title={t('navmenu.permissions')} icon={FaKey} />
                        <LinkItem path='/profile' title={t('navmenu.profile')} icon={FaUser} />
                        <LinkItem path='/settings' title={t('navmenu.settings')} icon={FaCogs} />
                        <LinkItem path='/logout' title={t('navmenu.logout')} icon={FaPowerOff} onClick={authenticationStore.logout} />
                    </ul>
                </div>
            )}
        </Observer>
    );
}

export default Navbar