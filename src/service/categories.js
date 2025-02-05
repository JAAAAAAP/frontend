import api from "./api";

export const CreateCategory = async (name) => {
    try {
        const response = await api.post('V1/category', { name })
        return response.data
    } catch (error) {
        throw error
    }
}
export const UpdateCategory = async (name, id) => {
    try {
        const response = await api.put(`/V1/category/${id}`, { name })
        return response.data
    } catch (error) {
        throw error
    }
}
export const DeleteCategory = async (id) => {
    try {
        const response = await api.delete(`/V1/category/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const categories = async () => {
    const response = await api.get('V1/category')
    return response.data
}

export const CategoriesStat = async () => {
    const response = await api.get('V1/categoriesstat')
    return response.data
}
