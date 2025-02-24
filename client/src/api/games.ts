import { baseUrl } from "src/utils/constants"
export const getAllGames = async () => {
    try {
        const response = await fetch(`${baseUrl}/games`)
        return await response.json()
    } catch (error) {
        console.error(error)
    }
}