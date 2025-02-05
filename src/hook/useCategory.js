import { categories, CategoriesStat, CreateCategory, DeleteCategory ,UpdateCategory} from "../service/categories"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (name) => {
            try {
                await CreateCategory(name)
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['CategoriesStat'])
        }
    })
    return { ...mutation }
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async ({name, id}) => {
            try {
                await UpdateCategory(name, id)
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['CategoriesStat'])
        }
    })
    return { ...mutation }
}



export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (id) => {
            try {
                await DeleteCategory(id)
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['CategoriesStat'])
        }
    })
    return { ...mutation }
}
export const getCategories = () => {
    const { data: data, error: error } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categories(),
        suspense: true,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 10,
    });
    const Categoriesdata = data.data
    return { Categoriesdata, error };
};

export const getCategoriesStat = () => {
    const { data, error } = useQuery({
        queryKey: ["CategoriesStat"],
        queryFn: () => CategoriesStat(),
    });
    return { data, error };
};