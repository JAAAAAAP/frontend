import React, { useState } from 'react';
import { getCategories } from '../../hook/useCategory';

export default function Filter({ onFilterChange, currentFilters }) {
  const { Categoriesdata, error } = getCategories();

  const [filters, setFilters] = useState(currentFilters || {
    categories: [],
    platforms: [],
    playType: null,
  });

  // ฟังก์ชันสำหรับอัปเดตตัวกรอง
  const updateFilter = (type, value) => {
    let updatedFilters = { ...filters };

    if (type === 'categories') {
      updatedFilters.categories = filters.categories.includes(value)
        ? filters.categories.filter((cat) => cat !== value)
        : [...filters.categories, value];
    } else if (type === 'platforms') {
      updatedFilters.platforms = filters.platforms.includes(value)
        ? filters.platforms.filter((plat) => plat !== value)
        : [...filters.platforms, value];
    } else if (type === 'playType') {
      updatedFilters.playType = value;
    }

    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // เรียก onFilterChange ทันทีเมื่อฟิลเตอร์เปลี่ยน
  };

  const resetCategories = () => {
    const updatedFilters = { ...filters, categories: [] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetPlatforms = () => {
    const updatedFilters = { ...filters, platforms: [] };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetPlayType = () => {
    const updatedFilters = { ...filters, playType: null };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  if (error) {
    return <div className="text-red-500">Error loading categories: {error.message}</div>;
  }

  if (!Categoriesdata) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className='flex flex-col text-lg gap-2'>
      {/* หมวดหมู่ */}
      <div className='flex flex-wrap gap-3 items-center'>
        <h1 className='text-xl font-medium'>หมวดหมู่</h1>
        {Categoriesdata.map((data, index) => (
          <button
            key={index}
            className={`border-2 border-yellow-300 px-3 rounded-md duration-100 ${
              filters.categories.includes(data.name)
                ? 'bg-yellow-300 text-white'
                : 'hover:bg-yellow-300 hover:text-white'
            }`}
            onClick={() => updateFilter('categories', data.name)}
          >
            {data.name}
          </button>
        ))}
        <button
          className='border-2 border-red-400 px-3 rounded-md duration-100 hover:bg-red-400 hover:text-white'
          onClick={resetCategories}
        >
          รีเซ็ต
        </button>
      </div>

      {/* แพลตฟอร์ม */}
      <div className='flex  flex-col gap-3'>
        <div className='flex flex-wrap gap-3 items-center'>
          <h1 className='text-xl font-medium'>แพลตฟอร์ม</h1>
          {['Window', 'Mac', 'Linux', 'Ios', 'Android'].map((platform) => (
            <button
              key={platform}
              className={`border-2 border-yellow-300 px-3 rounded-md duration-100 ${
                filters.platforms.includes(platform)
                  ? 'bg-yellow-300 text-white'
                  : 'hover:bg-yellow-300 hover:text-white'
              }`}
              onClick={() => updateFilter('platforms', platform)}
            >
              {platform}
            </button>
          ))}
          <button
            className='border-2 border-red-400 px-3 rounded-md duration-100 hover:bg-red-400 hover:text-white'
            onClick={resetPlatforms}
          >
            รีเซ็ต
          </button>
        </div>
      </div>

      {/* ประเภทการเล่น */}
      <div className='flex  flex-col gap-3'>
        <div className='flex flex-wrap gap-3 items-center'>
          <h1 className='text-xl font-medium'>ประเภทการเล่น</h1>
          {['Web', 'Download'].map((type) => (
            <button
              key={type}
              className={`border-2 border-yellow-300 px-3 rounded-md duration-100 ${
                filters.playType === type
                  ? 'bg-yellow-300 text-white'
                  : 'hover:bg-yellow-300 hover:text-white'
              }`}
              onClick={() => updateFilter('playType', type)}
            >
              {type}
            </button>
          ))}
          <button
            className='border-2 border-red-400 px-3 rounded-md duration-100 hover:bg-red-400 hover:text-white'
            onClick={resetPlayType}
          >
            รีเซ็ต
          </button>
        </div>
      </div>
    </div>
  );
}
