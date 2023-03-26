import type { NextPage } from "next"
import { useState } from "react"

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
        <div className="text-2xl flex items-center gap-5">
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
        <main className="flex flex-col justify-center m-10 pt-10">
            <h1 className="text-6xl py-10 text-center">{title}</h1>
            <div className="flex flex-col gap-10 mx-20 pb-10">
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
            </div>
        </main>
    )
}

export default Selection
