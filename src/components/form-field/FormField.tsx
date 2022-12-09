import './form-field-style.scss'
import { useTranslation } from 'react-i18next'
import { Observer } from 'mobx-react'
import { Tooltip } from 'react-tooltip'
import { Form, InputGroup } from 'react-bootstrap'
import { FormField as FormFieldModel, CustomValidationTooltips } from '../../models/forms'
import { ChangeEventHandler } from 'react'

type FormFieldProps = {
    id?: string
    type?: 'text' | 'email' | 'password' | 'tel' | 'time' | 'radio' | 'number' | 'date' | 'datetime-local'
    icon?: React.ReactElement
    field: FormFieldModel
    placeholder?: string
    'center-text'?: boolean
    'aria-describedby'?: string
    'auto-complete'?: 'off' | 'on' | 'username' | 'name' | 'given-name' | 'additional-name' | 'family-name' | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'one-time-code' | 'organization-title' | 'organization' | 'street-address' | 'postal-code' | 'language' | 'bday' | 'sex' | 'tel'
    'tooltip-variant'?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'
    'tooltip-place'?: 'top' | 'right' | 'bottom' | 'left'
    size?: 'sm' | 'lg'
    'custom-validation-tooltips'?: CustomValidationTooltips
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const FormField = (props: FormFieldProps) => {
    const { t } = useTranslation()
    const guid = props.id ?? 'uuid-' + crypto.randomUUID();
    const getTooltip = () => {
        const validation = props.field.failedValidation
        const customValidations = props['custom-validation-tooltips']
        return validation && customValidations && customValidations[validation]
            ? customValidations[validation]
            : t(`validation.${props.field.failedValidation}`)
    }
    return (
        <>
            <InputGroup size={props.size}>
                {props.icon &&
                    <InputGroup.Text>
                        {props.icon}
                    </InputGroup.Text>
                }
                <Observer>
                    {() => (
                        <Form.Control 
                            id={guid}
                            placeholder={props.placeholder} 
                            aria-describedby={props['aria-describedby']}
                            autoComplete={props['auto-complete']}
                            type={props.type}
                            value={props.field.value}
                            isInvalid={props.field.isInvalid}
                            data-tooltip-content={getTooltip()}
                            data-tooltip-variant={props['tooltip-variant']}
                            data-tooltip-place={props['tooltip-place']}
                            className={props['center-text'] ? 'text-center' : ''}
                            onChange={e => {
                                props.field.value = e.target.value
                                if (props.onChange){
                                    props.onChange(e)
                                }
                            }}
                        />
                    )}
                </Observer>
            </InputGroup>
            <Observer>
                {() => (<Tooltip anchorId={guid} isOpen={props.field.isInvalid}/>)}
            </Observer>
        </>
    )
}

export default FormField