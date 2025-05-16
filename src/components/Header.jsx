import styles from "./Header.module.css";

/**
 * 섹션 헤더 컴포넌트
 *
 * 각 섹션의 제목을 표시하는 컴포넌트입니다.
 * headingLevel prop을 통해 h1~h6 태그를 선택할 수 있습니다.
 *
 * 변경 이력:
 * 1. text prop을 children으로 변경
 *    - 단순 텍스트뿐만 아니라 아이콘이나 다른 요소들도 포함할 수 있도록 유연성 확보
 *    - React의 일반적인 패턴인 children prop 사용으로 일관성 유지
 * 2. headingLevel 유효성 검사 추가
 *    - 잘못된 heading 레벨이 전달되는 것을 방지
 *    - 타입 안전성 강화
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 헤더에 표시할 내용
 * @param {1|2|3|4|5|6} [props.headingLevel=2] - 사용할 heading 태그 레벨
 */
function Header({ children, headingLevel = 2 }) {
  // headingLevel 유효성 검사
  if (headingLevel < 1 || headingLevel > 6) {
    console.warn("Header: headingLevel은 1부터 6 사이의 값이어야 합니다.");
    headingLevel = 2;
  }

  // heading 태그 매핑
  const headingTags = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  };

  const Tag = headingTags[headingLevel];

  return <Tag className={styles.header}>{children}</Tag>;
}

export default Header;
