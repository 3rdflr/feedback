/**
 * DropDownItems 컴포넌트 리팩토링
 *
 * 변경 이력:
 * 1. 정렬 옵션 상수화
 *    - SORT_OPTIONS 배열로 정렬 옵션 관리
 *    - 이유: 정렬 옵션 추가/수정 용이
 *
 * 2. 불필요한 handleItemClick 함수 제거
 *    - onItemClick 직접 호출로 변경
 *    - 이유: 불필요한 함수 래핑 제거
 *
 * 3. value 속성 제거
 *    - li 태그의 value 속성 제거
 *    - 이유: li 태그는 value 속성을 지원하지 않음
 */

import styles from "./DropDownItems.module.css";

const SORT_OPTIONS = [
  { value: "recent", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

/**
 * 드롭다운 아이템 컴포넌트
 *
 * @param {Object} props
 * @param {function} props.onItemClick - 아이템 클릭 시 호출되는 콜백 함수
 */
function DropDownItems({ onItemClick }) {
  return (
    <ul className={styles.dropdownList}>
      {SORT_OPTIONS.map(({ value, label }) => (
        <li
          key={value}
          className={styles.dropdownItem}
          onClick={() => onItemClick(value, label)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export default DropDownItems;
