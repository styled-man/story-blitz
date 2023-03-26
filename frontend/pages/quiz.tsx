import { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import Question from "../components/Question"

const Quiz: NextPage = () => {
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
                    <p className="text-xl font-light">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum ullam
                        laudantium perferendis eum animi, totam repellat porro. Ab tempore itaque
                        qui alias atque doloremque! Quam corporis a ab? Quia eveniet vel pariatur
                        maxime sunt voluptatem quaerat atque laboriosam nesciunt. Laudantium ad
                        nulla laboriosam magni molestiae, voluptatum aspernatur sit dignissimos quod
                        veritatis aliquam velit qui? Magnam architecto nulla quam dolore quod error
                        corrupti exercitationem sequi, sunt itaque facere obcaecati rerum dolorum
                        possimus rem fuga deserunt nam quis doloremque qui perferendis totam
                        laudantium amet beatae? Totam vero, dolore esse reprehenderit sint voluptate
                        ducimus, laudantium commodi id earum magni ratione veniam, rerum beatae?
                    </p>
                </div>

                <div className="flex items-center justify-center flex-col gap-4">
                    <Question
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
                    />
                </div>
            </main>
        </>
    )
}

export default Quiz
