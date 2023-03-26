import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Question from "../components/Question"
import { useQuizContext } from "../hooks/QuizContext"
import { FormEvent, useState } from "react"

const Home: NextPage = () => {
    const { quizData, setQuizData } = useQuizContext()
    const [input, setInput] = useState<string>("")

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const raw = await fetch(`http://localhost:6969/wikipedia?keywords=${input}`)
            const data = await raw.json()
            setQuizData(data)
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <main className="flex flex-col justify-center h-screen m-4">
            <h1 className="text-5xl font-sans font-bold">Story Blitz</h1>
            <h2>Learn through story telling.</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className=" border-black border-2 mt-4 p-3 max-w-[400px]"
                    placeholder="Find a study topic"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
            </form>
        </main>
    )
}

export default Home
