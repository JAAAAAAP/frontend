import React, { Suspense, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAllGames } from '../hook/useGame';

// import CardGame from '../component/CardGame';
import Sortbar from '../component/Gemes/Sortbar';
import Pagination from '../component/Gemes/Pagination';
import Filter from '../component/Gemes/Filter';

const CardGame = React.lazy(() => import('../component/CardGame'));

import { buildUrl } from '../utils/bulidUrl';
import { actualSortBy, actualSortOrder } from '../utils/sortUtils';
import { scrollToTop } from '../utils/scrollToTop';

export default function Games() {
  const { sortBy = 'Name', sortOrder = 'A-Z', categories, platforms, play_type, page = 1 } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);



  // แปลงค่าพารามิเตอร์จาก URL
  const categoryList = categories ? categories.split(',') : [];
  const platformList = platforms ? platforms.split(',') : [];

  // ดึงข้อมูลเกมจาก Hook
  const { Gamesdata, Gamesmeta, isFetching } = useAllGames(
    actualSortBy(sortBy),
    actualSortOrder(sortOrder),
    page,
    categoryList.length > 0 ? categoryList : undefined, // ส่ง categories เฉพาะเมื่อมีค่า
    platformList.length > 0 ? platformList : undefined, // ส่ง platforms เฉพาะเมื่อมีค่า
    play_type
  );

  const totalGames = Gamesmeta?.total_games || 0;
  const formattedGames = totalGames.toLocaleString();

  console.log('====================================');
  console.log(Gamesmeta);
  console.log('====================================');

  if (isFetching) {
    return <div>Loading...</div>
  }

  // ฟังก์ชันจัดการการเปลี่ยน Sort
  const handleSort = (field, orderType) => {
    const newUrl = buildUrl({
      sortBy: field,
      sortOrder: orderType,
      categories: categoryList || [],
      platforms: platformList || [],
      playType: play_type || null,
      page: 1,
    });

    navigate(newUrl);
  };

  // ฟังก์ชันจัดการการเปลี่ยนหน้า
  const handlePageChange = (newPage) => {
    const newUrl = buildUrl({
      sortBy,
      sortOrder,
      categories: categoryList,
      platforms: platformList,
      playType: play_type,
      page: newPage,
    });
    navigate(newUrl);
  };

  // ฟังก์ชันจัดการการเปลี่ยน Filter
  const handleFilterChange = (newFilters) => {
    const newUrl = buildUrl({
      sortBy,
      sortOrder,
      categories: newFilters.categories || [],
      platforms: newFilters.platforms || [],
      playType: newFilters.playType || '',
      page: 1,
    });
    navigate(newUrl);
  };

  return (
    <div className='flex flex-col mx-10 mt-5 gap-2'>

      <h1 className='text-4xl font-medium'>เกมทั้งหมด ({formattedGames} เกม)</h1>

      <Sortbar sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSort} />

      <Filter
        onFilterChange={handleFilterChange}
        currentFilters={{ categories: categoryList, platforms: platformList, playType: play_type }}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <div className='grid grid-cols-2 gap-5 mt-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
          {Gamesdata?.length > 0 ? (
            Gamesdata.map((data, index) => (
              <div key={index}>
                <CardGame data={data} />
              </div>
            ))
          ) : (
            <div className="col-span-7 text-center text-gray-500">ไม่มีข้อมูลที่ตรงกับเงื่อนไข</div>
          )}
        </div>
      </Suspense>

      <div className='flex justify-end items-center text-center'>
        {totalGames > Gamesmeta.perpage && (
          <Pagination
            totalPages={Gamesmeta?.last_page || 1}
            currentPage={Gamesmeta?.current_page || 1}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
