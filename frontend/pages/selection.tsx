import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import PreviewWindow from "../components/PreviewWindow"
import Button from "../components/Button"
import SelectionOption from "../components/SectionOption"

const Selection: NextPage = props => {
    const router = useRouter()
    const [title, setTitle] = useState<string>("")

    async function getData() {
        const data = await fetch(`localhost:8080/article?keywords=${router.query}`)
        console.log(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const maxSelection = 2

    const [selectedCount, setSelectedCount] = useState<number>(0)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const [options, setOptions] = useState<[string, boolean][]>([
        ["Signs and symptoms", false],
        ["Risk Factor", false],
        ["Causes and mechanism", false],
        ["Diagnosis", false],
        ["Prevention", false],
        ["Management", false],
    ])

    const updateCount = () => {
        setIsDisabled(options.filter(e => e[1]).length == maxSelection)
    }

    return (
        <main className="flex flex-row justify-around m-4">
            <div>
                <h1 className="font-sans text-4xl font-bold">Found Article: {title}</h1>
                <h2 className="font-sans text-xl">
                    Please select the subheadings that will be included in your study.
                </h2>
                <div className="flex flex-col mt-4">
                    {options.map((element, i) => {
                        return (
                            <SelectionOption
                                name={element[0]}
                                key={element[0]}
                                checked={element[1]}
                                isDisabled={isDisabled}
                                onChange={(e: { currentTarget: { checked: boolean } }) => {
                                    options[i][1] = e.currentTarget.checked
                                    setOptions([...options])
                                    updateCount()
                                }}
                            />
                        )
                    })}
                    <Button text="Next" className=" border-black border-2 w-36 mt-4" />
                </div>
            </div>
            <div>
                <PreviewWindow
                    sections={[{ title: "Woah!", content: "This is the content of my section" }]}
                />
            </div>
        </main>
    )
}

export default Selection
