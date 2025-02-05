import { updateRole, createUser, deleteUser } from "../service/User";
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateUser = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (userData) => {
            try {
                await createUser(userData)
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['userstat'])
        }
    })
    return { ...mutation }
}

export const useUpdateRole = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: ({ userId, role }) => updateRole(userId, role),
        onSuccess: () => {
            queryClient.invalidateQueries(['userstat'])
        }
    })
    return { ...mutation }
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (id) => {
            try {
                await deleteUser(id)
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['userstat'])
        }
    })
    return { ...mutation }

}