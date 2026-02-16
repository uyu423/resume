import { RowDescription } from './IRow';
import { CommonPayload } from './ICommon';

/**
 * ### Sample Rendering
 *
 * ![image](https://user-images.githubusercontent.com/8033320/80116477-fd69b600-85c0-11ea-9fe5-5e5e664605f2.png)
 *
 * @example https://github.com/uyu423/resume-nextjs/blob/master/payload/presentation.ts
 */
export interface PresentationPayload extends CommonPayload {
  /** ### 발표 목록 */
  list: PresentationItem[];
}

export interface PresentationItem {
  /** ### 발표명 */
  title: string;

  /** ### 발표 서브 타이틀 */
  subTitle: string;

  /**
   * ### 발표 시점
   *
   * @format YYYY-MM
   * @example '2010-03'
   */
  at: string;

  /** ### 발표 설명 */
  descriptions: RowDescription[];
}
