import React, { useState, useContext, SetStateAction, Dispatch, ReactNode } from "react"

interface QuizContextType {
    quizData: QuizDataType
    setQuizData: Dispatch<SetStateAction<any>>
    articleName: string
    setArticleName: (articleName: string) => void
    sections: SectionType[]
    setSections: Dispatch<SetStateAction<SectionType[]>>
    selectedSections: string[]
    setSelectedSections: Dispatch<SetStateAction<string[]>>
}

interface QuizDataType {
    story: string
    questions: {
        question: string
        optionA: string
        optionB: string
        optionC: string
        correctAnswer: string
        explanation: string
    }[]
}

export interface SectionType {
    title: string
    content: string
    items?: any
}

const QuizContext = React.createContext<QuizContextType>({
    quizData: {
        story: "",
        questions: [
            {
                question: "",
                optionA: "",
                optionB: "",
                optionC: "",
                correctAnswer: "",
                explanation: "",
            },
        ],
    },
    setQuizData: () => {},
    articleName: "",
    setArticleName: () => {},
    sections: [],
    setSections: () => {},
    selectedSections: [],
    setSelectedSections: () => {},
})

export function useQuizContext() {
    return useContext(QuizContext)
}

export function QuizProvider({ children }: { children: ReactNode }) {
    const [articleName, setArticleName] = useState<string>("")
    const [sections, setSections] = useState<SectionType[]>([])
    const [quizData, setQuizData] = useState({
        story: "",
        questions: [
            {
                question: "",
                optionA: "",
                optionB: "",
                optionC: "",
                correctAnswer: "",
                explanation: "",
            },
        ],
    })
    const [selectedSections, setSelectedSections] = useState<string[]>([])

    return (
        <QuizContext.Provider
            value={{
                quizData,
                setQuizData,
                articleName,
                setArticleName,
                sections,
                setSections,
                selectedSections,
                setSelectedSections,
            }}
        >
            {children}
        </QuizContext.Provider>
    )
}
