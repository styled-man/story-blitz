import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import PreviewWindow from "../components/PreviewWindow"
import Button from "../components/Button"
import SelectionOption from "../components/SectionOption"
import Checkbox from "../components/Checkbox"

const Selection: NextPage = props => {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [sections, setSections] = useState([])

    const maxSelection = 2

    const [selectedCount, setSelectedCount] = useState<number>(0)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    let selected_options = new Set()

    function onCheckChange(checked: boolean, label: string) {
        if (checked) {
            selected_options.add(label)
        } else {
            selected_options.delete(label)
        }
    }

    return (
        <main className="flex flex-row justify-around m-4">
            <div>
                <h1 className="font-sans text-4xl font-bold">Found Article: {title}</h1>
                <h2 className="font-sans text-xl">
                    Please select the subheadings that will be included in your study.
                </h2>
                <div className="flex flex-col mt-4">
                    {sections.map(element => {
                        return <Checkbox onCheckedChange={onCheckChange} label={element?.title} />
                    })}
                    <Button text="Next" className=" border-black border-2 w-36 mt-4" />
                </div>
            </div>
            <div>
                <PreviewWindow sections={sections} />
            </div>
        </main>
    )
}

export default Selection
