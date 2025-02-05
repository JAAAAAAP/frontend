import { renderPagination } from "../../utils/paginationUtils"

const Pagination = ({ totalPages, currentPage, onPageChange }) => {

    return (
        <div className="flex justify-center mt-5 text-xl">
            <nav className="flex space-x-2">
                {/* ปุ่มไปหน้าแรก */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(1)}
                    className={`px-3 py-1 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-yellow-500'}`}
                >
                    {'<<'}
                </button>

                {/* ปุ่มก่อนหน้า */}
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`px-3 py-1 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-yellow-500'}`}
                >
                    {'<'}
                </button>

                {/* เลขหน้า */}
                {renderPagination(totalPages, currentPage, onPageChange)}

                {/* ปุ่มถัดไป */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`px-3 py-1 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-yellow-500'}`}
                >
                    {'>'}
                </button>

                {/* ปุ่มไปหน้าสุดท้าย */}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`px-3 py-1 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-yellow-500'}`}
                >
                    {'>>'}
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
