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

export interface GlobalPayload {
  /** Resume 제목 - `<head>` 태그 내 `<title>` 을 정의한다. */
  headTitle: string;

  /** favicon 이미지 */
  favicon: string;

  /** OpenGraph 메타 태그를 포함한 SEO 요소 */
  seo: GlobalSeo;
}
