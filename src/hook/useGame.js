import { useState, useRef } from "react"
import { games, newestGames, mostDownloadGames, mostRatingGames, getgame, uploadGame, updateGame, deleteGame, downloadGameCount } from "../service/games"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const getGames = async ({ perPage = 70, sortBy = 'title', sortOrder = 'asc', page = 1, categories, platforms, playType }) => {
    try {
        const response = await games({ perPage, sortBy, sortOrder, page, categories, platforms, playType })
        return {
            data: response.data,
            meta: response.meta
        }
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}


export const useNewestGames = () => {
    const { data: data, error: errorNewest } = useQuery({
        queryKey: ["NewestGames"],
        queryFn: () => newestGames(),
        suspense: true,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 10,
    });

    const NewestGamesdata = data.data
    return { NewestGamesdata, errorNewest };
};

export const useMostDownload = () => {

    const { data: data, error: errorDownload } = useQuery({
        queryKey: ["MostDownload"],
        queryFn: () => mostDownloadGames(),
        suspense: true,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 10,
    })

    const MostDownloaddata = data.data
    return { MostDownloaddata, errorDownload }
}

export const useMostRating = () => {
    const { data: data, error: errorRating } = useQuery({
        queryKey: ["MostRating"],
        queryFn: () => mostRatingGames(),
        suspense: true,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 10,
    })

    const MostRatingdata = data.data
    return { MostRatingdata, errorRating }
}

export const useIndexGame = () => {
    const { data: data, error: errorGames } = useQuery({
        queryKey: ["IndexGames"],
        queryFn: () => getGames({ perPage: 20 }),
        suspense: true,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 10,
    })

    const IndexGamesdata = data.data
    return { IndexGamesdata, errorGames }
}

export const getGamebyId = (slug) => {

    const { data, error } = useQuery({
        queryKey: ["GamebyId", slug],
        queryFn: () => getgame(slug),
        suspense: true,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 10,
    })

    return { data, error };
}

export const useAllGames = (sortBy = 'title', sortOrder = 'asc', page = 1, categories, platforms, playType) => {

    const { data: data, error: errorGames, isFetching } = useQuery({
        queryKey: ["IndexGames", sortBy, sortOrder, page, categories, platforms, playType],
        queryFn: () => getGames({
            sortBy: sortBy, sortOrder: sortOrder, page: page,
            categories: categories,
            platforms: platforms,
            playType: playType,
        }),
        suspense: true,
        cacheTime: 1000 * 60 * 10,

    })

    const Gamesdata = data?.data
    const Gamesmeta = data?.meta
    return { Gamesdata, Gamesmeta, errorGames, isFetching }
}

export const useUploadGame = () => {
    const queryClient = useQueryClient()
    const [uploadProgress, setUploadProgress] = useState(0)
    const controllerRef = useRef(null)

    const mutation = useMutation({
        mutationFn: async (gameData) => {
            controllerRef.current = new AbortController()
            try {
                await uploadGame(gameData, (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    )
                    setUploadProgress(percentCompleted)
                }, controllerRef.current)
            } catch (error) {
                throw error
            }
        },
        onSuccess: () => {
            if (!controllerRef.current) {
                return
            }
            queryClient.invalidateQueries(["IndexGames"])
            setUploadProgress(0)
            controllerRef.current = null
        },
        onError: (error) => {
            if (error.message === "Upload cancelled") {
                return
            }
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            setUploadProgress(0)
            toast.error(error?.response?.data?.message || "เกิดข้อผิดพลาดในการอัปโหลดเกม", {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        },
    })

    const cancelUpload = () => {
        if (controllerRef.current) {
            controllerRef.current.abort(); // ยกเลิกคำขอ
            controllerRef.current = null; // รีเซ็ต Progress
            setUploadProgress(0);
            toast.info('การอัปโหลดถูกยกเลิก', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
    }

    return { ...mutation, uploadProgress, cancelUpload }
}

export const useUpdateGame = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ formData, id }) => {
            return await updateGame(formData, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['games']);
        },
    });
};

export const useDeleteGame = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (id) => {
            try {
                await deleteGame(id)
            } catch (error) {
                throw error
            }

        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['NewestGames'])
            queryClient.invalidateQueries(['IndexGames'])
            queryClient.invalidateQueries(['MostDownload'])
            queryClient.invalidateQueries(['MostRating'])
            return data
        },
        onError: (error) => {
            throw error
        }
    })

    return { ...mutation }

}

export const useDownloadGameCount = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (id) => {
            try {
                await downloadGameCount(id)
            } catch (error) {
                throw error
            }

        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['NewestGames'])
            queryClient.invalidateQueries(['IndexGames'])
            queryClient.invalidateQueries(['MostDownload'])
            queryClient.invalidateQueries(['MostRating'])
            return data
        },
        onError: (error) => {
            throw error
        }
    })

    return { ...mutation }
}
