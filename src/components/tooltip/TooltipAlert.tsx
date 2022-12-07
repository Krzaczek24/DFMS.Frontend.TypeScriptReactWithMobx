import './tooltipAlertStyle.scss'
import React, { useRef } from 'react'
import { Tooltip, TooltipProps } from 'reactstrap'

export type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export interface TooltipAlertProps extends Omit<TooltipProps, 'target'> {
    variant?: Variant,
    content: React.ReactNode
}

const TooltipAlert = (props: TooltipAlertProps) => {
    const ref = useRef(null)
    const { children, content, variant = 'dark', ...rest } = props
    const elem = Object.assign({}, children, { ref })
    return (
        <>
            {elem}
            <Tooltip target={ref} {...rest} className={`tooltip-alert-${variant}`} hideArrow={true} >
                {content}
            </Tooltip>
        </>
    )
}

export default TooltipAlert