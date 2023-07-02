import { makeAutoObservable } from 'mobx'
import FormField from './FormField'

type Fields = { [key: string]: FormField }

class Form {
    constructor(fields: Fields, private readonly onFieldsChangedCallback?: () => void) {
        this.fields = fields
        Object.values(this.fields).forEach(field => field.bindForm(this))
        makeAutoObservable(this)
    }

    readonly fields: Fields

    get isValid() {
        return Object.values(this.fields).every(field => field.isValid)
    }

    revealInvalid = (): void => {
        Object.values(this.fields).forEach(field => field.revealInvalid())
    }

    fieldsChanged = (): void => {
        if (this.onFieldsChangedCallback) {
            this.onFieldsChangedCallback()
        }
    }

    clearAllFields = (): void => {
        Object.values(this.fields).forEach(field => field.clear())
    }
}

export default Form