/**
 * App 컴포넌트 리팩토링
 *
 * 변경 이력:
 * 1. 상수 분리
 *    - PAGE_SIZES 객체로 화면 크기별 페이지 크기 관리
 *    - 이유: 하드코딩된 값 제거 및 관리 용이성 향상
 *
 * 2. 상태 관리 개선
 *    - bestProductCount로 변수명 변경
 *    - allProductCount로 변수명 변경
 *    - 이유: 변수명의 의미 명확화
 *
 * 3. useEffect 로직 개선
 *    - getTotalProducts 의존성 배열 수정
 *    - 이유: 정렬/검색어 변경 시 전체 상품 수 업데이트
 *
 * 4. 엣지 케이스 처리 추가
 *    - 페이지 계산 로직 보완
 *    - 검색어 유효성 검사
 *    - API 응답 검증
 *    - 이유: 예외 상황 처리로 안정성 향상
 *
 * 5. 성능 및 사용자 경험 개선
 *    - 검색어 디바운스 처리
 *    - 페이지 변경 시 스크롤 위치 조정
 *    - 화면 크기 변경 시 불필요한 상태 업데이트 방지
 *    - 이유: 사용자 경험 및 성능 향상
 */

import Nav from "./components/Nav";
import styles from "./App.module.css";
import Header from "./components/Header";
import DropDown from "./components/DropDown";
import ProductList from "./components/ProductList";
import Button from "./components/Button";
import SearchItem from "./components/SearchItem";
import Pagination from "./components/Pagination";
import Link from "./components/Link";

import { getProducts } from "./api/ProductApi";
import { useScreenSize } from "./utils/useScreenSize";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

const PAGE_SIZES = {
  lg: { best: 4, all: 10 },
  md: { best: 2, all: 6 },
  sm: { best: 1, all: 4 },
};

const MAX_SEARCH_LENGTH = 100;
const DEBOUNCE_DELAY = 300;

function App() {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("recent");
  const [currPage, setCurrPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [bestProductCount, setBestProductCount] = useState(0);
  const [allProductCount, setAllProductCount] = useState(0);

  const screenSize = useScreenSize();

  // 화면 크기에 따른 초기 페이지 크기 설정
  useEffect(() => {
    const { best, all } = PAGE_SIZES[screenSize];
    setBestProductCount(best);
    setAllProductCount(all);
  }, [screenSize]);

  // 화면 크기 변경 및 전체 상품 수 업데이트
  useEffect(() => {
    const updateProducts = async () => {
      try {
        const { totalCount } = await getProducts({
          orderBy: order,
          keyword: search,
        });

        setTotalProducts(totalCount);

        // 화면 크기 변경 시 페이지 크기 조정
        const { all } = PAGE_SIZES[screenSize];
        if (all !== allProductCount) {
          const firstItemOfCurrentPage = Math.max(
            0,
            (currPage - 1) * allProductCount
          );
          const newPage = Math.max(
            1,
            Math.floor(firstItemOfCurrentPage / all) + 1
          );
          const totalPages = Math.ceil(totalCount / all);
          const validPage = Math.min(newPage, totalPages || 1);

          setCurrPage(validPage);
          setAllProductCount(all);
        } else if (currPage > Math.ceil(totalCount / allProductCount)) {
          // 현재 페이지가 유효하지 않은 경우 1페이지로 이동
          setCurrPage(1);
        }
      } catch (error) {
        console.error("상품 정보를 불러오는 중 오류:", error);
        setTotalProducts(0);
      }
    };

    updateProducts();
  }, [screenSize, order, search, currPage, allProductCount]);

  // 검색어 디바운스 처리
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, DEBOUNCE_DELAY),
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_SEARCH_LENGTH) {
      debouncedSearch(value);
    }
  };

  const handleOrder = (selectedOrder) => {
    setOrder(selectedOrder);
    setCurrPage(1); // 정렬 변경 시 첫 페이지로 이동
  };

  const handlePage = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalProducts / allProductCount)) {
      setCurrPage(newPage);
      // 페이지 변경 시 스크롤 위치 조정
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Nav />
      <div className={styles.content}>
        <Header headingLevel={2}>베스트 상품</Header>
        <ProductList
          orderBy="favorite"
          pageSize={bestProductCount}
          type="large"
        />
        <div>
          <Header headingLevel={2}>전체 상품</Header>
          <SearchItem value={search} onChange={handleSearch} />
          <Link href="#">상품등록하기</Link>
          <DropDown onChangeOrder={handleOrder} />
        </div>
        <ProductList
          orderBy={order}
          pageSize={allProductCount}
          keyword={search}
          page={currPage}
          type="small"
        />
        {totalProducts > 0 && (
          <Pagination
            currentPage={currPage}
            totalItems={totalProducts}
            itemsPerPage={allProductCount}
            onPageChange={handlePage}
          />
        )}
      </div>
    </>
  );
}

export default App;
