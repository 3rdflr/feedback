import { useEffect, useState } from "react";

import { getProducts } from "../api/ProductApi";
import ProductItem from "./ProductItem";

import styles from "./ProductList.module.css";

/**
 * 상품 목록 컴포넌트
 *
 * 변경 이력:
 * 1. 상태 관리 개선
 *    - items 상태 초기값을 빈 배열로 명시
 *      이유: 컴포넌트 마운트 시 undefined 상태 방지
 *    - handleProduct 함수의 매개변수 정리
 *      이유: 불필요한 매개변수 전달 제거
 *
 * 2. 에러 처리 개선
 *    - 에러 발생 시 빈 배열로 초기화
 *      이유: 에러 발생 시에도 UI가 깨지지 않도록 처리
 *
 * 3. ProductItem props 전달 개선
 *    - isBestProduct 대신 type prop 사용
 *      이유:
 *      1. ProductItem 컴포넌트의 변경사항 반영
 *      2. 도메인 지식 제거
 *
 * @param {Object} props
 * @param {string} props.orderBy - 정렬 기준
 * @param {number} props.pageSize - 페이지당 상품 수
 * @param {string} props.keyword - 검색어
 * @param {number} props.page - 현재 페이지
 * @param {string} props.type - 상품 타입 ('large' | 'small')
 */
function ProductList({ orderBy, pageSize, keyword, page, type = "small" }) {
  const [items, setItems] = useState([]);

  const handleProduct = async () => {
    try {
      const { list } = await getProducts({ orderBy, pageSize, keyword, page });
      setItems(list);
    } catch (error) {
      console.error("상품 목록을 가져오는 중 오류 발생:", error);
      setItems([]);
    }
  };

  useEffect(() => {
    handleProduct();
  }, [orderBy, pageSize, keyword, page]);

  return (
    <ul className={styles.cards}>
      {items.map((item) => (
        <li key={item.id} className={styles.card}>
          <ProductItem item={item} type={type} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
