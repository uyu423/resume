import { HighlightPayload } from '../types/highlight';

const highlight: HighlightPayload = {
  disable: false,
  list: [
    {
      title: 'Startup to Enterprise',
      description:
        '5인 스타트업부터 대기업까지 규모가 다른 다섯 조직에서 백엔드를 중심으로 프론트엔드와 인프라까지 맡아 온 커리어',
      keywords: ['Adaptability', 'Growth', 'Leadership', 'Mentoring'],
    },
    {
      title: 'Failure-First Design',
      description:
        '외부 의존이 많은 시스템에서 부분 실패·폴백·하위 호환 규칙부터 정하는 설계',
      keywords: ['Resilience', 'API Design', 'System Design'],
    },
    {
      title: 'Engineering Productivity',
      description:
        '팀마다 반복하던 부하 테스트와 코드 리뷰를 여러 조직이 함께 쓰는 도구로 만든 경험',
      keywords: ['Load Testing', 'AI Code Review', 'Developer Tooling'],
    },
  ],
};

export default highlight;
