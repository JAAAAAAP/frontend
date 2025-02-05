import { search } from "../service/search";
import { useQuery } from '@tanstack/react-query';

export const handleSearch = (query) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["Search", query], // ใช้ queryKey ที่ไม่ซ้ำกัน
        queryFn: () => search(query), // เรียกฟังก์ชัน search
        enabled: !!query, // เรียก queryFn เฉพาะเมื่อ query มีค่า
    });

    // ส่งค่าที่ได้กลับไปยังผู้ใช้
    return { data, error, isLoading };
};
