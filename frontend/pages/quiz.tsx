import { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"

import Question from "../components/Question"
import { useQuizContext } from "../hooks/QuizContext"

const Quiz: NextPage = () => {
    const { sections, articleName, selectedSections, setSelectedSections, quizData, setQuizData } = useQuizContext()


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
        async function getQuizData() {
            const data = sections.filter(e => selectedSections.indexOf(e.title) != -1).map(e => ({title: e.title, content: e.content}))
            console.log(data)
            const result = await fetch("http://localhost:6969/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    wikiData: data,
                    // INSERT BODY REQUEST TO SAVE TO QUIZ CONTEXT
                }),
            });
            const json = await result.json()
            console.log("RESULT", json)
            setQuizData(json)
        }

        getQuizData()
    }, [])

    useEffect(() => {
        handleTimeRemaining()
    }, [timeRemaining])

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
                    <p className="text-xl font-light">{quizData.story}</p>
                </div>

                <div className="flex items-center justify-center flex-col gap-4">
                    {quizData.questions.map(el => {
                        return (
                            <Question
                                question={el.question}
                                options={[el.optionA, el.optionB, el.optionC]}
                                correct_answer={el.correctAnswer}
                            />
                        )
                    })}
                    {/* <Question
                        question="this is the question"
                        options={["option 1", "option 2", "option 3"]}
                        correct_answer="option 1"
                    />
                    <Question
                        question="this is the question"
                        options={["option 1", "option 2", "option 3"]}
                        correct_answer="option 1"
                    />
                    <Question
                        question="this is the question"
                        options={["option 1", "option 2", "option 3"]}
                        correct_answer="option 1"
                    /> */}
                </div>
            </main>
        </>
    )
}

export default Quiz
