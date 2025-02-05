import React from 'react';

// รับ props จาก component หลัก
const ActionDropdown = ({ comment, activeDropdown, setActiveDropdown, handleStartEdit, handleDeleteComment, user }) => {
    const isOwner = user?.email === comment?.user?.email
    const isAdmin = user?.role == "admin"
    if (!isOwner && !isAdmin) return null; // ถ้าไม่ใช่เจ้าของความคิดเห็น ไม่แสดงปุ่ม

    return (
        <div className="relative">
            <button
                className="flex items-center"
                onClick={() => setActiveDropdown(activeDropdown === comment.id ? null : comment.id)}
            >
                <box-icon name='dots-vertical-rounded'></box-icon>
            </button>

            {activeDropdown === comment.id && (
                <div className="absolute right-0 mt-1 bg-white flex flex-col justify-center rounded-md shadow-lg z-10">
                    {isOwner && (
                        <button
                            className="block w-full text-left px-4 py-2"
                            onClick={() => handleStartEdit(comment)}
                        >
                            แก้ไข
                        </button>
                    )}
                    <button
                        className="block w-full text-left px-4 py-2 text-red-600"
                        onClick={() => {
                            handleDeleteComment(comment.id);
                            setActiveDropdown(null);
                        }}
                    >
                        ลบ
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActionDropdown;
