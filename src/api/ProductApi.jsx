/**
 * 상품 API 관련 상수 및 함수
 *
 * 변경 이력:
 * 1. 상수 분리
 *    - BASE_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE, DEFAULT_ORDER 상수 분리
 *      이유:
 *      1. 하드코딩된 값 제거로 유지보수성 향상
 *      2. 환경에 따른 API URL 변경 용이
 *      3. 기본값 변경 시 한 곳에서 관리 가능
 *
 * 2. 에러 메시지 개선
 *    - ERROR_MESSAGES 객체로 에러 메시지 통합 관리
 *      이유:
 *      1. 일관된 에러 메시지 제공
 *      2. 다국어 지원 용이
 *      3. 에러 메시지 수정 시 한 곳에서 관리 가능
 *
 * 3. 타입 정의 추가
 *    - ProductParams 타입 정의 추가
 *      이유:
 *      1. 함수 파라미터 타입 명확화
 *      2. IDE 자동완성 지원
 *      3. 코드 가독성 향상
 *
 * 4. URL 파라미터 처리 개선
 *    - URLSearchParams 사용
 *      이유:
 *      1. URL 인코딩 자동 처리
 *      2. 특수문자 처리 안전성 향상
 *      3. 파라미터 추가/수정 용이
 *
 * 5. 응답 데이터 검증 추가
 *    - body 유효성 검사 추가
 *      이유:
 *      1. 잘못된 응답 데이터로 인한 오류 방지
 *      2. 타입 안정성 향상
 *      3. 디버깅 용이성 향상
 */

const BASE_URL = "https://panda-market-api.vercel.app";
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_ORDER = "recent";

const ERROR_MESSAGES = {
  FETCH_FAILED: (status) =>
    `데이터를 불러오는데 실패했습니다 (상태 코드: ${status})`,
  FETCH_ERROR: "상품 데이터를 가져오는 중 오류 발생",
  INVALID_RESPONSE: "유효하지 않은 응답 데이터",
};

/**
 * @typedef {Object} ProductParams
 * @property {number} [page=1] - 페이지 번호
 * @property {number} [pageSize=10] - 페이지당 상품 수
 * @property {string} [orderBy="recent"] - 정렬 기준
 * @property {string} [keyword=""] - 검색어
 */

/**
 * 상품 목록을 가져오는 API 함수
 *
 * @param {ProductParams} params - 상품 목록 조회 파라미터
 * @returns {Promise<Object>} 상품 목록 데이터
 * @throws {Error} API 호출 실패 시 에러 발생
 */
export async function getProducts({
  page = DEFAULT_PAGE,
  pageSize = DEFAULT_PAGE_SIZE,
  orderBy = DEFAULT_ORDER,
  keyword = "",
}) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy,
    keyword: encodeURIComponent(keyword),
  });

  try {
    const response = await fetch(`${BASE_URL}/products?${params.toString()}`);
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.FETCH_FAILED(response.status));
    }
    const body = await response.json();

    if (!body || typeof body !== "object") {
      throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    return body;
  } catch (error) {
    throw error;
  }
}
