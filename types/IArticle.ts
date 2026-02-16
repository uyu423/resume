import { CommonPayload } from './ICommon';
import { RowDescription } from './IRow';

/**
 * ### Sample Rendering
 *
 * ![image](https://user-images.githubusercontent.com/8033320/80271217-268d6200-86f9-11ea-822b-438508d2cf09.png)
 *
 * @example https://github.com/uyu423/resume-nextjs/blob/master/payload/article.ts
 *
 */
export interface ArticlePayload extends CommonPayload {
  /** 아티클 리스트 */
  list: RowDescription[];
}
