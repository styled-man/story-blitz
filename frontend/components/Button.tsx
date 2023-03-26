import React from "react"

interface ButtonProps {
    text: string
    className?: string
}

export default function Button(props: ButtonProps) {
    return <button className={props.className}>{props.text}</button>
}
