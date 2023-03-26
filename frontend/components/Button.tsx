import React from "react"

interface ButtonProps {
    text: string
}

function Button(props: ButtonProps) {
    return <button>{props.text}</button>
}
