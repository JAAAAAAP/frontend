import api from "./api"

export const createUser = async (userData) => {
    try {
        const response = await api.post('/V1/createuser', (userData))
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateRole = async (id, role) => {
    try {
        const response = await api.put(`/V1/updaterole/${id}`, { role })
        return response.data
    } catch (error) {
        throw error
    }
}
export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/V1/deleteuser/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}