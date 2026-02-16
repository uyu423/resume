import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonPayload } from './ICommon';

/**
 * ### Sample Rendering
 *
 * ![image](https://user-images.githubusercontent.com/8033320/78017522-5c078f80-7387-11ea-9c04-8087da5787f1.png)
 *
 * @example https://github.com/uyu423/resume-nextjs/blob/master/payload/profile.ts
 */
export interface ProfilePayload extends CommonPayload {
  /**
   * ### 프로필 이미지
   */
  image: string;
  /** ### 이름 Object */
  name: {
    /** ### 이름 */
    title: string;
    /** ### 이름 옆 괄호로 작게 표시해주는 이름 */
    small?: string;
  };
  /** ### 연락 수단 목록 */
  contact: ProfileContact[];
  /** ### 공지 */
  notice: {
    /** ### 공지 내용 */
    title: string;
    /**
     * ### 공지 앞에 붙는 아이콘
     *
     * @type font-awesome type
     * @see https://www.npmjs.com/package/@fortawesome/react-fontawesome
     */
    icon?: IconDefinition;
  };
  /** ### 한 줄 브랜드 스테이트먼트 */
  tagline?: string;
  /** ### 핵심 수치 카드 목록 (3~5개 권장) */
  headings?: ProfileHeading[];
  /** ### CTA 버튼 목록 (최대 2개 권장) */
  ctas?: ProfileCTA[];
}

/**
 * ![image](https://user-images.githubusercontent.com/8033320/78029163-19e84900-739b-11ea-9b5c-17e06f83738a.png)
 */
export interface ProfileContact {
  /**
   * ### 연락처 앞에 붙는 아이콘
   *
   * @type font-awesome type
   * @see https://www.npmjs.com/package/@fortawesome/react-fontawesome
   */
  icon: IconDefinition;
  /** ### 연락 수단 Title */
  title?: string;
  /**
   * ### 하이퍼 링크
   *
   * @description 해당 필드가 not null 이면 title 전체가 `<a href>` 태그로 감싸진다.
   */
  link?: string;
  /**
   * ### 내용을 뱃지로 표시할 것인가?
   *
   * @description Bootstrap 4 의 Badge 로 표시하고 싶을 경우 true
   */
  badge?: true;
}

export interface ProfileHeading {
  /** ### 수치 (예: "10+", "50K") */
  value: string;
  /** ### 설명 (예: "경력 연차") */
  label: string;
}

export interface ProfileCTA {
  /** ### 버튼 텍스트 */
  label: string;
  /** ### 클릭 시 이동할 URL (mailto:, 파일 다운로드 등) */
  link: string;
  /** ### 버튼 아이콘 (optional) */
  icon?: IconDefinition;
  /** ### primary 또는 secondary 스타일 */
  variant?: 'primary' | 'secondary';
}
