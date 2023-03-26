interface PreviewWindowProps {
    sections: Array<{
        title: string
        content: string
    }>
    selectedSections: string[]
}

function PreviewWindow({ sections, selectedSections }: PreviewWindowProps) {
    return (
        <article className="w-[600px] h-[95vh] drop-shadow-xl rounded-md bg-container p-4 overflow-scroll">
            {selectedSections.length > 0 ? (
                sections.map(section => {
                    return (
                        selectedSections.indexOf(section.title) != -1 && (
                            <span key={`preview window ${section.title}`}>
                                <h2 className="font-medium text-lg mb-2">{section.title}</h2>
                                <p className="mb-5">{section.content}</p>
                            </span>
                        )
                    )
                })
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
