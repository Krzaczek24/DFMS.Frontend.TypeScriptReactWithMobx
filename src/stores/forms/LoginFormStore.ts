import RootStore from ".."
import { Form, FormField } from "../../models/forms"
import StoreInterface from "../StoreInterface"
import { makeAutoObservable } from "mobx"

export type LoginResult = "SUCCESS" | "INCORRECT_CREDENTIALS" | "ERROR"

export type LogonCredentials = {
    username: string
    password: string
}

class LoginFormStore implements StoreInterface {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
        makeAutoObservable(this)
    }

    private _submitting: boolean = false
    get submitting() { return this._submitting }
    set submitting(value) { this._submitting = value }

    private _result: LoginResult | undefined = undefined
    get result() { return this._result }
    set result(value) { this._result = value }

    get logonCredentials() {
        return {
            username: this.form.fields.username.value,
            password: this.form.fields.password.value
        } as LogonCredentials
    }

    form = new Form({
        username: new FormField([{ type: "required" }]),
        password: new FormField([{ type: "required" }])
    }, () => { this.result = undefined })
}

export default LoginFormStore