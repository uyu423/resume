import { CommonPayload } from './ICommon';

/**
 * ### Sample Rendering
 *
 * ![image](https://user-images.githubusercontent.com/8033320/78058862-e40b8a80-73c3-11ea-89fe-7d907528ca78.png)
 *
 * @example https://github.com/uyu423/resume-nextjs/blob/master/payload/etc.ts
 */
export interface EtcPayload extends CommonPayload {
  /** ### 기타 항목 리스트 */
  list: EtcItem[];
}

export interface EtcItem {
  /** ### 기타 항목 제목 */
  title: string;

  /** ### 기타 항목 서브 타이틀 */
  subTitle: string;

  /**
   *  ### 기타 항목 시작 시점
   *
   * @format YYYY-MM
   * @example '2014-09'
   */
  startedAt: string;

  /**
   *  ### 기타 항목 종료 시점
   *
   * @format YYYY-MM
   * @example '2015-03'
   */
  endedAt?: string;
}
