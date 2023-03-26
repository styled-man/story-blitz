import { randomBytes } from "crypto"
import { useState } from "react"
import QuestionOption from "./QuestionOption"

interface QuestionProps {
    question: string
    options: string[]
    correct_answer: string
}

function Question({ question, options, correct_answer }: QuestionProps) {
    return (
        <form className="bg-container p-3 rounded-md shadow-md w-full">
            <h3 className="first-letter:capitalize text-xl mb-3 font-bold">{question}</h3>

            <div className="pl-5">
                {options?.map(option => (
                    <QuestionOption>{option}</QuestionOption>
                ))}
            </div>
        </form>
    )
}

export default Question
