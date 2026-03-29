/* eslint-disable react/prop-types */
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Pagination = ({
  currentPage,
  totalPage,
  pagesInCurrentGroup,
  handlePageChangeButtonClick,
  handleNextButtonClick,
  handlePreviousButtonClick,
  handleNextPageGroupButtonClick,
  handlePreviousPageGroupButtonClick,
}) => {
  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12 pb-10 overflow-x-auto px-4">
      <button
        onClick={handlePreviousPageGroupButtonClick}
        disabled={currentPage <= 5}
        className={`size-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
          currentPage <= 5
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-PrimaryColor-0 text-PrimaryColor-0 hover:bg-PrimaryColor-0 hover:text-white'
        }`}
        title="Trang nhóm trước"
      >
        <FaAngleDoubleLeft size={14} />
      </button>

      <button
        onClick={handlePreviousButtonClick}
        disabled={currentPage === 1}
        className={`size-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
          currentPage === 1
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-PrimaryColor-0 text-PrimaryColor-0 hover:bg-PrimaryColor-0 hover:text-white'
        }`}
      >
        <FaChevronLeft size={14} />
      </button>

      {pagesInCurrentGroup.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChangeButtonClick(page)}
          className={`size-10 rounded-full flex items-center justify-center font-AlbertSans font-semibold transition-all duration-300 border ${
            currentPage === page
              ? 'bg-PrimaryColor-0 border-PrimaryColor-0 text-white'
              : 'border-PrimaryColor-0 text-PrimaryColor-0 hover:bg-PrimaryColor-0 hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextButtonClick}
        disabled={currentPage === totalPage}
        className={`size-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
          currentPage === totalPage
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-PrimaryColor-0 text-PrimaryColor-0 hover:bg-PrimaryColor-0 hover:text-white'
        }`}
      >
        <FaChevronRight size={14} />
      </button>

      <button
        onClick={handleNextPageGroupButtonClick}
        disabled={pagesInCurrentGroup[pagesInCurrentGroup.length - 1] === totalPage}
        className={`size-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
          pagesInCurrentGroup[pagesInCurrentGroup.length - 1] === totalPage
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-PrimaryColor-0 text-PrimaryColor-0 hover:bg-PrimaryColor-0 hover:text-white'
        }`}
        title="Trang nhóm sau"
      >
        <FaAngleDoubleRight size={14} />
      </button>
    </div>
  );
};

export default Pagination;
