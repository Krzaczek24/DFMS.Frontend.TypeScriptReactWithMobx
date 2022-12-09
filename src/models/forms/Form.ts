import { makeAutoObservable } from 'mobx'
import FormField from "./FormField"

type Fields = { [key: string]: FormField }

class Form {
    constructor(fields: Fields, 
        private readonly onFieldsChangedCallback?: () => void, 
        private readonly clearMessageOnFieldsChanged = true) {

        this.fields = fields
        Object.values(this.fields).forEach(field => field.bindForm(this))
        makeAutoObservable(this)
    }

    readonly fields: Fields

    private _message: string = ''
    get message(): string { return this._message }
    set message(value: string) { this._message = value }
    get showMessage(): boolean { return this._message.length > 0 }
    clearMessage = (): void => { this._message = '' }

    get isValid() {
        return Object.values(this.fields).every(field => field.isValid)
    }

    revealInvalid = (): void => {
        Object.values(this.fields).forEach(field => field.revealInvalid())
    }

    fieldsChanged = (): void => {
        if (this.clearMessageOnFieldsChanged) {
            this.clearMessage()
        }
        
        if (this.onFieldsChangedCallback) {
            this.onFieldsChangedCallback()
        }
    }
}

export default Form