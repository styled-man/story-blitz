import React, { useState, useContext, SetStateAction, Dispatch, ReactNode } from "react"

interface QuizContextType {
    quizData: QuizDataType | {}
    setQuizData: Dispatch<SetStateAction<{}>>
    articleName: string
    setArticleName: (articleName: string) => void
    sections: SectionType[]
    setSections: Dispatch<SetStateAction<[]>>
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

interface SectionType {
    title: string
    content: string
    items: any
}

const QuizContext = React.createContext<QuizContextType>({
    quizData: {},
    setQuizData: () => {},
    articleName: "",
    setArticleName: () => {},
    sections: [],
    setSections: () => {},
})

export function useQuizContext() {
    return useContext(QuizContext)
}

export function QuizProvider({ children }: { children: ReactNode }) {
    const [articleName, setArticleName] = useState<string>("")
    const [sections, setSections] = useState<[]>([])
    const [quizData, setQuizData] = useState({})

    return (
        <QuizContext.Provider
            value={{ quizData, setQuizData, articleName, setArticleName, sections, setSections }}
        >
            {children}
        </QuizContext.Provider>
    )
}
