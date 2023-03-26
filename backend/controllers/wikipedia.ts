import wiki from "wikijs"

export const getArticles = async (keywords: string) => {
    try {
        const data = await wiki().find(keywords)
        console.log("Data: ", data.raw.title)
        return data.raw.title
    } catch(e) {
        console.error(e)
    }
}

export const getContent = async (articleId: string) => {
    try {
        const data = await wiki().page(articleId)
        let raw: string = await data.content() 
        return raw
    } catch(e) {
        console.error(e)
    }
}