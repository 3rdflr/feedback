/**
 * DropDown 컴포넌트 리팩토링
 *
 * 변경 이력:
 * 1. 불필요한 중복 주석 제거
 *    - 컴포넌트명, props JSDoc 등 중복 주석 정리
 *    - 이유: 코드 가독성 및 유지보수성 향상
 * 2. 핸들러 함수 분리
 *    - 드롭다운 토글 함수와 값 변경 함수 분리
 *    - 이유: 역할 명확화 및 추후 확장성 고려
 * 3. JSX 구조 정리
 *    - 조건부 렌더링 및 구조를 명확하게 정리
 *    - 이유: 가독성 및 유지보수성 향상
 * 4. DEFAULT_VALUE 상수화 유지
 *    - 이유: 초기값 하드코딩 방지
 */

import { FaSortAmountDown } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa6";
import DropDownItems from "./DropDownItems";
import { useScreenSize } from "../utils/useScreenSize";
import { useState } from "react";

const DEFAULT_VALUE = "최신순";

/**
 * 드롭다운 컴포넌트
 *
 * @param {Object} props
 * @param {function} props.onChangeOrder - 정렬 순서 변경 시 호출되는 콜백 함수
 */
function DropDown({ onChangeOrder }) {
  const [currentValue, setCurrentValue] = useState(DEFAULT_VALUE);
  const [isOpen, setIsOpen] = useState(false);
  const screenSize = useScreenSize();

  // 드롭다운 열기/닫기 토글
  const handleToggle = () => setIsOpen((prev) => !prev);

  // 값 변경 핸들러
  const handleChangeValue = (value, label) => {
    setCurrentValue(label);
    onChangeOrder(value);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {screenSize === "sm" ? (
          <FaSortAmountDown />
        ) : (
          <>
            {currentValue} <FaSortDown />
          </>
        )}
      </button>
      {isOpen && <DropDownItems onItemClick={handleChangeValue} />}
    </div>
  );
}

export default DropDown;
