import StoreInterface from '../StoreInterface'
import RootStore from '..'
import AuthenticationService from '../../services/AuthenticationService'
import { makeAutoObservable } from 'mobx'
import { Form, FormField } from './../../models/forms'
import { ApiException } from '../../api/ApiClient'

export type LoginResult = 'SUCCESS' | 'INCORRECT_CREDENTIALS' | 'ERROR' | undefined

class LoginStore implements StoreInterface {
    rootStore: RootStore

    private _submitting: boolean = false
    get submitting() { return this._submitting }
    private set submitting(value) { this._submitting = value }

    private _loginResult: LoginResult
    get loginResult() { return this._loginResult }
    private set loginResult(value) { this._loginResult = value }

    form = new Form({
        username: new FormField([{ type: 'required' }]),
        password: new FormField([{ type: 'required' }])
    }, () => { this.loginResult = undefined })

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    submit = async(): Promise<LoginResult> => {
        this.submitting = true
        this.loginResult = undefined

        const username = this.form.fields.username.value
        const password = this.form.fields.password.value
        try {
            await AuthenticationService.login(username, password)
            this.loginResult = AuthenticationService.isLoggedIn() ? 'SUCCESS' : 'INCORRECT_CREDENTIALS'
        } catch (exception) {
            this.loginResult = (exception as ApiException)?.status == 401 ? 'INCORRECT_CREDENTIALS' : 'ERROR'
        } finally {
            this.submitting = false
            return this.loginResult
        }
    }
}

export default LoginStore