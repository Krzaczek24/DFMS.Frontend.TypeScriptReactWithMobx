import StoreInterface from '../StoreInterface'
import RootStore from '..'
import AuthenticationService from '../../services/AuthenticationService'
import { makeAutoObservable } from 'mobx'
import { Form, FormField } from '../../models/forms'

export type RegisterResult = 'SUCCESS' | 'ERROR' | 'FAILURE' | undefined

class RegistrationStore implements StoreInterface {
    rootStore: RootStore

    private _submitting: boolean = false
    get submitting() { return this._submitting }
    private set submitting(value) { this._submitting = value }

    private _result: RegisterResult
    get result(): RegisterResult { return this._result }
    private set result(value: RegisterResult) { this._result = value }

    form = new Form({
        username: new FormField([{ type: 'required' }, { type: 'min-length', restriction: 3 }]),
        password: new FormField([{ type: 'required' }, { type: 'password' }]),
        repeatPassword: new FormField([{ type: 'the-same-as', restriction: 'password' }]),
        firstName: new FormField([{ type: 'min-length', restriction: 3 }, { type: 'name' }]),
        lastName: new FormField([{ type: 'min-length', restriction: 3 }, { type: 'name' }]),
        email: new FormField([{ type: 'e-mail' }])
    }, () => { this.result = undefined })

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    submit = async(): Promise<RegisterResult> => {
        this._submitting = true

        const username = this.form.fields.username.value
        const password = this.form.fields.password.value
        const email = this.form.fields.email.value
        const firstName = this.form.fields.firstName.value
        const lastName = this.form.fields.lastName.value
        try {
            await AuthenticationService.register(username, password, email, firstName, lastName)
            return AuthenticationService.isLoggedIn() ? 'SUCCESS' : 'FAILURE'
        } catch (exception) {
            return 'ERROR'
        } finally {
            this.submitting = false
        }
    }
}

export default RegistrationStore