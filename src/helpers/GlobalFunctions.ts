import React from 'react'

export function LogClickedButtonEvent(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log(`Button '${(event.target as HTMLButtonElement).innerText}' has been clicked`)
}