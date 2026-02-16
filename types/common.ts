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
