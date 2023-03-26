import React from "react"

interface ButtonProps {
    text: string,
    className?: string,
    onClick?: any
}

export default function Button(props: ButtonProps) {
    return <button className={props.className} onClick={props.onClick}>{props.text}</button>
}
