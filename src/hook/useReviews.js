import { addReviews, deleteReviews, editReview } from "../service/reviews";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddReview = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (reviewsData) => {
            try {
                await addReviews(reviewsData.comment, reviewsData.rating, reviewsData.game_id, reviewsData.parent)
            } catch (error) {
                throw error
            }

        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['GamebyId', variables.game_name])
            return data
        },
        onError: (error) => {
            throw error
        }
    })

    return { ...mutation }
}

export const useReplyReviews = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (reviewsData) => {
            try {
                await addReviews(reviewsData.comment, reviewsData.rating, reviewsData.game_id, reviewsData.parent)
            } catch (error) {
                throw error
            }

        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['GamebyId', variables.game_name])
            return data
        },
        onError: (error) => {
            throw error
        }
    })

    return { ...mutation }
}

export const useEditReview = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({ id, comment, rating }) => {
            try {
                await editReview(id, comment, rating)
            } catch (error) {
                throw error
            }

        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['GamebyId', variables.game_name])
            return data
        },
        onError: (error) => {
            throw error
        }
    })

    return { ...mutation }
}

export const useDeleteReview = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (id) => {
            try {
                await deleteReviews(id)
            } catch (error) {
                throw error
            }

        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['GamebyId', variables.game_name])
            return data
        },
        onError: (error) => {
            throw error
        }
    })

    return { ...mutation }

}