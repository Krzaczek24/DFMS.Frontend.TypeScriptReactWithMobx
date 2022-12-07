import { Observer } from 'mobx-react'
import { Form, InputGroup } from 'react-bootstrap'
import TooltipAlert, { Variant } from '../tooltip/TooltipAlert'
import FormField from '../../stores/forms/FormField'
import type { Placement } from '@popperjs/core';

export interface ValidatableFieldControlProps {
    icon: React.ReactNode,
    placeholder: string,
    'aria-describedby': string,
    autoComplete: 'on' | 'off' | 'username' | 'current-password',
    type?: string,
    field: FormField,
    tooltipPlacement?: Placement,
    tooltipVariant?: Variant,
    tooltipText: string
}

const ValidatableFieldControl = (props: ValidatableFieldControlProps) => {
    const { tooltipVariant = 'danger' } = props

    return (
        <Observer>
            {() => (
                <TooltipAlert 
                    content={props.tooltipText} 
                    variant={tooltipVariant} 
                    placement={props.tooltipPlacement} 
                    isOpen={props.field.isInvalid}>
                    <InputGroup size='lg'>
                        <InputGroup.Text>
                            {props.icon}
                        </InputGroup.Text>
                        <Form.Control 
                            placeholder={props.placeholder} 
                            aria-describedby={props['aria-describedby']}
                            autoComplete={props.autoComplete} 
                            value={props.field.value}
                            onChange={e => props.field.value = e.target.value}
                            isInvalid={props.field.isInvalid}
                        />
                    </InputGroup>
                </TooltipAlert>
            )}
        </Observer>
    )
}

export default ValidatableFieldControl