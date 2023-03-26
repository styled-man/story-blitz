import type { NextPage } from "next"
import { useState } from "react"

import PreviewWindow from "../../components/PreviewWindow"
import Button from "../../components/Button"

const Option = ({
    name,
    onChange,
    checked,
    isDisabled,
}: {
    name: string
    onChange: (e: { currentTarget: { checked: boolean } }) => void
    checked: boolean
    isDisabled: boolean
}) => {
    return (
        <div className="text-lg flex items-center gap-5">
            <input
                className="w-[20px] h-[20px] aspect-square"
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={onChange}
                disabled={!checked && isDisabled}
            />
            <label htmlFor={name}>{name}</label>
        </div>
    )
}

const Selection: NextPage = () => {
    const [title, setTitle] = useState<string>("Cardiac arrest")

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
                            <Option
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
