import { makeAutoObservable } from 'mobx'
import Form from './Form'

type ValidationType = 'required' | 'min-length' | 'max-length' | 'e-mail' | 'password'
type ValidationResult = ValidationType | undefined
type Validation = {
    type: ValidationType
    restriction?: number
}

// minimum eight chars, at least one uppercase, one lowercase, one number and one special character
const badPasswordRegex = new RegExp(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/)
const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)

export type CustomValidationTooltips = {
    [key in ValidationType]?: string
}

type validationDefinition = {
    [key in ValidationType]: (value: string, restriction?: number) => boolean
}

const validations: validationDefinition = {
    'required': (value) => value?.length > 0,
    'min-length': (value, restriction) => value == null || value.length === 0 || value.length >= restriction!,
    'max-length': (value, restriction) => value == null || value.length === 0 || value.length <= restriction!,
    'password': (value) => !badPasswordRegex.test(value),
    'e-mail': (value) => emailRegex.test(value)
}

class FormField {
    constructor(private validations: Validation[] = [], showInvalidOnStart = false)
    {
        this._failedValidation = this.getFailedValidation()
        this._showInvalid = showInvalidOnStart
        makeAutoObservable(this)
    }

    private _failedValidation: ValidationResult
    get failedValidation(): ValidationResult { return this._failedValidation }

    private _showInvalid: boolean
    get isValid(): boolean { return this._failedValidation == null }
    get isInvalid(): boolean { return this._showInvalid && !this.isValid }
    revealInvalid = (): void => { this._showInvalid = true }

    private _value: string = ''
    set value(value: string) {
        this._value = value
        this._failedValidation = this.getFailedValidation()
        if (this._failedValidation !== 'required') {
            this._showInvalid = true
        }
        this.form?.fieldsChanged()
    }
    get value() { return this._value }

    private form: Form | undefined
    bindForm = (form: Form): void => {
        this.form = form
    }
    
    private getFailedValidation() {
        for (var validation of this.validations) {
            if (!validations[validation.type](this._value, validation.restriction)) {
                return validation.type
            }
        }
    }    
}

export default FormField