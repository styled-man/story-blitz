import React from "react"

import QuestionOption from "./QuestionOption"

interface QuestionProps {
    question: string
    answer_a: string
    answer_b: string
    answer_c: string
    correct_answer: string
}

function Question(props: QuestionProps) {
    return (
        <div>
            <form className="">
                {props.question}
                <QuestionOption question_answer={props.answer_a}></QuestionOption>
                <QuestionOption question_answer={props.answer_b}></QuestionOption>
                <QuestionOption question_answer={props.answer_c}></QuestionOption>
            </form>
        </div>
    )
}

export default Question
