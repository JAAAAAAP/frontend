import { SignIn, SignOut, SignUp, Getme, MyProfile } from '../service/auth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogin = () => {

    const queryClient = useQueryClient()

    const loginMutation = useMutation({
        mutationFn: async ({ email, password }) => {
            try {
                await SignIn(email, password)
            } catch (error) {
                throw error.response?.data || 'Sign in failed'
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const login = async (email, password) => {
        await loginMutation.mutateAsync({ email, password })
        await queryClient.fetchQuery({
            queryKey: ['user'],
            queryFn: async () => {
                const user = await Getme()
                return user
            }
        })
    }

    return { login, isPending: loginMutation.isPending, error: loginMutation.error }
}

export const useRegister = () => {
    const registerMutation = useMutation({
        mutationFn: async ({ username, email, password }) => {
            try {
                await SignUp(username, email, password)
            } catch (error) {
                throw error.response?.data?.message || 'Sign up failed'
            }
        }
    })

    const register = async (username, email, password) => {
        await registerMutation.mutateAsync({ username, email, password })
    }

    return { register, isPending: registerMutation.isPending, error: registerMutation.error }
}

export const useSignOut = () => {
    const queryClient = useQueryClient()
    const signOutMutation = useMutation({
        mutationFn: async () => {
            try {
                await SignOut()
            } catch (error) {
                throw error.response?.data?.message || 'Sign out failed'
            }
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] })
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const signOut = async () => {
        await signOutMutation.mutateAsync()
    }

    return { signOut, isPending: signOutMutation.isPending, error: signOutMutation.error }
}

export const useGetMe = () => {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const user = await Getme()
            return user
        },
        retry: false,
        refetchOnWindowFocus: false
    })

    return { user, isLoading, error }
}

export const useMyProfile = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => MyProfile()
    })
    return { data, isLoading, error }
}