/**
 * 링크 컴포넌트
 *
 * 이전에는 Button.jsx로 되어있었으나, 실제로는 <a> 태그를 사용하는 링크 컴포넌트이므로
 * 컴포넌트의 실제 동작과 이름을 일치시키기 위해 Link로 변경했습니다.
 *
 * @param {Object} props
 * @param {string} props.href - 링크 URL
 * @param {string} props.children - 링크 텍스트
 */
function Link({ href, children }) {
  return <a href={href}>{children}</a>;
}

export default Link;
