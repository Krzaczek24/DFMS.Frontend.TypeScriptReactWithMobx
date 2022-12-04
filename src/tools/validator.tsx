import React from 'react'
import { Form } from 'react-bootstrap'

export type ValidationType = 'Required' | 'MinLength' | 'Regex'

export type Validation = {

}

const validations = {
    'Required': (value: string | number) => {
        return value != null
    },
    'MinLength': (value: string, restriction: number) => {
        return value?.length >= restriction
    },
    'Regex': (value: string, restriction: RegExp) => {
        return restriction.test(value)
    }
}

export type ValidationControlProps = {
    placeholder?: string
    'aria-describedby'?: string
    autoComplete?: string
    readOnly?: boolean
    disabled?: boolean
    value?: string | string[] | number
    onChange?: React.ChangeEventHandler<ValidationControl>
    type?: string
    isValid?: boolean
    isInvalid?: boolean
    validations?: Validation[]
    validationTooltipDirection?: 'top' | 'right' | 'bottom' | 'left'
}

const validate = (e: React.ChangeEvent<ValidationControl>): string => {
    console.log('WTF')
    const wtf = e.target as ValidationControl
    console.log(wtf?.props?.validations)
    return 'a'
}

export class ValidationControl extends React.Component {
    props: ValidationControlProps
    value: string

    constructor(props: ValidationControlProps) {
        super(props)
        this.props = props
        this.value = ''
    }

    handleChange = () => {

    }

    render() {
        const { onChange, ...rest } = this.props
        return (
            <Form.Control onChange={(e) => {
                // if (onChange != null) {
                //     onChange(e)
                // }
                // validate(e)
            }} { ...rest}/>
        )
    }
}