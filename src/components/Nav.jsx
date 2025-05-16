import smLogo from "../assets/logo/logo.svg";
import logo from "../assets/logo/market_logo.svg";
import profile from "../assets/input/default_profile.svg";
import styles from "./Nav.module.css";

const PROFILE_URL = "#";
const HOME_URL = "/";

const navigationLinks = [
  { href: "/boards", text: "자유게시판" },
  { href: "/items", text: "중고마켓" },
];

/**
 * 네비게이션 컴포넌트
 *
 * 변경 이력:
 * 1. 네비게이션 링크를 상수로 분리
 *    - 링크 구조를 명확하게 표현
 *    - 유지보수성 향상
 *    - 링크 추가/수정이 필요할 때 배열만 수정하면 되도록 개선
 *
 * 2. 로고의 반응형 처리를 CSS로 이동
 *    - 미디어 쿼리를 사용하여 더 효율적인 반응형 처리
 *    - JavaScript 로직 제거로 성능 향상
 *    - 화면 크기 변경 시 JavaScript 이벤트 대신 CSS로 처리하여 더 부드러운 전환
 *    - 두 개의 이미지를 모두 로드하고 CSS로 전환하여 깜빡임 현상 방지
 *
 * 3. URL들을 컴포넌트 외부 상수로 분리
 *    - 매 렌더링마다 재생성되는 것을 방지
 *    - 컴포넌트 외부에서도 접근 가능하도록 개선
 *    - URL 변경 시 한 곳에서만 수정하면 되도록 개선
 */
function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <a href={HOME_URL} className={styles.logo}>
          <img src={logo} alt="판다마켓 로고" className={styles.desktopLogo} />
          <img src={smLogo} alt="판다마켓 로고" className={styles.mobileLogo} />
        </a>
        <div className={styles.text}>
          {navigationLinks.map(({ href, text }) => (
            <a key={href} href={href}>
              {text}
            </a>
          ))}
        </div>
      </div>
      <a href={PROFILE_URL} className={styles.profile}>
        <img src={profile} alt="프로필" />
      </a>
    </nav>
  );
}

export default Nav;
