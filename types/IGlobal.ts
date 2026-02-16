export declare namespace IGlobal {
  export interface OpenGraphImage {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }

  export interface OpenGraphProfile {
    firstName?: string;
    lastName?: string;
    username?: string;
    gender?: string;
  }

  export interface OpenGraph {
    title?: string;
    description?: string;
    images?: OpenGraphImage[];
    type?: string;
    profile?: OpenGraphProfile;
  }

  export interface Seo {
    title?: string;
    description?: string;
    openGraph?: OpenGraph;
  }

  export interface Payload {
    /** Resume 제목 - `<head>` 태그 내 `<title>` 을 정의한다. */
    headTitle: string;

    /** favicon 이미지 */
    favicon: string;

    /** OpenGraph 메타 태그를 포함한 SEO 요소 */
    seo: Seo;
  }
}
