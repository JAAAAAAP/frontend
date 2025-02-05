import React, { createContext, useState, useContext, useEffect } from 'react';

export const UploadGameContext = createContext();

export const UploadGameProvider = ({ children }) => {
    const initialData = {
        title: null,
        content: "",
        play_type: null,
        canplay: [],
        file: {},
        category_id: [],

        logo: null,
        background: null,
        galleries: [],

        Bg_color: null,
        Bg_2_Color: null,
        Link_Color: null,
        Text_Color: null,
        Button_Color: null,
        Background_opacity: null
    };

    // โหลดข้อมูลจาก Local Storage
    const storedData = JSON.parse(localStorage.getItem('Gamedata')) || initialData;

    const [Gamedata, setGamedata] = useState(storedData);

    const updateGamedata = (dataOrCallback) => {
        setGamedata((prevData) => {
            const newData =
                typeof dataOrCallback === 'function'
                    ? dataOrCallback(prevData)
                    : { ...prevData, ...dataOrCallback };

            if (dataOrCallback.file) {
                newData.file = { ...prevData.file, ...dataOrCallback.file };
            }
            if (newData.content === "<p><br></p>") {
                newData.content = "";
            }

            // บันทึกข้อมูลใหม่ลง Local Storage
            localStorage.setItem('Gamedata', JSON.stringify(newData));

            return newData;
        });
    };

    // อัปเดต Local Storage เมื่อมีการเปลี่ยนแปลงใน Gamedata
    useEffect(() => {
        localStorage.setItem('Gamedata', JSON.stringify(Gamedata));
    }, [Gamedata]);

    return (
        <UploadGameContext.Provider value={{ Gamedata, updateGamedata }}>
            {children}
        </UploadGameContext.Provider>
    );
};

export const useUploadGameContext = () => useContext(UploadGameContext);
