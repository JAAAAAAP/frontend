import React, { useState } from 'react';

// ⭐ Component แสดงและเลือกดาว
const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
                <span
                    key={i}
                    className={`cursor-pointer text-2xl ${i < rating ? "text-yellow-400" : "text-gray-400"}`}
                    onClick={() => setRating(i + 1)}

                >
                    ★
                </span>
            ))}
        </div>
    );
};

const CommentSection = ({ Text_Color, Button_Color, Link_Color, }) => {

    const [comment, setComment] = useState(""); // คอมเม้นท์ใหม่
    const [rating, setRating] = useState(0); // คะแนนรีวิว
    const [comments, setComments] = useState([
        { id: 1, name: "Alice", text: "เกมสนุกมาก!", rating: 5, date: "2024-02-01", replies: [] },
        { id: 2, name: "Bob", text: "ภาพสวยแต่เล่นยากไปหน่อย", rating: 3, date: "2024-01-30", replies: [] }
    ]); // เก็บคอมเม้นท์หลัก
    const [replyingTo, setReplyingTo] = useState(null); // ID คอมเม้นท์ที่กำลังตอบกลับ
    const [replyText, setReplyText] = useState(""); // ข้อความตอบกลับ

    // 📌 ส่งความคิดเห็นใหม่
    const handleSubmit = () => {
        if (!comment.trim()) {
            alert("กรุณากรอกคอมเม้นท์ก่อนส่ง!");
            return;
        }

        const newComment = {
            id: Date.now(), // ใช้ timestamp เป็น ID
            name: "คุณ",
            text: comment,
            rating: rating,
            date: new Date().toISOString().split("T")[0],
            replies: [] // เริ่มต้นยังไม่มีการตอบกลับ
        };

        setComments([newComment, ...comments]); // เพิ่มคอมเม้นท์ใหม่
        setComment(""); // ล้างช่อง
        setRating(0);
    };

    // 📌 ส่งการตอบกลับ
    const handleReplySubmit = (parentId) => {
        if (!replyText.trim()) {
            alert("กรุณาพิมพ์ข้อความตอบกลับ!");
            return;
        }

        // ค้นหาคอมเม้นท์หลักแล้วเพิ่ม replies
        setComments(comments.map(comment => {
            if (comment.id === parentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, {
                        id: Date.now(),
                        name: "คุณ",
                        text: replyText,
                        date: new Date().toISOString().split("T")[0]
                    }]
                };
            }
            return comment;
        }));

        setReplyingTo(null); // ปิดช่องตอบกลับ
        setReplyText("");
    };

    return (
        <div className="flex flex-col gap-3 mt-4 mb-5" style={{ color: Text_Color || '#000000' }}>

            <h1 className="font-semibold text-xl">คอมเม้นท์และรีวิว</h1>

            <div className='flex flex-col gap-2 border rounded-md p-4'>
                <h1 className='font-semibold text-xl'>ให้คะแนนและแสดงความคิดเห็น</h1>
                {/* ⭐ เลือกคะแนนรีวิว */}
                <StarRating rating={rating} setRating={setRating} />

                {/* ช่องกรอกคอมเม้นท์ */}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="เขียนความคิดเห็นของคุณ..."
                    className="w-full h-24 p-2 bg-transparent outline-none border-2 rounded-md"
                />
            </div>

            {/* ปุ่มส่งความคิดเห็น */}
            <button
                onClick={handleSubmit}
                className="w-32 rounded-md p-2"
                style={{ backgroundColor: Button_Color || '#fde047' }}
            >
                ส่งความคิดเห็น
            </button>

            {/* 🔥 แสดงความคิดเห็นทั้งหมด */}
            <div className="mt-4">
                <h2 className="font-medium text-lg mb-2">ความคิดเห็นทั้งหมด:</h2>
                {comments.length > 0 ? (
                    comments.map((c, index) => (
                        <div key={index} className="border-b pb-2 mb-2">
                            {/* ข้อมูลความคิดเห็นหลัก */}
                            <div className="flex gap-3 justify-between text-center items-center">
                                <div className='flex flex-col items-start xl:flex-row xl:gap-3 xl:items-center'>
                                    <span className="font-medium text-xl" style={{ color: Link_Color || '#000000' }}>
                                        {c.name}
                                    </span>
                                    <span className="text-sm md:text-base xl:text-lg">
                                        เวลา : {new Date(c.date).toLocaleString('th-Th', {
                                            day: '2-digit', // แสดงวันที่เป็นรูปแบบ 2 หลัก เช่น "12"
                                            month: '2-digit', // แสดงเดือนเป็นรูปแบบ 2 หลัก เช่น "12"
                                            year: '2-digit', // แสดงปีเป็นแบบตัวเลข 4 หลัก
                                            hour: '2-digit', // แสดงชั่วโมงเป็นรูปแบบ 2 หลัก
                                            minute: '2-digit', // แสดงนาทีเป็นรูปแบบ 2 หลัก
                                        })}
                                    </span>
                                </div>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-2xl ${i < c.rating ? "text-yellow-400" : "text-gray-500"}`}>
                                            ★
                                        </span>
                                    ))}
                                </div>

                            </div>

                            <p className="text-lg">{c.text}</p>


                            {/* ปุ่มตอบกลับ */}
                            <button
                                onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                                className="text-sm font-medium"
                            >
                                {replyingTo === c.id ? "ยกเลิก" : "ตอบกลับ"}
                            </button>

                            {/* ฟอร์มตอบกลับ */}
                            {replyingTo === c.id && (
                                <div className="mt-2 flex flex-col gap-2 rounded-md">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="เขียนคำตอบของคุณ..."
                                        className="w-full p-2 border-2 rounded-md bg-transparent outline-none"
                                    />
                                    <button
                                        onClick={() => handleReplySubmit(c.id)}
                                        className="w-28 rounded-md px-1 py-2"
                                        style={{ backgroundColor: Button_Color || '#fde047' }}
                                    >
                                        ส่งคำตอบกลับ
                                    </button>
                                </div>
                            )}

                            {/* 🔥 แสดงการตอบกลับแบบ Nested */}
                            {c.replies.length > 0 && (
                                <div className="ml-6 mt-2 border-l-2 border-gray-700 pl-4">
                                    {c.replies.map((r, rIndex) => (
                                        <div key={rIndex} className="mb-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold">{r.name}</span>
                                                <span className="text-sm  md:text-base xl:text-lg">
                                                    เวลา : {new Date(r.date).toLocaleString('th-TH', {
                                                        day: '2-digit', // แสดงวันที่เป็นรูปแบบ 2 หลัก เช่น "12"
                                                        month: '2-digit', // แสดงเดือนเป็นรูปแบบ 2 หลัก เช่น "12"
                                                        year: '2-digit', // แสดงปีเป็นแบบตัวเลข 4 หลัก
                                                        hour: '2-digit', // แสดงชั่วโมงเป็นรูปแบบ 2 หลัก
                                                        minute: '2-digit', // แสดงนาทีเป็นรูปแบบ 2 หลัก
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-gray-300">{r.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">ยังไม่มีความคิดเห็น</p>
                )}
            </div>

        </div>
    );
};

export default CommentSection;
