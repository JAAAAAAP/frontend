import React from 'react'
import { getCategoriesStat } from '../../hook/useCategory'
import CategoriesTable from '../../component/_DashBoard/DataTable/CategoriesTable';

function CategoriesManagement() {

  const { data, error } = getCategoriesStat()

  return (
    <div className='mt-6 mx-10'>
      <h1 className='text-3xl font-medium'>ภาพรวม</h1>
      <div className='flex justify-center'>

        <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 px-10 h-auto xl:flex-row xl:h-28'>

          <box-icon name='category' size="lg" style={{ height: '70px', width: '70px' }} />

          <div className='flex flex-col justify-start'>
            <h1 className=''>หมวดหมู่ทั้งหมด</h1>
            <span className='text-2xl font-medium text-center'>{data?.data?.totalCategories}</span>
          </div>

        </div>


      </div>

      <div className='grid grid-cols-1 mt-5'>
        <CategoriesTable
          data={data?.data?.Categoriesdata}
          title={"รายงานหมวดหมู่"}
        />
      </div>
    </div>
  )
}

export default CategoriesManagement
