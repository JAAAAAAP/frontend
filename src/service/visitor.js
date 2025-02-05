import api from "./api";

export const recordVisit = async ()=>{
    try {
        const response = await api.post('V1/recordVisit')
        return response.data
    } catch (error) {
        throw error
    }
}