"use client";

import React, { useState, useEffect } from "react";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [displayPages, setDisplayPages] = useState<number[]>([]);

  useEffect(() => {
    generateDisplayPages();
  }, [totalItems, totalPages, currentPage, itemsPerPage]);

  const generateDisplayPages = () => {
    const newDisplayPages: number[] = [];
    const maxDisplayPages = 7;

    if (totalPages <= maxDisplayPages) {
      for (let i = 1; i <= totalPages; i++) {
        newDisplayPages.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxDisplayPages / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);

      for (let i = startPage; i < endPage; i++) {
        newDisplayPages.push(i);
      }
    }

    setDisplayPages(newDisplayPages);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    return displayPages.map((pageNumber) => (
      <button
        key={pageNumber}
        className={
          pageNumber === currentPage
            ? styles.wrapper__li__active
            : styles.wrapper__li
        }
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    ));
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.wrapper__li}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className={styles.wrapper__li}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
