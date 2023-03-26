import type { NextPage } from "next"
import { render } from "react-dom"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect, useState } from "react"
import { useQuizContext } from "../hooks/QuizContext"
import { useRouter } from "next/router"

// Options for the graph

interface InformationProps {
    articleLink: string
    improvement: string
}

// Loads in the information on the left side
const Information: React.FC<InformationProps> = ({ articleLink, improvement }) => {
    return (
        <>
            <div className="pb-5">
                Article link:{" "}
                <a className="text-blue-400" href={articleLink}>
                    {articleLink}
                </a>
            </div>
            Areas to improve: {improvement}
        </>
    )
}

const Results: NextPage = () => {
    const router = useRouter()

    const [amountCorrect, setAmountCorrect] = useState<number>(4)
    const [amountIncorrect, setAmountIncorrect] = useState<number>(1)
    const [amountIncomplete, setAmountIncomplete] = useState<number>(1)

    const options = {
        title: {
            text: "Success Rate",
        },
        series: [
            {
                name: "Success Rate",
                type: "pie",
                colorByPoint: true,
                data: [
                    {
                        name: "Incorrect",
                        y: amountIncorrect,
                        drilldown: "Incorrect",
                    },
                    {
                        name: "Correct",
                        y: amountCorrect,
                        drilldown: "Correct",
                    },
                    {
                        name: "Incomplete",
                        y: amountIncomplete,
                        drilldown: "Incomplete",
                    },
                ],
            },
        ],
    }

    const [articleLink, setArticleLink] = useState<string>(
        "https://en.wikipedia.org/wiki/Polio"
    )
    const [improvement, setImprovement] = useState<string>(
        `To improve your understanding of poliovirus and immunity, you should focus on two areas. Firstly, antibodies produced by the immune system, not surgery, are the way individuals develop immunity to poliovirus. Secondly, infection or vaccination with one type of poliovirus does not provide immunity against the other types. By reviewing the basics of the immune system and the specifics of poliovirus transmission and prevention, you will be better prepared to answer similar questions correctly in the future.`
    )

    return (
        <div className="mx-10 mt-10 px-5 pt-5">
            <div className="text-5xl text-center py-5">Your Results:</div>
            <div className="flex">
                <div className="w-[50vw] min-h-[50vh] m-auto mx-10 p-10 drop-shadow-xl rounded-md bg-container">
                    <Information improvement={improvement} articleLink={articleLink} />
                </div>

                <div className="w-[50vw] min-h-[50vh] drop-shadow-xl rounded-md bg-container p-4">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>

            <div className="flex gap-20 justify-center w-full pt-16">
                <span
                    onClick={() => {
                        router.push("/")
                    }}
                    className="bg-black text-white p-5 rounded-md h-[100%]"
                >
                    Study Again
                </span>
            </div>
        </div>
    )
}

export default Results
