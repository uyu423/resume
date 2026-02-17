export interface GlobalOpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface GlobalOpenGraphProfile {
  firstName?: string;
  lastName?: string;
  username?: string;
  gender?: string;
}

export interface GlobalOpenGraph {
  title?: string;
  description?: string;
  images?: GlobalOpenGraphImage[];
  type?: string;
  profile?: GlobalOpenGraphProfile;
}

export interface GlobalSeo {
  title?: string;
  description?: string;
  openGraph?: GlobalOpenGraph;
}

export interface GlobalJsonLd {
  /** 성명 */
  name: string;
  /** 직함 */
  jobTitle: string;
  /** 현재 소속 */
  worksFor: string;
  /** 이력서 URL */
  url: string;
  /** 소셜 프로필 URL 목록 (GitHub, LinkedIn 등) */
  sameAs?: string[];
  /** 핵심 기술 키워드 */
  knowsAbout?: string[];
}

/**
 * 섹션 키 타입 (Profile, Footer 제외)
 *
 * @description sectionOrder에서 사용되는 섹션 식별자.
 * Profile은 항상 첫 번째, Footer는 항상 마지막이므로 제외.
 */
export type SectionKey =
  | 'highlight'
  | 'experience'
  | 'project'
  | 'skill'
  | 'openSource'
  | 'presentation'
  | 'article'
  | 'education'
  | 'testimonial'
  | 'introduce'
  | 'etc';

export interface GlobalPayload {
  /** Resume 제목 - `<head>` 태그 내 `<title>` 을 정의한다. */
  headTitle: string;

  /** favicon 이미지 */
  favicon: string;

  /** OpenGraph 메타 태그를 포함한 SEO 요소 */
  seo: GlobalSeo;

  /** JSON-LD 구조화 데이터 (optional) */
  jsonLd?: GlobalJsonLd;

  /**
   * 섹션 렌더링 순서
   *
   * @description 배열 순서대로 섹션을 렌더링한다.
   * 미지정 섹션은 기본 순서로 뒤에 추가된다.
   * `undefined`이면 기본 순서를 사용한다.
   * Profile은 항상 첫 번째, Footer는 항상 마지막.
   */
  sectionOrder?: SectionKey[];
}
