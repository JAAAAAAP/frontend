import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useAddReview, useReplyReviews, useDeleteReview, useEditReview } from '../../hook/useReviews'
import ActionDropdown from './ActionDropdown'
import { Link } from 'react-router-dom'

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

const CommentSection = ({ Text_Color, Button_Color, Link_Color, data, user }) => {

    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)

    const [comments, setComments] = useState("")
    const [replyingTo, setReplyingTo] = useState(null)
    const [replyText, setReplyText] = useState("")

    const [activeDropdown, setActiveDropdown] = useState(null)
    const [editingComment, setEditingComment] = useState(null)
    const [editText, setEditText] = useState('')
    const [editRating, setEditRating] = useState(0)

    const { mutateAsync, isPending } = useAddReview()
    const { mutateAsync: DeleteReview, isPending: DeleteReviewPending } = useDeleteReview()
    const { mutateAsync: EditReview, isPending: EditReviewPending } = useEditReview()
    const { mutateAsync: ReplyReviews, isPending: useReplyReviewsPending } = useReplyReviews()

    // 📌 ส่งความคิดเห็นใหม่
    const handleSubmit = async () => {
        try {

            if (!comment.trim()) {
                toast.error("กรุณากรอกข้อความก่อนส่ง", {
                    autoClose: 1500,
                    position: 'top-center',
                    hideProgressBar: true,
                    closeOnClick: true,
                    isLoading: false
                })
                return
            }

            const newComment = {
                comment: comment,
                rating: String(rating),
                game_id: data.game_id,
                game_name: data.game_name,
                parent: replyingTo ? replyingTo : null,
            }

            await mutateAsync(newComment)

            toast.success('เพิ่มความคิดเห็นสำเร็จ', {
                autoClose: 1500,
                position: 'top-center',
                hideProgressBar: true,
                closeOnClick: true,
                isLoading: false
            })

            setComment(""); // ล้างช่อง
            setRating(0);

        } catch (error) {
            toast.error('ไม่สามารถเพิ่มความคิดเห็นได้', {
                autoClose: 1500,
                position: 'top-center',
                hideProgressBar: true,
                closeOnClick: true,
                isLoading: false
            })
        }
    };

    // 📌 ส่งการตอบกลับ
    const handleReplySubmit = (parentId) => {

        if (!replyText.trim()) {
            toast.error('กรุณากรอกข้อความก่อนส่ง', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })

            return;
        }

        // ค้นหาคอมเม้นท์หลักแล้วเพิ่ม replies
        setComments(data.comment.map(comment => {
            if (comment.id === parentId) {
                const newReply = {
                    comment: replyText,
                    rating: String(0),
                    game_id: data.game_id,
                    game_name: data.game_name,
                    parent: replyingTo ? replyingTo : null,
                };

                try {

                    mutateAsync(newReply)

                    toast.success('ตอบกลับความคิดเห็นสำเร็จ', {
                        autoClose: 1500,
                        position: 'top-center',
                        hideProgressBar: true,
                        closeOnClick: true,
                        isLoading: false
                    })
                } catch (error) {
                    toast.error('ไม่สามารถตอบกลับความคิดเห็นได้', {
                        position: 'top-center',
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    })
                }

            }
            return comment;
        }));

        setReplyingTo(null); // ปิดช่องตอบกลับ
        setReplyText("");
    };

    const handleStartEdit = (comment) => {
        setEditingComment(comment.id);
        setEditText(comment.comment);
        setActiveDropdown(null);
    };

    const handleSaveEdit = async (commentId) => {

        try {

            if (!editText.trim()) {
                toast.error('กรุณากรอกข้อความก่อนส่ง', {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    isLoading: false
                })
                return;
            }

            await EditReview({ id: commentId, comment: editText, rating: editRating })

            setEditingComment(null)
            setEditText('')
            setEditRating(0)

            toast.success('แก้ไขความคิดเห็นสำเร็จ', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                isLoading: false
            })
        } catch (error) {
            toast.error('ไม่สามารถแก้ไขความคิดได้', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                isLoading: false
            })
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await DeleteReview(commentId)
            toast.success('ลบความคิดเห็นสำเร็จ', {
                autoClose: 1500,
                position: 'top-center',
                hideProgressBar: true,
                closeOnClick: true,
                isLoading: false
            })
        } catch (error) {
            toast.error('ไม่สามารถลบความคิดได้', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                isLoading: false
            })
        }
    };

    const mainComments = Array.isArray(data.comment)
        ? data.comment.filter(comment => !comment.parent_id)
        : [];
    const replies = Array.isArray(data.comment)
        ? data.comment.filter(comment => comment.parent_id)
        : [];
    const findReplies = (commentId) => {
        return replies.filter(reply => reply.parent_id === commentId.toString());
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
            {isPending ? (
                <button
                    className="w-40 rounded-md p-2"
                    style={{ backgroundColor: Button_Color || '#fde047' }}
                >
                    กำลังส่งความคิดเห็น...
                </button>
            ) : (
                <button
                    onClick={handleSubmit}
                    className="w-32 rounded-md p-2"
                    style={{ backgroundColor: Button_Color || '#fde047' }}
                >
                    ส่งความคิดเห็น
                </button>
            )}

            {/* 🔥 แสดงความคิดเห็นทั้งหมด */}
            <div className="mt-4">
                <h2 className="font-medium text-lg mb-2">ความคิดเห็นทั้งหมด:</h2>
                {Array.isArray(data.comment) && data.comment.length > 0 ? (
                    mainComments.map((c, index) => (

                        <div key={index} className="border-b-2 pb-2 mb-2" style={{ borderColor: Text_Color || '#000000' }}>
                            {/* ข้อมูลความคิดเห็นหลัก */}
                            <div className="flex gap-3 justify-between text-center items-center">
                                <div className='flex flex-col items-start xl:flex-row xl:gap-3 xl:items-center'>
                                    <div className="font-medium text-xl" style={{ color: Link_Color || '#000000' }}>
                                        {user.email === c.user.email ? (
                                            <span>คุณ</span>
                                        ) : (
                                            <Link className='underline'>{c.user.name}</Link>
                                        )}
                                    </div>
                                    <span className="text-sm md:text-base xl:text-lg">
                                        เวลา : {new Date(c.created_at).toLocaleString('th-Th', {
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

                                    <div className='relative top-1' style={{ fill: Text_Color || '#000000' }}>

                                        <ActionDropdown
                                            comment={c}
                                            activeDropdown={activeDropdown}
                                            setActiveDropdown={setActiveDropdown}
                                            handleStartEdit={handleStartEdit}
                                            handleDeleteComment={handleDeleteComment}
                                            user={user}
                                        />

                                    </div>
                                </div>
                            </div>

                            {editingComment === c.id ? (
                                <div className='flex flex-col gap-1'>
                                    <div >
                                        <StarRating rating={editRating} setRating={setEditRating} />

                                        <textarea
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className='p-1 pl-2 bg-transparent outline-none border rounded-md w-full'
                                            style={{ borderColor: Text_Color || "#000000" }}
                                        />
                                    </div>

                                    <div className='flex gap-2'>
                                        {EditReviewPending ? (
                                            <>
                                                <button
                                                    className="w-28 px-4 py-1 text-white rounded-md cursor-not-allowed"
                                                    style={{ backgroundColor: Button_Color || "#fde047", color: Text_Color || "#000000" }}
                                                >
                                                    กำลังแก้ไข...
                                                </button>
                                                <button className="w-24 px-4 py-1 text-white cursor-not-allowed bg-red-400 rounded-md">
                                                    ยกเลิก
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleSaveEdit(c.id)}
                                                    className="w-24 px-4 py-1 text-white rounded-md"
                                                    style={{ backgroundColor: Button_Color || "#fde047", color: Text_Color || "#000000" }}
                                                >
                                                    แก้ไข
                                                </button>
                                                <button
                                                    onClick={() => setEditingComment(null)}
                                                    className="w-24 px-4 py-1 text-white bg-red-500 rounded-md"
                                                >
                                                    ยกเลิก
                                                </button>
                                            </>
                                        )}

                                    </div>
                                </div>
                            ) : (
                                <p className="text-lg max-w-full break-words">{c.comment}</p>
                            )}


                            {/* ปุ่มตอบกลับ */}
                            <button
                                onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                                className="font-medium underline"
                            >
                                {replyingTo === c.id ? "ยกเลิก" : "ตอบกลับ"}
                            </button>

                            {/* ฟอร์มตอบกลับ */}
                            {replyingTo === c.id && (
                                <div className="mt-2 mb-2 flex flex-col gap-2 rounded-md">
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="เขียนคำตอบของคุณ..."
                                        className="w-full p-2 border-2 rounded-md bg-transparent outline-none"
                                        style={{ color: Text_Color || '#000000', borderColor: Text_Color || '#000000' }}
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

                            <div className="ml-8 space-y-3">
                                {findReplies(c.id).map(reply => (
                                    <div key={reply.id} className="border-l-2 pl-4 pb-2" style={{ borderColor: Text_Color || '#000000' }}>
                                        <div className="flex gap-3 justify-between items-start">
                                            <div className="flex flex-col items-start xl:flex-row xl:gap-3 xl:items-center">
                                                <div className="text-xl font-medium" style={{ color: Link_Color || '#000000' }}>
                                                    {user.email === reply.user.email ? (
                                                        <span>คุณ</span>
                                                    ) : (
                                                        <Link className='underline'>{reply.user.name}</Link>
                                                    )}
                                                </div>
                                                <span className="text-sm  md:text-base xl:text-lg">
                                                    เวลา : {new Date(reply.created_at).toLocaleString('th-TH', {
                                                        day: '2-digit', // แสดงวันที่เป็นรูปแบบ 2 หลัก เช่น "12"
                                                        month: '2-digit', // แสดงเดือนเป็นรูปแบบ 2 หลัก เช่น "12"
                                                        year: '2-digit', // แสดงปีเป็นแบบตัวเลข 4 หลัก
                                                        hour: '2-digit', // แสดงชั่วโมงเป็นรูปแบบ 2 หลัก
                                                        minute: '2-digit', // แสดงนาทีเป็นรูปแบบ 2 หลัก
                                                    })}
                                                </span>
                                            </div>

                                            <div style={{ fill: Text_Color || '#000000' }}>

                                                <ActionDropdown
                                                    comment={reply}
                                                    activeDropdown={activeDropdown}
                                                    setActiveDropdown={setActiveDropdown}
                                                    handleStartEdit={handleStartEdit}
                                                    handleDeleteComment={handleDeleteComment}
                                                    user={user}

                                                />
                                            </div>
                                        </div>

                                        {editingComment === reply.id ? (
                                            <div className='flex flex-col gap-3'>
                                                <textarea
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    className='p-1 pl-2 bg-transparent outline-none border rounded-md'
                                                    style={{ borderColor: Text_Color || "#000000" }}
                                                />

                                                <div className='flex gap-2'>
                                                    {EditReviewPending ? (
                                                        <>
                                                            <button
                                                                className="w-28 px-4 py-1 text-white rounded-md cursor-not-allowed"
                                                                style={{ backgroundColor: Button_Color || "#fde047", color: Text_Color || "#000000" }}
                                                            >
                                                                กำลังแก้ไข...
                                                            </button>
                                                            <button className="w-24 px-4 py-1 text-white cursor-not-allowed bg-red-400 rounded-md">
                                                                ยกเลิก
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleSaveEdit(reply.id)}
                                                                className="w-24 px-4 py-1 text-white rounded-md"
                                                                style={{ backgroundColor: Button_Color || "#fde047", color: Text_Color || "#000000" }}
                                                            >
                                                                แก้ไข
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingComment(null)}
                                                                className="w-24 px-4 py-1 text-white bg-red-500 rounded-md"
                                                            >
                                                                ยกเลิก
                                                            </button>
                                                        </>
                                                    )}
                                                </div>

                                            </div>
                                        ) : (
                                            <p className="text-lg max-w-full break-words">{reply.comment}</p>
                                        )}

                                    </div>
                                ))}
                            </div>



                        </div>


                    ))
                ) : (
                    <div>ยังไม่มีความคิดเห็น</div>  // หรือข้อความที่คุณต้องการแสดงเมื่อไม่มีความคิดเห็น
                )}

            </div>

        </div>
    );
};

export default CommentSection;
