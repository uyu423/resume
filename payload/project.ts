import { ProjectPayload } from '../types/project';

const WHERE = {
  YA: '야놀자 (Yanolja)',
  PL: '플레이팅 (Plating)',
  EC: '이큐브랩 (Ecube Labs)',
  KY: '키니 (KYNY)',
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

const nvHighlightEnhance = {
  title: '쇼핑라이브 하이라이트 고도화',
  startedAt: '2023-03',
  endedAt: '2023-05',
  where: WHERE.NV_LIVE,
  descriptions: [
    {
      content:
        '라이브 방송의 주요 장면을 자동으로 추출해 다시보기 하이라이트 목록과 네이버 쇼핑 숏클립으로 전시',
    },
    {
      content: '사내 인프라와 네이버 CLOVA API로 신규 하이라이트 생성 파이프라인 구축',
    },
    { content: '신규 키워드 하이라이트를 숏클립으로 만드는 로직 구현' },
    { content: '비동기 작업을 다루는 공통 유틸 도메인 설계·구현' },
  ],
};

const nvShortclip = {
  title: '쇼핑라이브 숏클립 서비스 백엔드 개발 및 운영',
  startedAt: '2022-04',
  endedAt: '2022-09',
  where: WHERE.NV_LIVE,
  descriptions: [
    { content: '네이버 쇼핑과 쇼핑라이브에 노출되는 숏폼 신규 서비스 출시' },
    { content: '숏클립 백엔드 구현, 인프라 구성, 이벤트 설계, RESTful API 개발 전반 담당' },
    { content: 'ffmpeg 영상 처리와 각 도메인 서버 API 연동' },
    { content: '기획서를 분석해 데이터베이스와 API 응답 모델 설계' },
    { content: 'Kafka 실시간 데이터 처리와 이벤트 기반 아키텍처 적용' },
    { content: '방송 하이라이트·상품 구간 자동 생성 기능 구현과 데이터 마이그레이션' },
    { content: '숏클립 공통 라이브러리 개발·배포' },
    { content: '출시 후 월 거래액, 전환율, 구매율 상승' },
    {
      content: '네이버 쇼핑라이브 숏클립 회고 (요우의 2022년 개발자 회고, Tistory Blog)',
      href: 'https://luckyyowu.tistory.com/424#shortclip',
    },
  ],
};

const nvBroadcastClip = {
  title: '쇼핑라이브 하이라이트/상품 구간 클립 서비스 개발 및 운영',
  startedAt: '2021-04',
  endedAt: '2021-09',
  where: WHERE.NV_LIVE,
  descriptions: [
    { content: '원본 방송에서 짧은 클립 영상을 추출해 사용자에게 보여 주는 서비스의 백엔드 구현' },
    {
      content: 'RDB 스키마 정의, 배치, 이벤트 핸들러, Kafka Consumer, RESTful API 개발',
    },
    {
      content: '네이버 동영상 검색과 쇼핑 윈도·스마트스토어 상품 상세에 연관 라이브 방송 구간 노출',
    },
    { content: '구매하려는 상품의 정보를 영상으로 보여 주어 전환율과 구매율 상승' },
    {
      content: "'네이버 쇼핑라이브 숏 클립' 프로젝트 후기 (Facebook)",
      href: 'https://www.facebook.com/LuckyYowu/posts/4420287811362249',
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
      content: '2023년 네이버 숏폼판에 데이터를 제공하기 위한 숏클립 연동',
      weight: 'MEDIUM' as const,
    },
    {
      content: '2022년 서비스 설정 동기화용 ZooKeeper 라이브러리 신규 구현',
      weight: 'MEDIUM' as const,
    },
    {
      content: '2022년 쇼핑라이브 어드민 개선과 신규 기능 추가',
      weight: 'MEDIUM' as const,
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
            'CPC 효율이 높은 트레일러를 고르려고 다시보기 영상에 실시간 방송 지표를 적용해 트레일러 추출',
        },
        {
          content:
            '한 가지 방식뿐이던 트레일러를 여러 형태로 제공하도록 서비스 설계와 이벤트 파이프라인 구현',
        },
        {
          content: '개선 후 다시보기 주요 영역 유입 상승',
        },
      ],
    },
  ],
};

const yaNol2020Dlc = {
  title: '야놀자 놀력 이벤트 성수기 업데이트 및 운영',
  startedAt: '2020-05',
  endedAt: '2020-07',
  where: WHERE.YA,
  descriptions: [
    { content: '2020 놀력 이벤트에 경품 당첨 기능 추가' },
    {
      content: '추첨 알고리즘, 경품 재고 관리, 당첨 정보 저장·스트리밍, Mashup API 구현',
    },
    { content: '이벤트 기간 DAU 증가' },
  ],
};

const yaRedisDist = {
  title: 'Redis 구조 2차 개편',
  startedAt: '2020-04',
  endedAt: '2020-06',
  where: WHERE.YA,
  descriptions: [
    {
      content: '용도별 분리와 인스턴스 축소로 Redis 운영 비용 절감',
    },
    {
      content: '불필요한 레거시 데이터를 조사·정리해 디스크 부족 위험 해소',
    },
    {
      content: 'AWS ElastiCache Redis Read Replica를 쓸 수 있도록 부하 분산 모듈 개발',
    },
    { content: '디버깅용 애플리케이션 레벨 Redis Transaction Logger 구현' },
  ],
};

const yaNol2020 = {
  title: '야놀자 2020 놀력 포인트 지급 이벤트 개발 및 운영',
  startedAt: '2019-10',
  endedAt: '2020-01',
  where: WHERE.YA,
  descriptions: [
    { content: '1년 동안 24시간 무중단으로 진행되는 이벤트 구현' },
    {
      content:
        '비즈니스 요구사항과 제약을 구체화해 개발 방향을 정하고 포인트 지급 알고리즘과 API 구현',
    },
    {
      content: '배치 워커, 이벤트 지표 모니터링 도구, 비상용 관리자 CLI 구현',
    },
    {
      content: '기존 목표치의 4배 달성',
    },
    {
      content: "(관련기사) 야놀자 탁상용 달력 '2020 놀력' 출시",
      href: 'http://topclass.chosun.com/daily/view.asp?idx=267&Newsnumb=201911267',
    },
  ],
};

const yaRedis = {
  title: '레거시 Redis 정리와 구조 개편',
  startedAt: '2019-07',
  endedAt: '2019-10',
  where: WHERE.YA,
  descriptions: [
    { content: '용도와 목적 없이 쓰이던 Redis 전체 정리' },
    { content: '용도별 Client 분리' },
    { content: '저장 공간 부족을 해소해 서비스 운영 위험 감소' },
    { content: 'Read Replica를 활용하는 명령 분산 모듈 구현' },
    { content: '비효율적인 사용 로직을 고쳐 Redis 트래픽 감소' },
    { content: '제품 개발 시 Redis 사용 정책과 ElastiCache 운영 정책 수립' },
  ],
};

const yaJoyAPI = {
  title: '야놀자 Mashup API 개발과 운영',
  startedAt: '2018-02',
  endedAt: '2021-02',
  where: WHERE.YA,
  descriptions: [
    { content: 'Aggregation Layer의 Mashup API 개발·운영' },
    {
      content: '2020년 국내 숙소 상세 실시간 인기도 메시지 추가',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            'A/B 테스트 설계 논의, 클라이언트용 Mashup API 구현, 데이터 조직이 제공한 데이터 Aggregation',
        },
        { content: '실시간 인기도 메시지 노출 후 구매 전환율과 화면 전환율 상승' },
      ],
    },
    {
      content: '2020년 국내 레저 찜 기능 추가',
      weight: 'MEDIUM' as const,
      descriptions: [
        { content: '국내 숙소와 해외 숙소에만 있던 찜 기능을 국내 레저로 확장' },
        {
          content:
            '해외 숙소 찜 API와 통합해 해외 숙소와 국내 레저 찜을 한 번에 처리하는 Integration API 구현',
        },
        {
          content: '국내 레저 찜 기능으로 주문 전환율 상승',
        },
      ],
    },
    {
      content: '2020년 신규 쿠폰 유형 적용',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content:
            '쿠폰의 새 제약 조건을 노출 단계에서 처리해 오프라인 비즈니스·운영 조직의 부담 감소',
        },
      ],
    },
    {
      content: '2020년 숙소 후기 Freshness 정책 적용',
      weight: 'MEDIUM' as const,
      descriptions: [
        { content: 'Aggregation Layer API에 신규 후기 정책을 적용해 후기 신뢰도 향상' },
        { content: '오래된 레거시 후기 정책을 새 기준으로 교체' },
      ],
    },
    {
      content: '2019년 숙소 리스트 신규 광고 상품 추가',
      weight: 'MEDIUM' as const,
      descriptions: [{ content: '새 광고 상품으로 신규 매출 발생' }],
    },
    {
      content: '2019년 쇼킹특가/핫딜 서비스 출시',
      weight: 'MEDIUM' as const,
      descriptions: [{ content: '새 할인 상품으로 추가 매출 발생과 구매율 상승' }],
    },
    {
      content: '2019년 해외 숙소 예약 서비스 출시',
      weight: 'MEDIUM' as const,
      descriptions: [{ content: '해외 OTA를 연동해 해외 숙소 예약 기능 구현' }],
    },
    {
      content: '2018년 레저 서비스 출시',
      weight: 'MEDIUM' as const,
      descriptions: [
        { content: '레저 상품 데이터를 연동해 레저 예약 기능 구현' },
        {
          content: '(참고자료) 야놀자가 레저를 판매하려고 할 때 벌어지는 일 (by 송요창님)',
          href: 'https://speakerdeck.com/totuworld/yanoljaga-rejeoreul-panmaeharyeogo-hal-ddae-beoleojineun-il',
        },
      ],
    },
    {
      content: '2018년 국내 숙소 상세 개편과 유지보수',
      weight: 'MEDIUM' as const,
      descriptions: [
        { content: '2018년 상반기 국내 숙소 상세(PDP) 리팩토링과 서비스 개선' },
        { content: 'Redis Response Cache 도입과 리팩토링으로 Latency 90% 감소' },
        { content: '매출 향상을 위한 추가 요구사항 개발과 구조 개선' },
      ],
    },
    {
      content: 'AWS 인프라 유지보수와 ISMS 인증',
      weight: 'MEDIUM' as const,
      descriptions: [
        { content: '주기적으로 바뀌고 강화되는 인프라 정책을 팀 프로젝트에 적용' },
        { content: '팀의 AWS 사용 구조 정리와 비용 최적화' },
        { content: 'ISMS 인증 획득을 위한 인프라 보안 작업 담당' },
      ],
    },
    { content: 'API 모니터링 대시보드 구성과 유지보수' },
  ],
};

const plBackend = {
  title: '플레이팅 백엔드/프론트엔드 서비스 개발',
  startedAt: '2016-10',
  endedAt: '2017-11',
  where: WHERE.PL,
  descriptions: [
    {
      content: 'API Server v1 / v2',
      weight: 'MEDIUM' as const,
      descriptions: [
        { content: '플레이팅 서비스의 API 서버 개발' },
        {
          content: 'PHP로 작성된 v1 API를 Node.js·Express.js로 옮기며 기능 추가와 코드 개선',
        },
        { content: 'v2부터 TDD와 ORM 도입' },
        { content: 'AWS EC2, pm2, nginx 기반 서버 인프라' },
        { content: 'AWS RDS MySQL 데이터베이스' },
      ],
    },
    {
      content: 'Socket Server',
      weight: 'MEDIUM' as const,
      descriptions: [
        { content: '주문 백오피스용 소켓 서버 개발' },
        { content: 'Node.js, Socket.io, Express.js 사용' },
        { content: 'AWS EC2에 설치한 MongoDB 사용' },
      ],
    },
    {
      content: 'ETC',
      weight: 'MEDIUM' as const,
      descriptions: [
        {
          content: 'Admin 서비스 개발',
          descriptions: [
            { content: 'React.js로 내부 백오피스 도구 개발' },
            { content: 'ERP, 라이더 앱, 서버 모니터링 도구 개발' },
            { content: '소켓 클라이언트 통신과 비동기 HTTP 통신 사용' },
          ],
        },
        {
          content: 'ESC/POS 프린터 네이티브 프로그램 개발',
          descriptions: [
            { content: '플레이팅 주문 확인지와 영수증 출력 프로그램' },
            { content: 'Node.js, Electron.js, node-escpos로 개발' },
            {
              content: '오픈소스 기여:',
              postHref: 'https://github.com/song940/node-escpos',
            },
          ],
        },
        { content: '백엔드 배치 서비스 개발' },
        { content: 'Telegram Bot API와 CloudWatch Event로 지표 모니터링 서비스 개발' },
        { content: '가격 계산 마이크로서비스 개발' },
        { content: 'AWS S3, CloudFront로 자체 CDN 구성' },
        { content: 'React Native 앱 유지보수' },
      ],
    },
  ],
};

const plDelivery = {
  title: '플레이팅 새벽 배송 서비스 출시',
  startedAt: '2017-03',
  endedAt: '2017-05',
  where: WHERE.PL,
  descriptions: [
    { content: '새 주문 형태인 새벽 배송 시스템 개발' },
    {
      content: '기존 API 서버로는 기능을 더할 수 없어 새벽 주문 전용 Node.js API 서버를 새로 개발',
    },
    { content: '이 서버가 API v2 프로젝트의 코드 베이스가 됨' },
    { content: '확장성과 모듈화를 처음부터 고려해야 한다는 교훈을 얻음' },
  ],
};

const ecBackend = {
  title: '클린시티네트웍스 백엔드 개발',
  startedAt: '2015-07',
  endedAt: '2016-02',
  where: WHERE.EC,
  descriptions: [
    { content: '도시 쓰레기량 관제 모니터링 도구 개발' },
    { content: 'Beta는 PHP, v1은 Node.js·Express.js로 개발' },
    { content: 'v1 개발 때 사내 최초로 AWS 도입' },
    { content: 'Out of Memory, 침해 사고, 성능 튜닝 등 서버 문제 대응 경험' },
  ],
};

const kyToto = {
  title: '스포츠 경기 승률 계산 서비스 개발',
  startedAt: '2014-09',
  endedAt: '2015-03',
  where: WHERE.KY,
  descriptions: [
    { content: '통계 알고리즘으로 해외 축구 경기의 승률을 예측하는 서비스' },
    { content: 'Java Servlet으로 통계 알고리즘 구현' },
    { content: 'Linux와 Apache로 서버 인프라 구성' },
    { content: 'WordPress, PHP, MySQL로 서비스 개발' },
    {
      content:
        '비즈니스 멘토링으로 BM 분석, 사업 전략 수립, 개발 방향 설계를 경험하고 다른 직군과 협업',
    },
  ],
};

const project: ProjectPayload = {
  disable: false,
  showMoreCount: 9,
  list: [
    nvAmazonVertical,
    nvAiCodeReview,
    nvLoadTestPlatform,
    nvThumbnailTagApi,
    nvHomePlatform,
    nvVerticalSustaining,
    nvShoppingAppServer,
    nvHighlightEnhance,
    nvShortclip,
    nvBroadcastClip,
    nvBroadcastBackend,
    yaNol2020Dlc,
    yaRedisDist,
    yaNol2020,
    yaRedis,
    yaJoyAPI,
    plDelivery,
    plBackend,
    ecBackend,
    kyToto,
  ],
};

export default project;
