import { ListSectionPayload } from './common';

/**
 * Highlight 섹션 - 핵심 성과를 카드 형태로 표시
 * Profile 바로 아래, 첫 번째 콘텐츠 섹션으로 배치
 */
export interface HighlightPayload extends ListSectionPayload {
  /** 핵심 성과 목록 (3~5개 권장) */
  list: HighlightItem[];
}

export interface HighlightItem {
  /** 성과 제목 (예: "대규모 트래픽 처리 시스템 설계") */
  title: string;
  /** 성과 설명 (1~2문장) */
  description: string;
  /** 관련 키워드 뱃지 (optional) */
  keywords?: string[];
}
