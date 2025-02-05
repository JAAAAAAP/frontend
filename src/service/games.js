import api from "./api";
import axios from "axios"
export const games = async ({ perPage = 100, sortBy = 'title', sortOrder = 'asc', page = 1, categories, platforms, playType } = {}) => {

    const response = await api.get('V1/games', {
        params: {
            perPage,
            page,
            sort_by: sortBy,
            sort_order: sortOrder,
            categories: categories?.join(','),
            platforms: platforms?.join(','),
            playtype: playType
        }
    });
    return response.data;
}

export const newestGames = async () => {
    const response = await api.get('V1/newestgames')
    return response.data
}

export const mostDownloadGames = async () => {
    const response = await api.get('V1/mostdownloadgames')
    return response.data
}

export const mostRatingGames = async () => {
    const response = await api.get('V1/mostratinggames')
    return response.data
}

export const getgame = async (slug) => {
    const response = await api.get(`V1/games/${slug}`)
    return response.data
}

export const uploadGame = async (gameData, onUploadProgress, controller) => {
    const formData = new FormData();

    formData.append('title', gameData.title)
    formData.append('content', gameData.content || '')
    formData.append('play_type', gameData.play_type || '')
    formData.append('canplay', gameData.canplay || null)

    if (gameData.file && typeof gameData.file === 'object') {
        Object.entries(gameData.file).forEach(([key, file]) => {
            if (file instanceof File) {
                formData.append(`file[${key}]`, file)
            } else {
                console.error(`file[${key}] ไม่ใช่ไฟล์ที่ถูกต้อง`)
            }
        })
    }

    if (gameData.logo) formData.append('logo', gameData.logo[0])
    if (gameData.background) formData.append('background', gameData?.background[0])

    gameData.galleries?.forEach((file) => {
        formData.append('galleries[]', file)
    });

    gameData.canplay?.forEach((item) => formData.append('canplay[]', item))
    gameData.category_id?.forEach((id) => formData.append('category_id[]', id))

    formData.append('Bg_Color', gameData.Bg_color || '')
    formData.append('Bg_2_Color', gameData.Bg_2_Color || '')
    formData.append('Link_Color', gameData.Link_Color || '')
    formData.append('Text_Color', gameData.Text_Color || '')
    formData.append('Button_Color', gameData.Button_Color || '')
    formData.append('Background_opacity', gameData.Background_opacity || 100)

    try {
        const response = await api.post('V1/games', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
            signal: controller.signal
        })
        return response.data
    } catch (error) {
        if (axios.isCancel(error)) {
            throw new Error("Upload cancelled")
        } else {
            throw error
        }
    }
};

export const updateGame = async (formData, id) => {
    try {
        const response = await api.put(`V1/games/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteGame = async (id) => {
    try {
        const response = await api.delete(`V1/games/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const downloadGameCount = async (id) => {
    try {
        const response = await api.post(`V1/updateDownloadCount/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getGameStat = async () => {
    try {
        const response = await api.get(`V1/gamestat`);
        return response.data;
    } catch (error) {
        throw error;
    }
}


