import { makeAutoObservable } from 'mobx'
import FormField from "./FormField"

type Fields = { [key: string]: FormField }

class Form {
    constructor(fields: Fields) {
        this.fields = fields
        makeAutoObservable(this)
    }

    readonly fields: Fields

    get isValid() {
        return Object.values(this.fields).every(field => field.isValid)
    }
}

export default Form