import { useState, useMemo } from 'react';

const usePagination = ({ totalItems, limit, pagesPerGroup = 5, initialPage = 1 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPage = useMemo(() => {
    return Math.ceil(totalItems / limit) || 1;
  }, [totalItems, limit]);

  if (currentPage > totalPage && totalPage > 0) {
    setCurrentPage(totalPage);
  }

  const pagesInCurrentGroup = useMemo(() => {
    const startPage = Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPage);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPage, pagesPerGroup]);

  const handlePageChangeButtonClick = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const handleNextButtonClick = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousButtonClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPageGroupButtonClick = () => {
    const startOfNextGroup = Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup + pagesPerGroup + 1;
    if (startOfNextGroup <= totalPage) {
      setCurrentPage(startOfNextGroup);
    } else {
      setCurrentPage(totalPage);
    }
  };

  const handlePreviousPageGroupButtonClick = () => {
    const startOfPrevGroup = Math.floor((currentPage - 1) / pagesPerGroup) * pagesPerGroup - pagesPerGroup + 1;
    if (startOfPrevGroup >= 1) {
      setCurrentPage(startOfPrevGroup);
    } else {
      setCurrentPage(1);
    }
  };

  return {
    currentPage,
    totalPage,
    pagesInCurrentGroup,
    handlePageChangeButtonClick,
    handleNextButtonClick,
    handlePreviousButtonClick,
    handleNextPageGroupButtonClick,
    handlePreviousPageGroupButtonClick,
  };
};

export default usePagination;
