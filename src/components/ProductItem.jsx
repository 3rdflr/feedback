import { CiHeart } from "react-icons/ci";
import { useState, useEffect } from "react";
import noImg from "../assets/img/noimg.jpg";
import styles from "./ProductItem.module.css";

/**
 * 상품 아이템 컴포넌트
 *
 * 변경 이력:
 * 1. 이미지 처리 개선
 *    - images 배열의 첫 번째 이미지를 사용하도록 변경
 *      이유: API에서 받아오는 이미지 배열의 첫 번째 이미지를 기본으로 표시
 *    - 이미지가 없을 경우 noImg를 fallback으로 사용
 *      이유: 이미지가 없는 경우에도 UI가 깨지지 않도록 처리
 *    - 이미지 로드 에러 처리 추가
 *      이유: 이미지 URL이 유효하지 않은 경우에도 UI가 깨지지 않도록 처리
 *    - item 변경 시 이미지 업데이트 처리 추가
 *      이유: item이 변경되어도 이미지가 업데이트되지 않는 문제 해결
 *
 * 2. 스타일링 방식 개선
 *    - isBestProduct 대신 type prop 사용
 *      이유:
 *      1. 도메인 지식(best)을 UI 관점(large/small)으로 분리
 *      2. 컴포넌트의 재사용성 향상
 *      3. 스타일링 목적을 더 명확하게 표현
 *
 * @param {Object} props
 * @param {Object} props.item - 상품 정보
 * @param {string[]} props.item.images - 상품 이미지 URL 배열
 * @param {string} props.item.name - 상품명
 * @param {number} props.item.price - 상품 가격
 * @param {number} props.item.favoriteCount - 좋아요 수
 * @param {string} props.type - 상품 타입 ('large' | 'small')
 */
function ProductItem({ item, type = "small" }) {
  const { images, name, price, favoriteCount } = item;
  const [imgSrc, setImgSrc] = useState(images?.[0] || noImg);

  useEffect(() => {
    setImgSrc(images?.[0] || noImg);
  }, [images]);

  const handleImageError = () => {
    setImgSrc(noImg);
  };

  return (
    <a href="#" className={styles.card}>
      <img
        className={styles[type]}
        src={imgSrc}
        alt={name}
        onError={handleImageError}
      />
      <p>{name}</p>
      <h3>{price}</h3>
      <span>
        <button>
          <CiHeart />
        </button>
        {favoriteCount}
      </span>
    </a>
  );
}

export default ProductItem;
