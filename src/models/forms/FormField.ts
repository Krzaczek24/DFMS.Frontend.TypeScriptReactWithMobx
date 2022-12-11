import { makeAutoObservable } from 'mobx'
import Form from './Form'

type ValidationType = 'required' | 'min-length' | 'max-length' | 'e-mail' | 'password' | 'name' | 'the-same-as'
type ValidationResult = ValidationType | undefined
type Validation = {
    type: ValidationType
    restriction?: number | string
}

// minimum eight chars, at least one uppercase, one lowercase, one number and one special character
const badPasswordRegex = new RegExp(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/)
const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
const nameRegex = new RegExp(/^[A-Z][a-ząćęłńóśźż]*$/)

export type CustomValidationTooltips = {
    [key in ValidationType]?: string
}

type validationDefinition = {
    [key in ValidationType]: (value: string, restriction?: number | string, form?: Form) => boolean
}

const isEmpty = (value: string) => value == null || value.length === 0
const validations: validationDefinition = {
    'required': (value) => value?.length > 0,
    'min-length': (value, restriction) => isEmpty(value) || (typeof restriction === 'number' && value.length >= restriction),
    'max-length': (value, restriction) => isEmpty(value) || (typeof restriction === 'number' && value.length <= restriction),
    'password': (value) => isEmpty(value) || !badPasswordRegex.test(value),
    'e-mail': (value) => isEmpty(value) || emailRegex.test(value),
    'name': (value) => isEmpty(value) || nameRegex.test(value),
    'the-same-as': (value, restriction, form) => isEmpty(value) || (typeof restriction === 'string' && form != null && form.fields[restriction].value === value)
}

class FormField {
    constructor(readonly validations: Validation[] = [], showInvalidOnStart = false)
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
            if (!validations[validation.type](this._value, validation.restriction, this.form)) {
                return validation.type
            }
        }
    }    
}

export default FormField