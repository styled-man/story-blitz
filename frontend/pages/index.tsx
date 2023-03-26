import type { NextPage } from "next"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"
import { useQuizContext } from "../hooks/QuizContext"

const Home: NextPage = () => {
    const { setArticleName, setSections } = useQuizContext()
    const [input, setInput] = useState<string>("")
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const apiUrl = process.env.NEXT_PUBLIC_API_PORT

        try {
            const raw = await fetch(`http://localhost:${apiUrl}/wikipedia?keywords=${input}`)
            const data = await raw.json()
            setArticleName(data.articleName)
            setSections(data.data)
            router.push("/selection")
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
