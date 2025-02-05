import React, { useRef } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
Quill.register('modules/imageResize', ImageResize)

function QuillEditer({ name, value, onChange }) {
    const quillRef = useRef(null)

    // จัดการกับการเปลี่ยนแปลงข้อมูลใน Quill Editor
    const handleChange = (value) => {
        if (onChange) {
            onChange({ target: { name, value } })
        }
    }

    const modules = {
        toolbar: [
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ align: [] }],
            ['link', 'image'],
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    };


    return (
        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={modules}
        />
    )
}

export default QuillEditer
