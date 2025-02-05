import React, { useEffect } from 'react'
import DOMPurify from 'dompurify'

function Content({ Gamecontent, Link_Color, Text_Color }) {

    const sanitizedContent = Gamecontent ? DOMPurify.sanitize(Gamecontent) : ''

    const addTargetBlankToLinks = () => {
        const links = document.querySelectorAll('a')
        links.forEach(link => {
            link.setAttribute('target', '_blank')
        })
    }

    const updateLinkStyles = () => {
        const links = document.querySelectorAll('.prose a') // เลือกเฉพาะลิงก์ใน .prose
        links.forEach(link => {
            link.style.color = Link_Color || '#73d9fc' // ใช้สีจาก Gamedata หรือค่าเริ่มต้น
        })
        const strongs = document.querySelectorAll('.prose strong')
        strongs.forEach(strong => {
            strong.style.color = Text_Color || '#000000' // ใช้สีจาก Text_Color หรือค่าเริ่มต้น
        })
    }

    useEffect(() => {
        addTargetBlankToLinks()
        updateLinkStyles()
    }, [sanitizedContent, Link_Color, Text_Color])

    return (
        <div className='w-full mb-20 mt-5'>
            <div
                className='prose max-w-none'
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                style={{ color: Text_Color || '#000000' }}
            />
        </div>
    )
}

export default Content
