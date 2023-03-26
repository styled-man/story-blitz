import type { NextPage } from "next"
import { render } from "react-dom"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useEffect, useState } from "react"
import { useQuizContext } from "../hooks/QuizContext"

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
    const [amountCorrect, setAmountCorrect] = useState<number>(10)
    const [amountIncorrect, setAmountIncorrect] = useState<number>(0)
    const [amountIncomplete, setAmountIncomplete] = useState<number>(0)
    
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
        "https://en.wikipedia.org/wiki/Cardiac_arrest"
    )
    const [improvement, setImprovement] = useState<string>(
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis eos rem est repellat veritatis dolorum, atque id sit? Debitis, molestias maxime? Cumque perferendis dignissimos ullam? Fuga debitis culpa rem voluptas?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis eos rem est repellat veritatis dolorum, atque id sit? Debitis, molestias maxime? Cumque perferendis dignissimos ullam? Fuga debitis culpa rem voluptas?"
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
                <a href="/selection">
                    <span className="bg-black text-white p-5 rounded-md h-[100%]">Try again</span>
                </a>
                <a href="/">
                    <span className="bg-black text-white p-5 rounded-md h-[100%]">
                        Choose a new topic
                    </span>
                </a>
            </div>
        </div>
    )
}

export default Results
