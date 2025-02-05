import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGamebyId } from '../hook/useGame';
import { useAuthContext } from '../context/AuthContext';
import EditForm from '../component/EditGame/EditForm';

function Editgame() {
    const { slug } = useParams();
    const { data, error } = getGamebyId(slug);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const Gamedata = data?.data;

    // ตรวจสอบว่า data หรือ user กำลังโหลดหรือไม่
    if (!user) {
        return <div>Loading...</div>; // แสดง loading state
    }

    // ตรวจสอบว่า data พร้อมใช้งานและมี error หรือไม่
    if (error || !Gamedata) {
        return <div>Error loading game data.</div>; // แสดง error state
    }

    // ตรวจสอบว่า user เป็นเจ้าของเกมหรือไม่
    const isOwner = user.email === Gamedata.user?.email;

    if (!isOwner) {
        navigate(-1); // ถ้าไม่ใช่เจ้าของ ให้ navigate กลับ
        return null; // ไม่ต้อง render อะไรเพิ่มเติม
    }

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <EditForm initialData={Gamedata} />
            </Suspense>
        </>
    );
}

export default Editgame;