import api from "./api"

export const addReviews = async (comment, rating, game_id, parent = null) => {
    try {
        const response = await api.post('V1/addreviews', {
            comment: comment,
            rating: rating,
            game_id: game_id,
            parent: parent,
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const editReview = async (id, comment, rating) => {
    try {
        const response = await api.put(`V1/updatereview/${id}`, {
            comment: comment,
            rating: rating
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteReviews = async (id) => {
    try {
        const response = await api.delete(`V1/deletereview/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}