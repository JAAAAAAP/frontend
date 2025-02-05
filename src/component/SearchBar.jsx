import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "../hook/useSearch";
import {
  highlightAndFormatText,
  handleInputChange,
  handleKeyDown,
  handleSuggestionClick,
} from "../utils/searchUtils";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1); // ตำแหน่งคำแนะนำที่เลือก
  const { data, error, isLoading } = handleSearch(query);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null); // ใช้สำหรับจับ container ทั้งหมด
  const navigate = useNavigate();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const games = data?.data?.games || [];
  const users = data?.data?.users || [];
  const meta = data?.meta || [];

  return (
    <div ref={suggestionRef}>
      <div className="flex items-center justify-center border rounded-md ">
        <input
          type="text"
          ref={inputRef}
          value={query.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          onChange={(e) => handleInputChange(e, setQuery, setShowSuggestions)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              data,
              selectedIndex,
              setSelectedIndex,
              navigate,
              query,
              setQuery,
              setShowSuggestions
            )
          }
          placeholder="ค้นหาเกมหรือผู้ใช้..."
          className="px-1 outline-yellow-300 w-28 md:px-2 md:py-1 md:w-96"
        />
        <div
          // onClick={() =>
          //   handleSuggestionClick(undefined, query, navigate, setQuery, setShowSuggestions)
          // }
          className="flex justify-center items-center h-full px-1 cursor-pointer"
        >
          <box-icon name="search-alt-2" className="" ></box-icon>
        </div>
      </div>

      {isLoading && <p>กำลังค้นหา...</p>}
      {error && <p className="text-red-500">เกิดข้อผิดพลาด: {error.message}</p>}

      {showSuggestions && (
        <div className="relative z-10">
          <div className="absolute border rounded-md w-full bg-white shadow-md">
            {/* แสดงผลเกม */}
            {games.length > 0 && (
              <div className="border-b text-start">

                <div className="flex justify-between items-center font-medium border-b border-t text-xs md:text-lg">
                  <p className="px-2 py-1">เกม</p>
                  <p className="px-2 py-1 text-[10px]  md:text-base">ผลการค้นหา {meta.games_result} รายการ</p>
                </div>

                <div className="my-2">
                  {games.map((game, index) => (
                    <div
                      key={`game-${index}`}
                      className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-yellow-300 hover:text-white  ${selectedIndex === index ? "bg-yellow-300 text-white " : ""}`}
                      onMouseDown={() =>
                        handleSuggestionClick(
                          game, // ส่งค่าที่เลือก
                          query,
                          navigate,
                          setQuery,
                          setShowSuggestions
                        )
                      }
                    >
                      {game?.galleries?.map((val, index) => (
                        <img key={index} src={val.images} alt="" loading="lazy" className="w-10 h-10 object-cover aspect-square" />
                      ))}
                      <div className="flex flex-col justify-center text-xs md:text-base">
                        <p className="max-w-20 break-words line-clamp-2 md:max-w-[350px] md:line-clamp-1">
                          {highlightAndFormatText(game.title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), query)}
                        </p>
                        <p className="text-[10px]  md:text-sm ">
                          {game.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* แสดงผลผู้ใช้ */}
            {/* {users.length > 0 && (
              <div>
                <div className="flex justify-between items-center font-medium border-b border-t">
                  <p className="px-2 py-1 text-[12px] md:text-base">ผู้ใช้</p>
                  <p className="px-2 py-1 text-[9px]  md:text-base">ผลการค้นหา {meta.users_result} รายการ</p>
                </div>

                <div className="my-2">
                  {users.map((user, index) => (
                    <div
                      key={`user-${index}`}
                      className={`text-start py-1 px-2 cursor-pointer hover:bg-yellow-300 hover:text-white ${selectedIndex === games.length + index ? "bg-yellow-300 text-white" : ""}`}
                      onMouseDown={() =>
                        handleSuggestionClick(
                          user, // ส่งค่าที่เลือก
                          query,
                          navigate,
                          setQuery,
                          setShowSuggestions
                        )
                      }
                    >
                      <p className="text-[11px] md:text-sm">
                        {highlightAndFormatText(user.name, query)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* ไม่มีคำแนะนำ */}
            {games.length === 0 && users.length === 0 && (
              <p className="px-2 py-1">ไม่พบการค้นหา</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
