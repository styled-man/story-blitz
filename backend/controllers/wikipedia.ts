import wiki from "wikijs"

export const getContent = async (articleId: string) => {
    try {
        const data = await wiki().page(articleId)
        return data.content()
    } catch(e) {
        console.error(e)
    }
}