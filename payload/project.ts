import { ProjectPayload } from '../types/project';

const WHERE = {
  YA: '야놀자 (Yanolja)',
  PL: '플레이팅 (Plating)',
  NV_LIVE: '네이버 (NAVER) 쇼핑라이브 백엔드 개발',
  NV_NSPA: '네이버 (NAVER) 쇼핑 앱 백엔드 개발',
  NV_VERTICAL: '네이버 (NAVER) 쇼핑 버티컬 서비스 백엔드 개발',
  NV_AX: '네이버 (NAVER) AI 전환(AX) 개발 생산성 향상 TF',
};

const nvAmazonVertical = {
  title: '아마존 버티컬 전시 서버 개발 (출시 예정)',
  startedAt: '2026-04',
  where: WHERE.NV_VERTICAL,
  descriptions: [
    {
      content: '네이버플러스 스토어에 아마존 상품 전용 버티컬을 여는 전시 서버 API 개발',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            '동료 백엔드 개발자와 나눠 홈 모듈, 카테고리, 상품 목록 필터·정렬, 검색 API 개발',
        },
      ],
    },
    {
      content: '모듈 장애 시 동작(미노출, 기본 인기순 폴백)을 설계 단계에서 먼저 합의',
    },
    {
      content:
        '서버 간 호출의 하위 호환을 지키면서 기존 API를 재사용해 복합 필터와 다단계 카테고리 지원',
    },
    {
      content: '운영자가 전시 도구에서 모듈을 편성하는 템플릿과 노출 조건 모델 단독 개발',
    },
    {
      content:
        'QA 중 대체 노출 모듈이 알림 없이 사라지던 결함의 원인을 찾아 수정하고 운영 알림 추가',
    },
  ],
};

const nvAiCodeReview = {
  title: '컨텍스트 기반 AI 코드 리뷰 도구 개발·운영',
  startedAt: '2026-02',
  where: WHERE.NV_AX,
  descriptions: [
    {
      content:
        '코드베이스, 요구사항 문서, 저장소 규칙을 함께 읽는 멀티 에이전트 코드 리뷰를 GitHub Actions로 개발',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content: '변경된 diff만 보는 AI 리뷰에서 자주 나오던 오탐을 줄이는 것이 목표',
        },
      ],
    },
    {
      content:
        '상시 서버 대신 GitHub Actions로 실행하는 구조를 택해 사내망 접근과 봇 권한 문제를 풀고 별도 인프라 없이 운영',
    },
    {
      content: '오탐이 머지를 막지 않도록 리뷰를 권고형으로 운영',
    },
    {
      content: '리뷰 지적이 실제 코드 수정으로 이어졌는지 표본으로 판정해 효과 측정',
    },
    {
      content: '상위 조직 차원에서 하위 개발팀 저장소에 리뷰 엔진 도입',
    },
  ],
};

const nvLoadTestPlatform = {
  title: 'k6 기반 분산 부하 테스트 플랫폼 개발·운영',
  startedAt: '2025-12',
  where: WHERE.NV_VERTICAL,
  descriptions: [
    {
      content: '출시 전 성능 검증에 쓸 k6 기반 분산 부하 테스트 플랫폼을 직접 설계·개발',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content: '여러 조직이 출시 전 성능 검증에 사용, NAVER Engineering Day 발표',
        },
      ],
    },
    {
      content: '서버가 여러 부하 생성 노드에 부하를 나눠 거는 분산 구조와 실시간 대시보드 구현',
    },
    {
      content:
        'WebSocket으로 메트릭을 실시간 수집하고 재연결 시 시퀀스 번호로 확인받지 못한 구간부터 재전송',
    },
    {
      content: '노드별 지연 표본을 HDR Histogram 하나로 합쳐 분산 환경의 백분위 계산',
    },
    {
      content:
        '사용자 스크립트가 부하 생성 노드의 환경변수에 접근하지 못하도록 격리하고 비밀 값 로그 마스킹 적용',
    },
    {
      content:
        '다른 조직이 fork에서 고친 개선을 주기적으로 찾아 원작자 커밋을 유지한 채 본체에 역이식',
    },
    {
      content: 'AI 코딩 에이전트를 주 개발 도구로 쓰는 AI 네이티브 방식으로 개발',
    },
  ],
};

const nvThumbnailTagApi = {
  title: '상품 썸네일 태그 통합 API 설계·구현',
  startedAt: '2025-11',
  endedAt: '2026-01',
  where: WHERE.NV_VERTICAL,
  descriptions: [
    {
      content:
        '호출처마다 따로 조회하고 우선순위도 따로 구현하던 5종의 상품 태그를 하나의 통합 API로 설계·구현',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content: 'Coroutine 병렬 조회와 Redis 캐시 적용',
        },
        {
          content: '태그 하나의 조회가 실패해도 나머지 태그는 응답하도록 부분 실패 격리',
        },
        {
          content: '표시 속성을 API 응답에 담아 구버전 앱도 그대로 동작하도록 하위 호환 유지',
        },
      ],
    },
    {
      content:
        '노출 우선순위 정책을 서버 한 곳에서 관리해 홈·쇼핑 앱·추천 등 여러 지면의 태그 노출 기준 통일',
    },
    {
      content:
        '출시 전 부하 테스트로 처리 한계를 미리 확인하고 출시 후 홈·쇼핑 앱 지면에서 사전 예상을 크게 넘는 트래픽 처리',
    },
  ],
};

const nvHomePlatform = {
  title: '네이버 쇼핑 메인 홈 화면 개편',
  startedAt: '2025-08',
  endedAt: '2025-11',
  where: WHERE.NV_VERTICAL,
  descriptions: [
    {
      content: '홈 개편의 서버 API 담당',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content: '공통 상품 모델을 상속한 홈 전용 상품 모델을 설계해 홈 상품 API 통합',
        },
        {
          content: '클라이언트가 각자 호출하던 추천 모듈을 서버 API 하나로 모음',
        },
      ],
    },
    {
      content: '모듈마다 다른 추천·광고 연동을 조합할 수 있는 큐레이션 모델 설계',
    },
  ],
};

const nvVerticalSustaining = {
  title: '네이버 쇼핑 버티컬 서비스 백엔드 개발 및 운영',
  startedAt: '2025-04',
  where: WHERE.NV_VERTICAL,
  descriptions: [
    {
      content: '퀵커머스(지금배달) 신규 입점사(GS25, 이마트에브리데이 등) 오픈을 서버에서 지원',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content: '입점사마다 반복되던 연동 패턴을 정리해 API 인터페이스 표준화',
        },
      ],
    },
    {
      content: '퀵커머스(지금배달) V3 API 전환 (2026.02 출시)',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            '앱 서버를 거치던 지금배달 API를 쇼핑 앱이 전시 서버로 직접 호출하는 구조로 전환',
        },
        {
          content:
            '동료와 나눠 지점 일괄 조회, 메뉴, 홈 퀵커머스 모듈 API 개발과 출시 전 최종 QA 담당',
        },
        {
          content:
            '구간별 계측으로 지점 일괄 조회 API의 지연 원인을 찾아 지점마다 나뉘던 캐시 조회를 한 번으로 통합',
        },
      ],
    },
    {
      content:
        '네이버플러스 멤버십 신규 가입자 온보딩 기능의 전시 서버 BFF 단독 개발 (2026.09 출시)',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            '앱 서버·추천 등 협업 조직과 API 계약을 조율하고 화면 분기와 실패 시 응답 규칙을 서버 한 곳에 정리',
        },
      ],
    },
    {
      content:
        'A/B 테스트의 노출 상품 수 확대안을 부하 테스트로 검증해 기존 구성을 유지할 근거 제시',
      descriptions: [
        {
          content:
            '첫 측정은 하위 시스템 병목과 고정 사용자의 높은 캐시 적중이 두 안의 차이를 가려 비용이 작게 나왔음을 찾아 무작위 사용자로 재측정',
        },
      ],
    },
    {
      content: '여러 전시 지면이 공통 상품 모델과 조회 프로젝션을 함께 쓰도록 정리',
    },
  ],
};

const nvShoppingAppServer = {
  title: '네이버 쇼핑 앱 서버 개발',
  startedAt: '2024-02',
  endedAt: '2025-04',
  where: WHERE.NV_NSPA,
  descriptions: [
    {
      content: '네이버플러스 스토어 앱 출시 (2025.03)',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content: '네이버 AI 쇼핑앱 출시 8일만에 100만 다운로드 돌파',
          href: 'https://n.news.naver.com/mnews/article/001/0015277043',
        },
      ],
    },
    {
      content: '공통 영역, 마이홈, 멤버십, 마케팅 배너, 내 주변 등 앱 기능의 BFF API 개발',
    },
    {
      content:
        'Java를 Kotlin으로 전환하고 Coroutine 비동기 처리를 적용해 null 안전성과 개발 생산성 향상',
    },
    {
      content: '출시 전 부하 테스트와 캐시 최적화로 출시 트래픽 대비',
    },
    {
      content: 'Next.js 어드민 도구 리팩토링과 Ant Design 도입',
    },
  ],
};

const nvShortclip = {
  title: '쇼핑라이브 숏클립 서비스 출시와 고도화',
  startedAt: '2021-04',
  endedAt: '2023-05',
  where: WHERE.NV_LIVE,
  descriptions: [
    {
      content: '2021년 방송 구간 클립: 원본 방송에서 상품 구간을 추출하는 서비스의 백엔드 구현',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            '네이버 동영상 검색과 쇼핑 윈도·스마트스토어 상품 상세에 연관 방송 구간을 노출해 전환율과 구매율 상승',
        },
      ],
    },
    {
      content: '2022년 숏클립 출시: 네이버 쇼핑과 쇼핑라이브에 노출되는 숏폼 신규 서비스',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            '기획서를 분석해 데이터 모델과 API를 설계하고 백엔드·인프라·이벤트 설계 전반 담당',
        },
        { content: 'Kafka 이벤트 기반 아키텍처와 ffmpeg 영상 처리 파이프라인 구현' },
        { content: '출시 후 월 거래액, 전환율, 구매율 상승' },
      ],
    },
    {
      content:
        '2023년 하이라이트 고도화: 네이버 CLOVA API로 방송 주요 장면을 자동 추출해 다시보기 하이라이트와 숏클립 생성',
      weight: 'MEDIUM' as const,
    },
    {
      content: '네이버 쇼핑라이브 숏클립 회고 (요우의 2022년 개발자 회고, Tistory Blog)',
      href: 'https://luckyyowu.tistory.com/424#shortclip',
    },
  ],
};

const nvBroadcastBackend = {
  title: '쇼핑라이브 백엔드 개발과 운영',
  startedAt: '2021-03',
  endedAt: '2024-02',
  where: WHERE.NV_LIVE,
  descriptions: [
    {
      content: '쇼핑라이브 방송 송출과 서비스에 필요한 백엔드 API 개발·운영',
    },
    {
      content: '2021년 실시간 방송 재생 정보 전달 방식을 HTTP에서 Socket으로 전환',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content: '순간 트래픽이 몰릴 때 API 대역폭이 부족해질 위험 감소',
        },
      ],
    },
    {
      content: '2021년 방송 트레일러(미리보기) 개선',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            'CPC 효율이 높은 트레일러를 고르려고 다시보기 영상에 실시간 방송 지표를 적용하고, 여러 형태의 트레일러를 만드는 이벤트 파이프라인 구현',
        },
        {
          content: '개선 후 다시보기 주요 영역 유입 상승',
        },
      ],
    },
    {
      content: '2022년 서비스 설정 동기화용 ZooKeeper 라이브러리 신규 구현',
      weight: 'MEDIUM' as const,
    },
  ],
};

const yaJoyAPI = {
  title: '야놀자 숙박·레저 BFF(Mashup API) 개발과 운영',
  startedAt: '2018-02',
  endedAt: '2021-02',
  where: WHERE.YA,
  descriptions: [
    {
      content: '2018년 국내 숙소 상세(PDP) 리팩토링',
      weight: 'MEDIUM' as const,
      descriptions: [{ content: 'Redis Response Cache 도입과 리팩토링으로 Latency 90% 감소' }],
    },
    {
      content: '2018년 레저, 2019년 해외 숙소 예약 서비스 출시',
      weight: 'MEDIUM' as const,
      descriptions: [{ content: '레저 상품 데이터와 해외 OTA를 연동해 예약 기능 구현' }],
    },
    {
      content: '2020년 국내 숙소 상세 실시간 인기도 메시지',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            'A/B 테스트 설계 논의에 참여하고 데이터 조직의 데이터를 Aggregation하는 API 구현, 노출 후 구매 전환율 상승',
        },
      ],
    },
    {
      content: '2019~2020년 연간 포인트 지급 이벤트(2020 놀력) 개발과 운영',
      weight: 'MEDIUM' as const,
      descriptions: [
        { content: '1년 동안 24시간 무중단으로 진행, 목표치의 4배 달성' },
        {
          content:
            '포인트 지급·경품 추첨 알고리즘, 경품 재고 관리, 배치 워커, 지표 모니터링 도구 구현',
        },
      ],
    },
    {
      content: '2019~2020년 Redis 구조 개편',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            '용도 없이 섞여 쓰이던 Redis를 용도별로 분리하고 인스턴스를 줄여 운영 비용 절감과 저장 공간 부족 위험 해소',
        },
        {
          content: 'ElastiCache Read Replica로 명령을 분산하는 모듈 개발과 Redis 사용 정책 수립',
        },
      ],
    },
    {
      content: '레저 찜, 쇼킹특가/핫딜, 신규 광고 상품·쿠폰 유형, 후기 정책 등 커머스 기능 개발',
    },
    { content: 'AWS 비용 최적화와 ISMS 인증 획득을 위한 인프라 보안 작업' },
  ],
};

const plBackend = {
  title: '플레이팅 백엔드 개발과 새벽 배송 출시',
  startedAt: '2016-10',
  endedAt: '2017-11',
  where: WHERE.PL,
  descriptions: [
    {
      content: 'PHP API 서버를 Node.js·Express.js로 옮기며 기능 추가, v2부터 TDD와 ORM 도입',
    },
    {
      content:
        '2017년 새벽 배송 출시: 기존 API 서버로는 기능을 더할 수 없어 새벽 주문 전용 API 서버를 새로 개발, 이 서버가 API v2의 코드 베이스가 됨',
    },
    {
      content:
        '주문 백오피스용 Socket.io 서버와 Electron 기반 주문 확인지·영수증 출력 프로그램 개발',
      descriptions: [
        {
          content: '오픈소스 기여:',
          postHref: 'https://github.com/song940/node-escpos',
        },
      ],
    },
    { content: 'React.js 백오피스, ERP, 라이더 앱, 모니터링 도구 등 사내 도구 개발' },
    { content: 'AWS EC2·RDS·S3·CloudFront 기반 인프라 구성과 운영' },
  ],
};

const project: ProjectPayload = {
  disable: false,
  showMoreCount: 7,
  list: [
    nvAmazonVertical,
    nvAiCodeReview,
    nvLoadTestPlatform,
    nvThumbnailTagApi,
    nvHomePlatform,
    nvVerticalSustaining,
    nvShoppingAppServer,
    nvShortclip,
    nvBroadcastBackend,
    yaJoyAPI,
    plBackend,
  ],
};

export default project;
