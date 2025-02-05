import api from "./api";

export const search = async (query) => {
    try {
        const response = await api.get('V1/search', {
            params: {
                q: query
            }
        })
        return response.data
    } catch (error) {
        console.error('Error while searching:', error);
        throw error;
    }
}