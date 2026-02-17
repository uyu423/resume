/**
 * 각 Section Payload 의 공통 요소
 */
export interface CommonPayload {
  /**
   * Section Enable Flag
   *
   * @description 해당 옵션이 `true` 라면 렌더링 하지 않는다. `undefined` 거나 `false` 라면 렌더링한다.
   */
  disable?: boolean;

  /**
   * Print Exclude Flag
   *
   * @description `true`이면 프린트/PDF 출력 시 해당 섹션을 숨긴다.
   */
  printExclude?: boolean;
}

/**
 * 리스트형 섹션의 공통 요소
 *
 * @description CommonPayload를 상속하며, 리스트 항목의 "더보기" 기능을 지원한다.
 */
export interface ListSectionPayload extends CommonPayload {
  /**
   * Show More Count
   *
   * @description 리스트형 섹션에서 초기 노출 항목 수.
   * `0`, `null`, `undefined`이면 모든 항목을 표시한다.
   * `n`이면 n개까지만 노출하고 "더보기" 버튼을 표시한다.
   */
  showMoreCount?: number;
}
