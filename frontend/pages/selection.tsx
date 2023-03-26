import type { NextPage } from "next"
import { useRouter } from "next/router"

import Button from "../components/Button"
import Checkbox from "../components/Checkbox"
import PreviewWindow from "../components/PreviewWindow"
import { useQuizContext } from "../hooks/QuizContext"

const Selection: NextPage = props => {
    const { sections, articleName, selectedSections, setSelectedSections } = useQuizContext()

    const router = useRouter()

    function onCheckChange(checked: boolean, label: string) {
        if (checked && selectedSections.length < 2) {
            setSelectedSections(prev => [...prev, label])
        } else if (!checked) {
            let array = selectedSections
            let index = selectedSections.indexOf(label)
            array.splice(index, 1)
            setSelectedSections([...array])
        }
    }

    return (
        <main className="flex flex-row justify-around m-4">
            <div>
                <h1 className="font-sans text-4xl font-bold">Found Article: {articleName}</h1>
                <h2 className="font-sans text-xl">
                    Please select the subheadings that will be included in your study.
                </h2>
                <div className="flex flex-col mt-4">
                    {sections.map((element, i) => {
                        return (
                            <Checkbox
                                onCheckedChange={onCheckChange}
                                label={element?.title}
                                key={i}
                                selectedSections={selectedSections}
                            />
                        )
                    })}
                    <Button
                        text="Next"
                        className=" border-black border-2 w-36 mt-4"
                        onClick={() => router.push("/quiz")}
                    />
                </div>
            </div>
            <div>
                <PreviewWindow sections={sections} selectedSections={selectedSections} />
            </div>
        </main>
    )
}

export default Selection
