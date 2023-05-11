import RootStore from ".."
import { Form, FormField } from "../../models/forms"
import StoreInterface from "../StoreInterface"
import { makeAutoObservable } from "mobx"
import { RegistrationResult } from "../../api/ApiClient"

export type RegistrationData = {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
}

class RegistrationFormStore implements StoreInterface {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    private _submitting: boolean = false
    get submitting() { return this._submitting }
    set submitting(value) { this._submitting = value }

    private _result: RegistrationResult | undefined = undefined
    get result() { return this._result }
    set result(value) { this._result = value }

    get registrationData() {
        return {
            username: this.form.fields.username.value,
            password: this.form.fields.password.value,
            email: this.form.fields.email.value,
            firstName: this.form.fields.firstName.value,
            lastName: this.form.fields.lastName.value,
        } as RegistrationData
    }

    form = new Form({
        username: new FormField([{ type: "required" }, { type: "min-length", restriction: 3 }]),
        password: new FormField([{ type: "required" }, { type: "password" }]),
        repeatPassword: new FormField([{ type: "required" }, { type: "the-same-as", restriction: "password" }]),
        firstName: new FormField([{ type: "min-length", restriction: 3 }, { type: "name" }]),
        lastName: new FormField([{ type: "min-length", restriction: 3 }, { type: "name" }]),
        email: new FormField([{ type: "e-mail" }])
    }, () => { this.result = undefined })
}

export default RegistrationFormStore