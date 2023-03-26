import { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"

import Question from "../components/Question"
import { useQuizContext } from "../hooks/QuizContext"

const Quiz: NextPage = () => {
    const { sections, articleName, selectedSections, setSelectedSections, quizData, setQuizData } =
        useQuizContext()
    const [sectionNames, setSectionNames] = useState<string[]>(["", ""])

    const [heartsLeft, setHeartsLeft] = useState(3)
    const [timeRemaining, setTimeRemaining] = useState(300) // FIXME

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    async function handleTimeRemaining() {
        if (timeRemaining > 0) {
            await sleep(1250)
            setTimeRemaining(timeRemaining - 1)
        } else {
            alert("You ran out of time!")
        }
    }

    useEffect(() => {

        if (quizData !== null) {
            return;
        }

        async function getQuizData(cache: boolean = false) {
            const data = sections
                .filter(e => selectedSections.indexOf(e.title) != -1)
                .map(e => ({ title: e.title, content: e.content }))
            setSectionNames([data[0]?.title, data[1]?.title])
            console.log(data)

            if (cache) {
                setQuizData({
                    story: 'Poliomyelitis is caused by a virus called poliovirus, which only affects humans. It enters the body through the gastrointestinal tract and has an incubation period of three to 35 days. There are three different types of poliovirus, all of which are highly virulent and cause the same symptoms. Infection or vaccination with one type of poliovirus does not provide immunity against the other types. Individuals who are exposed to the virus develop immunity through the production of antibodies. Diagnosis of paralytic poliomyelitis is based on clinical symptoms and laboratory tests, including the recovery of poliovirus from a stool or pharynx sample and the detection of antibodies in the blood. Detection of the virus in the cerebrospinal fluid is rare but diagnostic. It is important to determine whether the virus is "wild type" or "vaccine type" to track the source of the virus and prevent further spread.',
                    questions: [
                        {
                            question: "What is the cause of poliomyelitis?",
                            optionA: "Bacteria",
                            optionB: "Virus",
                            optionC: "Fungus",
                            correctAnswer: "Virus",
                            explanation: "Poliomyelitis is caused by a virus called poliovirus.",
                        },
                        {
                            question: "How does poliovirus enter the body?",
                            optionA: "Through the respiratory tract",
                            optionB: "Through the skin",
                            optionC: "Through the gastrointestinal tract",
                            correctAnswer: "Through the gastrointestinal tract",
                            explanation:
                                "Poliovirus enters the body through the gastrointestinal tract.",
                        },
                        {
                            question: "What is the incubation period of poliovirus?",
                            optionA: "1-2 days",
                            optionB: "3-35 days",
                            optionC: "1-2 weeks",
                            correctAnswer: "3-35 days",
                            explanation: "Poliovirus has an incubation period of three to 35 days.",
                        },
                        {
                            question: "How many types of poliovirus are there?",
                            optionA: "1",
                            optionB: "2",
                            optionC: "3",
                            correctAnswer: "3",
                            explanation: "There are three different types of poliovirus.",
                        },
                        {
                            question:
                                "Does infection or vaccination with one type of poliovirus provide immunity against the other types?",
                            optionA: "Yes",
                            optionB: "No",
                            optionC: "It depends",
                            correctAnswer: "No",
                            explanation:
                                "Infection or vaccination with one type of poliovirus does not provide immunity against the other types.",
                        },
                        {
                            question: "How do individuals develop immunity to poliovirus?",
                            optionA: "Through antibiotics",
                            optionB: "Through the production of antibodies",
                            optionC: "Through surgery",
                            correctAnswer: "Through the production of antibodies",
                            explanation:
                                "Individuals who are exposed to the virus develop immunity through the production of antibodies.",
                        },
                    ],
                })
                return
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_PORT
            const result = await fetch(`http://localhost:${apiUrl}/generate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wikiData: data,
                }),
            })
            const json = await result.json()
            console.log("RESULT", json)
            setQuizData(json)
        }

        getQuizData()
    }, [])

    // useEffect(() => {
    //     handleTimeRemaining()
    // }, [timeRemaining])

    return (
        <>
            <Head>
                <title>Story Blitz - Quiz</title>
            </Head>

            <nav className="flex items-center justify-end p-6 text-3xl gap-10 bg-container shadow">
                <span className="flex items-center justify-center">
                    <span>
                        <AiFillHeart className="text-red-600" />
                    </span>
                    <span>x</span>
                    <span>{heartsLeft}</span>
                </span>

                <h3>
                    <span>{(~~(timeRemaining / 60)).toString().padStart(2, "0")}</span>
                    <span>:</span>
                    <span>{(timeRemaining % 60).toString().padStart(2, "0")}</span>
                </h3>
            </nav>

            <hr />

            <main className="grid grid-cols-2 px-10 my-10 gap-x-20">
                <div>
                    <h1 className="text-3xl font-bold mb-5">
                        {articleName} - {sectionNames[0]} & {sectionNames[1]}
                    </h1>
                    <p className="text-xl font-light">{quizData?.story}</p>
                </div>

                <div className="flex items-center justify-center flex-col gap-4">
                    {quizData?.questions?.map(el => {
                        return (
                            <Question
                                key={el.question}
                                question={el.question}
                                options={[el.optionA, el.optionB, el.optionC]}
                                correct_answer={el.correctAnswer}
                            />
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default Quiz
