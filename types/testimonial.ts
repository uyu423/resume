import { CommonPayload } from './common';

/**
 * Testimonial 섹션 - 동료/상사의 추천사를 표시
 */
export interface TestimonialPayload extends CommonPayload {
  /** 추천사 목록 */
  list: TestimonialItem[];
}

export interface TestimonialItem {
  /** 추천인 이름 */
  name: string;
  /** 추천인 직함/소속 (예: "OO회사 CTO") */
  title: string;
  /** 추천인과의 관계 (예: "전 직장 상사", "프로젝트 동료") */
  relation: string;
  /** 추천 인용문 */
  quote: string;
  /** 추천인 프로필 이미지 URL (optional) */
  image?: string;
}
