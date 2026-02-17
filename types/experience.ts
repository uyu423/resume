import { ListSectionPayload } from './common';
import { RowDescription } from './row';

/**
 * ### Sample Rendering
 *
 * ![image](https://user-images.githubusercontent.com/8033320/78032558-27540200-73a0-11ea-83cd-3fd1cea68402.png)
 *
 * @example https://github.com/uyu423/resume-nextjs/blob/master/payload/experience.ts
 */
export interface ExperiencePayload extends ListSectionPayload {
  /** ### Experience 데이터 목록 */
  list: ExperienceItem[];
  /** ### 총 경력 기간 표시 유/무 */
  disableTotalPeriod?: boolean;
}

export interface ExperienceItem {
  /** ### (직장)경험 명 */
  title: string;

  /** ### (직장)수행한 직위/직책 포지션 정보 */
  positions: ExperiencePosition[];
}

export interface ExperiencePosition {
  /** ### (직장)역할 명 (or Subtitle) */
  title: string;

  /**
   * ### (직장)경험 시작 일
   *
   * @format YYYY-MM
   * @example "2018-02"
   */
  startedAt: string;

  /**
   * ### (직장)경험 종료 일
   *
   * @format YYYY-MM
   * @example "2021-02"
   * @description 해당 값이 undefined 일 경우 **"재직 중"** 뱃지가 추가로 나타난다.
   */
  endedAt?: string;

  /**
   * ### (직장)경험 설명
   *
   * @description 하나의 요소가 `<ul>` 태그 안의 `<li>` 가 된다.
   */
  descriptions: RowDescription[];

  /**
   * ### (직장)경험의 키워드
   *
   * @description undefined 가 아닐 경우 해당 경험 하단에 **Skill Keywords** 목록이 추가된다.
   */
  skillKeywords?: string[];
}
