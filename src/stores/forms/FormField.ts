import { makeAutoObservable } from 'mobx'

type ValidationType = 'Required' | 'MinLength' | 'MaxLength' | 'Email' | 'Password'
type ValidationResult = ValidationType | null
type Validation = {
    type: ValidationType
    restriction?: number
}

// minimum eight chars, at least one uppercase, one lowercase, one number and one special character
const badPasswordRegex = new RegExp(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/)
const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)

type validationDefinition = {
    [key in ValidationType]: (value: string, restriction?: number) => boolean
}

const validations: validationDefinition = {
    'Required': (value) => value?.length > 0,
    'MinLength': (value, restriction) => value == null || value.length === 0 || value.length >= restriction!,
    'MaxLength': (value, restriction) => value == null || value.length === 0 || value.length <= restriction!,
    'Password': (value) => !badPasswordRegex.test(value),
    'Email': (value) => emailRegex.test(value)
}

class FormField {
    constructor(private validations: Validation[] = [], showInvalidOnStart = false)
    {
        this._showInvalid = showInvalidOnStart
        makeAutoObservable(this)
    }

    private _failedValidation: ValidationResult = null
    get failedValidation(): ValidationResult { return this._failedValidation }

    private _showInvalid: boolean
    get isValid(): boolean { return this._failedValidation == null }
    get isInvalid(): boolean { return this._showInvalid && !this.isValid }
    revealInvalid = (): void => { this._showInvalid = true }

    private _value: string = ''
    set value(value: string) {
        this._value = value
        this._failedValidation = this.getFailedValidation()
        if (this._failedValidation !== 'Required') {
            this._showInvalid = true
        }
    }
    get value() { return this._value }
    
    private getFailedValidation() {
        for (var validation of this.validations) {
            if (!validations[validation.type](this._value, validation.restriction)) {
                return validation.type
            }
        }
        return null
    }    
}

export default FormField