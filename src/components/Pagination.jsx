import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./Pagination.module.css";

const PAGES_PER_VIEW = 5;

/**
 * 페이지네이션 컴포넌트
 *
 * 변경 이력:
 * 1. 상수 분리
 *    - PAGES_PER_VIEW를 컴포넌트 외부 상수로 분리
 *    - 이유: 매 렌더링마다 재생성되는 것을 방지하고, 값의 의미를 명확히 표현
 *
 * 2. 페이지 이동 로직 개선
 *    - 페이지 이동 함수들을 단순화
 *    - 이유: 불필요한 조건문을 제거하여 코드의 가독성과 유지보수성 향상
 *    - 예: goToPreviousPage에서 if (currPage > 1) 조건 제거
 *
 * 3. getVisiblePageNumbers 함수 개선
 *    - Array.from을 사용하여 더 간단하고 선언적으로 변경
 *    - 이유:
 *      1. for 루프와 push 대신 선언적 방식으로 변경하여 코드의 의도를 명확히 표현
 *      2. 배열 크기를 미리 계산하여 한 번에 생성하므로 성능 개선
 *      3. 불필요한 변수(pages) 제거로 메모리 사용 최적화
 *
 *
 * @param {Object} props
 * @param {number} props.currentPage - 현재 페이지 번호
 * @param {number} props.totalItems - 전체 아이템 수
 * @param {number} props.itemsPerPage - 페이지당 아이템 수
 * @param {function} props.onPageChange - 페이지 변경 핸들러
 */
function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }) {
  const [firstPageInView, setFirstPageInView] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const newFirstPage =
      Math.floor((currentPage - 1) / PAGES_PER_VIEW) * PAGES_PER_VIEW + 1;
    setFirstPageInView(newFirstPage);
  }, [currentPage]);

  const getVisiblePageNumbers = () => {
    const lastPageInView = Math.min(
      firstPageInView + PAGES_PER_VIEW - 1,
      totalPages
    );
    return Array.from(
      { length: lastPageInView - firstPageInView + 1 },
      (_, index) => firstPageInView + index
    );
  };

  const handlePrevPage = () => onPageChange(currentPage - 1);
  const handleNextPage = () => onPageChange(currentPage + 1);

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        <IoIosArrowBack />
      </button>

      <div className={styles.pageNumbers}>
        {getVisiblePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`${styles.pageButton} ${
              currentPage === pageNumber ? styles.active : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default Pagination;
