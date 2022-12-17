import StoreInterface from '../StoreInterface'
import RootStore from '..'
import AuthenticationService from '../../services/AuthenticationService'
import { makeAutoObservable } from 'mobx'
import { Form, FormField } from '../../models/forms'
import { RegistrationResult } from '../../api/ApiClient'

export type RegisterResult = RegistrationResult | undefined

class RegistrationStore implements StoreInterface {
    rootStore: RootStore

    private _submitting: boolean = false
    get submitting() { return this._submitting }
    private set submitting(value) { this._submitting = value }

    private _registerResult: RegisterResult = undefined
    get registerResult() { return this._registerResult }
    private set registerResult(value) { this._registerResult = value }

    form = new Form({
        username: new FormField([{ type: 'required' }, { type: 'min-length', restriction: 3 }]),
        password: new FormField([{ type: 'required' }, { type: 'password' }]),
        repeatPassword: new FormField([{ type: 'required' }, { type: 'the-same-as', restriction: 'password' }]),
        firstName: new FormField([{ type: 'min-length', restriction: 3 }, { type: 'name' }]),
        lastName: new FormField([{ type: 'min-length', restriction: 3 }, { type: 'name' }]),
        email: new FormField([{ type: 'e-mail' }])
    }, () => { this.registerResult = undefined })

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    submit = async(): Promise<RegisterResult> => {
        this.submitting = true
        this.registerResult = undefined

        const username = this.form.fields.username.value
        const password = this.form.fields.password.value
        const email = this.form.fields.email.value
        const firstName = this.form.fields.firstName.value
        const lastName = this.form.fields.lastName.value
        try {
            const response = await AuthenticationService.register(username, password, email, firstName, lastName)
            this.registerResult = response.result
        } catch (exception) {
            this.registerResult = RegistrationResult.Failure
        } finally {
            this.submitting = false
            return this.registerResult
        }
    }
}

export default RegistrationStore