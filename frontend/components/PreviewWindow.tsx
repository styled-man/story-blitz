import React from "react"

interface PreviewWindowProps {
    sections: Array<{
        title: string
        content: string
    }>
}

function PreviewWindow(props: PreviewWindowProps) {
    return (
        <article className="w-[600px] min-h-[800px] drop-shadow-xl rounded-sm bg-white p-4">
            <h1 className=" text-3xl font-bold">Parsed Content:</h1>
            {props.sections.map(section => {
                return (
                    <>
                        <h2>{section.title}</h2>
                        <p>{section.content}</p>
                    </>
                )
            })}
        </article>
    )
}

export default PreviewWindow
