import React from "react"

interface PreviewWindowProps {
    sections: Array<{
        title: string
        content: string
    }>
    selectedSections: string[]
}

function PreviewWindow({ sections, selectedSections }: PreviewWindowProps) {
    return (
        <article className="w-[600px] min-h-[95vh] drop-shadow-xl rounded-md bg-container p-4 overflow-scroll">
            {sections.length > 0 ? (
                <>
                    <h1 className=" text-3xl font-bold">Parsed Content:</h1>
                    {sections.map(section => {
                        return (
                            selectedSections.indexOf(section.title) != -1 && (
                                <>
                                    <h2>{section.title}</h2>
                                    <p>{section.content}</p>
                                </>
                            )
                        )
                    })}
                </>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <h1 className="text-2xl font-bold text-gray-400 bg-clip-text">
                        Selected up to 2 subheadings to continue
                    </h1>
                </div>
            )}
        </article>
    )
}

export default PreviewWindow
