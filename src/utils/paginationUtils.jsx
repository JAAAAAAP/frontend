const generatePagination = (totalPages, currentPage) => {
    const pages = [];

    if (currentPage <= 4) {
        // กรณีอยู่ในหน้า 1-5
        for (let i = 1; i <= 5; i++) {
            pages.push(i);
        }
        if (totalPages > 6) {
            pages.push('...'); // จุดไข่ปลาหลังเลข 3
            pages.push(totalPages); // หน้าสุดท้าย
        }
    } else {
        // กรณีอยู่ในหน้า 4 เป็นต้นไป
        pages.push(1); // หน้าแรก
        pages.push('...'); // จุดไข่ปลาหน้าต้น

        // เพิ่มหน้ารอบ currentPage (2 ก่อนหน้า และ 2 หลัง)
        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push('...'); // จุดไข่ปลาสุดท้าย
        }

        pages.push(totalPages); // หน้าสุดท้าย
    }

    return pages;
};

export const renderPagination = (totalPages, currentPage, onPageChange) => {
    const pages = generatePagination(totalPages, currentPage)
    return pages.map((page, index) => {
        if (page === '...') {
            return (
                <span key={index} className="px-3 py-1 text-gray-500">
                    ...
                </span>
            );
        }

        return (
            <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 ${currentPage === page ? 'font-bold text-yellow-500' : 'text-gray-500'
                    }`}
            >
                {page}
            </button>
        );
    });
}