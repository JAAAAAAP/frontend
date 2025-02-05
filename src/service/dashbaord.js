import api from "./api";

export const dashboardstat = async () => {
    try {
        const respone = await api.get('V1/dashboardstat')
        return respone.data
    } catch (error) {
        throw error
    }
}
export const userStat = async () => {
    try {
        const respone = await api.get('V1/userstat')
        return respone.data
    } catch (error) {
        throw error
    }
}