import React, { useState, useEffect } from 'react'
import QuillEditer from '../UploadGame/QuillEditer'
import { getCategories } from '../../hook/useCategory';
import { useUpdateGame } from '../../hook/useGame';

const GameUpdateForm = ({ initialData = {} }) => {

    const { mutate, isLoading, isError, error } = useUpdateGame()
    const { Categoriesdata } = getCategories()
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        play_type: 'web',
        canplay: [],
        category_id: [],
        Background_opacity: '100',
        Bg_Color: '#ffffff',
        Bg_2_Color: '#ffffff',
        Text_Color: '#000000',
        Link_Color: '#0000ff',
        Button_Color: '#000000',

        logo: null,
        background: null,
        galleries: [],

        files: {
            web: "",
            download: {}
        }
    });

    const [previewImages, setPreviewImages] = useState({
        logo: '',
        galleries: [],
        background: ''
    });

    useEffect(() => {
        if (initialData) {
            const categoryIds = initialData.categories?.map(cat => cat.id) || [];
            const theme = initialData.galleries?.[0]?.theme || {};

            console.log('====================================');
            console.log(theme);
            console.log('====================================');

            setFormData({
                title: initialData.title || '',
                content: initialData.content || '',
                play_type: initialData.play_type || 'web',
                canplay: initialData.canplay || [],
                category_id: categoryIds,
                Background_opacity: theme?.Background_opacity || '100',
                Bg_Color: theme?.Bg_Color || '#ffffff',
                Bg_2_Color: theme?.Bg_2_Color || '#ffffff',
                Text_Color: theme?.Text_Color || '#000000',
                Link_Color: theme?.Link_Color || '#0000ff',
                Button_Color: theme?.Button_Color || '#000000',
                logo: initialData.galleries?.[0]?.images.logo || null,
                background: initialData.galleries?.[0]?.images.background || null,
                galleries: initialData.galleries?.[0]?.images.galleries || [],
                files: {
                    web: initialData.file_path?.web || "",
                    download: initialData.file_path?.download || {}
                }
            });

            if (initialData.galleries?.[0]?.images) {
                setPreviewImages({
                    logo: initialData.galleries[0].images.logo || '',
                    galleries: initialData.galleries[0].images.galleries || [],
                    background: initialData.galleries[0].images.background || ''
                });
            }
        }
    }, [initialData]);

    const platformOptions = ['Ios', 'Android', 'Window', 'Linux', 'Mac'];
    const playTypeOptions = ['web', 'download'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlatformChange = (platform) => {
        const updatedPlatforms = formData.canplay.includes(platform)
            ? formData.canplay.filter(p => p !== platform)
            : [...formData.canplay, platform];

        setFormData(prev => ({
            ...prev,
            canplay: updatedPlatforms
        }));
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        const categoryId = Number(value)
        setFormData(prev => {
            const updatedCategories = checked
                ? [...prev.category_id, categoryId] // ถ้าเลือกเพิ่มค่า category
                : prev.category_id.filter(id => id !== categoryId); // ถ้าเลือกออกลบ category
            return {
                ...prev,
                category_id: updatedCategories
            };
        });
    };

    const handleFileChange = (e, platform) => {
        const file = e.target.files[0];
        if (file) {
            if (formData.play_type === "download") {
                setFormData(prev => ({
                    ...prev,
                    files: {
                        ...prev.files,
                        download: {
                            ...prev.files.download,
                            [platform]: {
                                url: file, // จะได้ค่าจากเซิร์ฟเวอร์หลังอัปโหลด
                                size: file.size / (1024 * 1024) // คำนวณขนาดเป็น MB
                            }
                        }
                    }
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    files: {
                        ...prev.files,
                        web: {
                            file: file,  // เก็บ File object จริง ๆ
                        }
                    }
                }));
            }
        }
    };

    const handleImagesFileChange = (e) => {
        const { name, files } = e.target;
        const fileArray = Array.from(files);

        // ถ้าไม่มีไฟล์ หรือถูกกดยกเลิก
        if (fileArray.length === 0) {

            // ตรวจสอบว่า fileInputRefs[name] มีอยู่ก่อนใช้ .current
            if (fileInputRefs[name] && fileInputRefs[name].current) {
                fileInputRefs[name].current.value = ""; // รีเซ็ตค่า input file
            }

            setFormData((prevData) => ({
                ...prevData, // เก็บค่าก่อนหน้าไว้
                [name]: null, // ล้างค่าไฟล์
            })) // ล้างค่าไฟล์ใน Gamedata
            return;
        }

        setFormData((prevData) => ({
            ...prevData, // เก็บค่าก่อนหน้าไว้
            [name]: fileArray, // อัปเดตเฉพาะไฟล์ที่เปลี่ยน
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('play_type', formData.play_type);
        formDataToSend.append('canplay', JSON.stringify(formData.canplay));
        formDataToSend.append('category_id', JSON.stringify(formData.category_id));

        // ธีมและสี
        const theme = {
            Background_opacity: formData.Background_opacity,
            Bg_Color: formData.Bg_Color,
            Bg_2_Color: formData.Bg_2_Color,
            Text_Color: formData.Text_Color,
            Link_Color: formData.Link_Color,
            Button_Color: formData.Button_Color
        };
        formDataToSend.append('theme', JSON.stringify(theme));

        // จัดการไฟล์รูปภาพ
        if (formData.logo instanceof File) {
            formDataToSend.append('logo', formData.logo);
        }
        if (formData.background instanceof File) {
            formDataToSend.append('background', formData.background);
        }
        if (formData.galleries && Array.isArray(formData.galleries)) {
            formData.galleries.forEach((file, index) => {
                if (file instanceof File) {
                    formDataToSend.append(`galleries[${index}]`, file);
                }
            });
        }

        // จัดการไฟล์เกม
        if (formData.play_type === 'web' && formData.files.web instanceof File) {
            formDataToSend.append('web_file', formData.files.web);
        } else if (formData.play_type === 'download') {
            Object.entries(formData.files.download).forEach(([platform, fileData]) => {
                if (fileData.url instanceof File) {
                    formDataToSend.append(`download_files[${platform}]`, fileData.url);
                    formDataToSend.append(`download_sizes[${platform}]`, fileData.size);
                }
            });
        }

        // เรียก `mutate` เพื่อส่งข้อมูลไปยัง API
        mutate(
            { formData: formDataToSend, id: initialData.id },
            {
                onSuccess: (data) => {
                    console.log('Game updated successfully:', data);
                    alert('Game updated successfully!');
                },
                onError: (error) => {
                    console.error('Error updating game:', error);
                    alert('Error updating game: ' + error.message);
                }
            }
        );
    };



    return (
        <div>
            <div>
                <h1>แก้ไขเกม {formData.title}</h1>
            </div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="">ชื่อเกม</label>
                    <input
                        type="text"
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="">play_type</label>
                    <select
                        name="play_type"
                        value={formData.play_type}
                        onChange={handleInputChange}
                    >
                        {playTypeOptions.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>


                {formData.play_type === "download" && (
                    <div>
                        <label htmlFor=""></label>
                        <div className="grid grid-cols-2 gap-4">
                            {platformOptions.map(platform => (
                                <div key={platform} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={platform}
                                        checked={formData.canplay.includes(platform)}
                                        onChange={() => handlePlatformChange(platform)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={platform} className="text-sm text-gray-700">
                                        {platform}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div>
                            {formData.canplay.map(platform => (
                                <div key={platform} className="flex items-center space-x-2">
                                    <label htmlFor={platform} className="text-sm text-gray-700">
                                        {platform}
                                    </label>
                                    <input
                                        type="file"
                                        id={platform}
                                        onChange={(e) => handleFileChange(e, platform)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {formData.play_type === "web" && (
                    <div>
                        <label>Web URL:</label>
                        <input
                            type="file"
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                files: {
                                    ...prev.files,
                                    web: e.target.files[0]
                                }
                            }))}
                        />
                    </div>
                )}

                <div>
                    {Categoriesdata.map((category) => (
                        <label key={category.id} className="inline-flex items-center space-x-2 mr-4">
                            <input
                                type="checkbox"
                                name="category_id"
                                value={category.id}
                                checked={formData.category_id?.includes(category.id)} // ควบคุมสถานะ
                                onChange={handleCategoryChange}
                                className="w-5 h-5 accent-yellow-300"
                            />
                            <span>{category.name}</span>
                        </label>
                    ))}
                </div>

                <div>
                    <label htmlFor=""></label>
                    <input
                        name='logo'
                        type="file"
                        onChange={handleImagesFileChange}
                    />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input
                        name='background'
                        type="file"
                        onChange={handleImagesFileChange}
                    />
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input
                        name='galleries'
                        type="file"
                        multiple
                        onChange={handleImagesFileChange}
                    />
                </div>

                <div>
                    <label htmlFor=""></label>
                    <QuillEditer
                        name="content"
                        value={formData?.content || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Background Color
                        </label>
                        <input
                            type="color"
                            name="Bg_Color"
                            value={formData.Bg_Color}
                            onChange={handleInputChange}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Secondary Background Color
                        </label>
                        <input
                            type="color"
                            name="Bg_2_Color"
                            value={formData.Bg_2_Color}
                            onChange={handleInputChange}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Background Opacity
                        </label>
                        <input
                            type="number"
                            name="Background_opacity"
                            value={formData.Background_opacity}
                            onChange={handleInputChange}
                            min="0"
                            max="100"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Text Color
                        </label>
                        <input
                            type="color"
                            name="Text_Color"
                            value={formData.Text_Color}
                            onChange={handleInputChange}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link Color
                        </label>
                        <input
                            type="color"
                            name="Link_Color"
                            value={formData.Link_Color}
                            onChange={handleInputChange}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Button Color
                        </label>
                        <input
                            type="color"
                            name="Button_Color"
                            value={formData.Button_Color}
                            onChange={handleInputChange}
                            className="w-full h-10 p-1 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <button type="submit">ok</button>

            </form>
        </div>
    );
};

export default GameUpdateForm;