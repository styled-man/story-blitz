import { randomBytes } from "crypto"
import React, { useState } from "react"

interface QuestionOption {
    children: string
}

function QuestionOption({ children }: QuestionOption) {
    const [randomId] = useState(randomBytes(20).toString("hex"))

    return (
        <div className="flex items-center justify-start gap-3 mb-2">
            <input type="radio" name="answer" id={randomId} value={children} />
            <label
                htmlFor={randomId}
                className="first-letter:capitalize text-lg font-light cursor-pointer "
            >
                {children}
            </label>
        </div>
    )
}

export default QuestionOption
