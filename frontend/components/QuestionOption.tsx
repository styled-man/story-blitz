import React from "react"

function QuestionOption({ question_answer }: { question_answer: string }) {
    return (
        <div>
            <input
                className=" align-middle"
                type="radio"
                name="question_answer"
                value={question_answer}
            />
            {question_answer}
        </div>
    )
}

export default QuestionOption
