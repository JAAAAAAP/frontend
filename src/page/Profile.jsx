import React from 'react'
import { useAuthContext } from '../context/AuthContext'

function Profile() {

    const { user } = useAuthContext()

    return (
        <div>
            ฟหกไฟ
        </div>
    )
}

export default Profile
