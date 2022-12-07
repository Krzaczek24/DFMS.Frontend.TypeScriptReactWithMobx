import IStore from '../IStore'
import RootStore from '..'
import AuthenticationService from '../../services/AuthenticationService'
import { makeAutoObservable } from 'mobx'
import FormField from './FormField'
import Form from './Form'

export type LoginResult = 'SUCCESS' | 'ERROR' | 'FAILURE'

class LoginStore implements IStore {
    rootStore: RootStore

    form = new Form({
        username: new FormField([{ type: 'Required' }]),
        password: new FormField([{ type: 'Required' }])
    })

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    submit = async(): Promise<LoginResult> => {
        try {
            const username = this.form.fields['username'].value
            const password = this.form.fields['password'].value
            await AuthenticationService.login(username, password)
            return AuthenticationService.isLoggedIn() ? 'SUCCESS' : 'FAILURE'
        } catch {
            return 'ERROR'
        }
    }
}

export default LoginStore