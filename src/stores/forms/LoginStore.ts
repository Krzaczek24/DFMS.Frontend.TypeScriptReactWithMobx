import StoreInterface from '../StoreInterface'
import RootStore from '..'
import AuthenticationService from '../../services/AuthenticationService'
import { makeAutoObservable } from 'mobx'
import { Form, FormField } from './../../models/forms'

export type LoginResult = 'SUCCESS' | 'INCORRECT_CREDENTIALS' | 'ERROR' | undefined

class LoginStore implements StoreInterface {
    rootStore: RootStore

    private _submitting: boolean = false
    get submitting() { return this._submitting }
    private set submitting(value) { this._submitting = value }

    form = new Form({
        username: new FormField([{ type: 'required' }]),
        password: new FormField([{ type: 'required' }])
    }, () => { this.result = undefined })

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    private _result: LoginResult
    get result(): LoginResult { return this._result }
    private set result(value: LoginResult) { this._result = value }

    submit = async(): Promise<LoginResult> => {
        this._submitting = true

        const username = this.form.fields.username.value
        const password = this.form.fields.password.value
        try {
            await AuthenticationService.login(username, password)
            return this.result = AuthenticationService.isLoggedIn() ? 'SUCCESS' : 'INCORRECT_CREDENTIALS'
        } catch {
            return this.result = 'ERROR'
        } finally {
            this.submitting = false
        }
    }
}

export default LoginStore