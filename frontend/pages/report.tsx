import type { NextPage } from "next"
import { render } from "react-dom"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import { useState } from "react"

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
                    name: "Unsuccessful",
                    y: 20,
                    drilldown: "Unsuccessful",
                },
                {
                    name: "Successful",
                    y: 80,
                    drilldown: "Successful",
                },
            ],
        },
    ],
}

const Results: NextPage = () => {
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
                <div className="w-[50vw] m-auto mx-10 p-10 shadow-2xl">
                    <div className="pb-5">
                        Article link:{" "}
                        <a className="text-blue-400" href={articleLink}>
                            {articleLink}
                        </a>
                    </div>
                    Areas you can improve in: {improvement}
                </div>

                <div className="w-[50vw] shadow-2xl">
                    <HighchartsReact highcharts={Highcharts} options={options} />
                </div>
            </div>

            <div className="flex gap-20 justify-center w-full pt-16">
                <a href="/">
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
