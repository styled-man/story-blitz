import React, { useState, useContext, SetStateAction, Dispatch, ReactNode } from "react"

interface QuizContextType {
    quizData: any
    setQuizData: Dispatch<SetStateAction<null>>
}

interface QuizDataType {
    story: string
    questions: [
        {
            question: string
            optionA: string
            optionB: string
            optionC: string
            correctAnswer: string
            explanation: string
        }
    ]
}

const QuizContext = React.createContext<QuizContextType>({
    quizData: null,
    setQuizData: () => {},
})

export function useQuizContext() {
    return useContext(QuizContext)
}

export function QuizProvider({ children }: { children: ReactNode }) {
    const [quizData, setQuizData] = useState(null)

    return <QuizContext.Provider value={{ quizData, setQuizData }}>{children}</QuizContext.Provider>
}
