import api from "./api";

export const SignIn = async (email, password) => {
    try {
        await api.get('/sanctum/csrf-cookie'); // ขอ CSRF Token
        const response = await api.post('/login', { email, password });
        return response.data // ส่งข้อมูลสำเร็จ
    } catch (error) {
        throw error // ส่งต่อข้อผิดพลาดให้
    }
}

export const SignUp = async (name, email, password) => {
    try {
        const response = await api.post('/register', { name, email, password })
        return response.data
    } catch (error) {
        throw error
    }
}

export const Getme = async () => {
    try {
        const response = await api.get('/V1/getme')
        return response.data
    } catch (error) {
        throw error
    }
}

export const SignOut = async () => {
    try {
        await api.post('V1/logout')
    } catch (error) {
        throw error
    }
}

export const MyProfile = async () => {
    try {
        const response = await api.get('/V1/myprofile')
        return response.data
    } catch (error) {
        throw error
    }
}