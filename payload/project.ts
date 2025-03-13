import { IProject } from '../component/project/IProject';

const WHERE = {
  YA: '야놀자 (Yanolja)',
  PL: '플레이팅 (Plating)',
  EC: '이큐브랩 (Ecube Labs)',
  KY: '키니 (KYNY)',
  NV_LIVE: '네이버 (NAVER) 쇼핑라이브 백엔드 개발',
  NV_NSPA: '네이버 (NAVER) 쇼핑앱 백엔드 개발',
};

const nvShoppingAppServer: IProject.Item = {
  title: '네이버 쇼핑앱 서버 개발',
  startedAt: '2024-02',
  endedAt: '2025-04',
  where: WHERE.NV_NSPA,
  descriptions: [
    {
      content:
        '비즈니스 요구 사항에 따른 주요 기능(공통 영역, 쇼핑 MY, 멤버십, 마케팅 영역 등) BFF API 개발 및 안정성 확보',
    },
    {
      content:
        'Java → Kotlin 전환 및 Coroutine 기반 비동기 처리 적용으로 null 안전성과 생산성 향상',
    },
    {
      content:
        'API 부하 테스트 및 성능/캐시 최적화로 주요 기능 평균 응답 시간을 낮은 수준으로 유지',
    },
    {
      content:
        'Next.js 기반 어드민 도구 리팩토링, Ant Design 도입 및 Node.js/Next.js 기반 최적화 수행',
    },
    {
      content:
        '"쿠팡 딱 긴장해라"... 40만명이 대기표 뽑은 네이버 쇼핑 앱 직접 써보니 (it.chosun.com)',
      href: 'https://it.chosun.com/news/articleView.html?idxno=2023092136052',
    },
  ],
};

const nvHighlightEnhance: IProject.Item = {
  title: '쇼핑라이브 하이라이트 고도화',
  startedAt: '2023-03',
  endedAt: '2023-05',
  where: WHERE.NV_LIVE,
  descriptions: [
    {
      content:
        '라이브 방송에서 주요 장면을 자동 추출하여 다시보기 뷰어 하이라이트 목록과 네이버 쇼핑에서 숏클립 형태로 전시',
    },
    {
      content:
        '내부 인프라와 네이버 CLOVA API를 사용하여 신규 하이라이트 생성 스펙을 충족하는 파이프라인 구축',
    },
    {
      content: '신규 추가된 키워드 하이라이트를 숏클립으로 생성하는 로직 구현',
    },
    {
      content: '비동기 작업을 효과적으로 수행할 수 있는 유틸성 도메인 설계 및 구현',
    },
  ],
};

const nvShortclip: IProject.Item = {
  title: '쇼핑라이브 숏클립 서비스 백엔드 개발 및 운영',
  startedAt: '2022-04',
  endedAt: '2022-09',
  where: WHERE.NV_LIVE,
  descriptions: [
    {
      content: '네이버 쇼핑 및 쇼핑라이브에 노출되는 숏폼(Short-form) 타입의 신규 서비스를 출시',
    },
    {
      content: '숏클립 서비스의 전반적인 백엔드 구현, 인프라 구축, 이벤트 설계 및 RESTful API 개발',
    },
    { content: 'ffmpeg를 사용한 영상 처리 및 각 도메인 서버 주요 API와의 결합' },
    { content: '데이터베이스 및 API 응답 모델링을 통한 구조 설계와 기획서 분석' },
    { content: 'Kafka 실시간 데이터 처리 및 이벤트 기반 아키텍처를 적용' },
    { content: '방송 하이라이트 및 상품 구간 자동 생성 기능 구현과 데이터 마이그레이션 진행' },
    { content: '숏클립 관련 공통 라이브러리 개발 및 제공' },
    { content: '서비스 출시 이후 매월 거래액이 상승 중이며, 전환률 및 구매율 향상' },
    {
      content: '네이버 쇼핑라이브 숏클립 회고 (요우의 2022년 개발자 회고, Tistory Blog)',
      href: 'https://luckyyowu.tistory.com/424#shortclip',
    },
  ],
};

const nvBroadcastClip: IProject.Item = {
  title: '쇼핑라이브 하이라이트/상품 구간 클립 서비스 개발 및 운영',
  startedAt: '2021-04',
  endedAt: '2021-09',
  where: WHERE.NV_LIVE,
  descriptions: [
    { content: '원본 방송에서 Short Clip 영상을 추출하고, 사용자에게 제공하는 서비스 백엔드 구현' },
    {
      content: 'RDB Schema 정의, Batch Service, Event Handler, Kafka Consumer, RESTful API 개발 등',
    },
    {
      content:
        '네이버 동영상 검색, 네이버 쇼핑 윈도/스마트스토어 상품상세 연관 라이브 방송 구간 노출',
    },
    { content: '사용자에게 구매 희망 상품의 정보를 영상으로 제공함에 따라 전환률, 구매율 상승' },
    { content: '해당 기능을 통해 일 평균 약 n회의 추가 인입 발생' },
    {
      content: "'네이버 쇼핑라이브 숏 클립' 프로젝트 후기 (Facebook)",
      href: 'https://www.facebook.com/LuckyYowu/posts/4420287811362249',
    },
  ],
};

const nvBroadcastBackend: IProject.Item = {
  title: '쇼핑라이브 백엔드 개발 및 유지보수 / 운영',
  startedAt: '2021-03',
  endedAt: '2024-02',
  where: WHERE.NV_LIVE,
  descriptions: [
    {
      content: '쇼핑라이브 방송 송출 및 서비스에 필요한 Backend API 개발 및 운영 / 서스테이닝',
    },
    {
      content: '2023년 네이버 숏폼판 데이터 제공을 위한 숏클립 연동 작업',
      weight: 'MEDIUM',
    },
    {
      content: '2022년 Service Config 동기화를 위한 신규 ZooKeeper 라이브러리 구현',
      weight: 'MEDIUM',
    },
    {
      content: '2022년 쇼핑라이브 ADMIN 개선 및 신규 기능 추가',
      weight: 'MEDIUM',
    },
    {
      content: ' 2021년 실시간 방송 재생 정보 HTTP → Socket 방식으로 전환',
      weight: 'MEDIUM',
      descriptions: [
        {
          content: '순간적인 트래픽이 몰렸을 때 API 대역폭 리스크 감소',
        },
      ],
    },
    {
      content: '2021년 방송 트레일러(미리보기) 개션',
      weight: 'MEDIUM',
      descriptions: [
        {
          content:
            'CPC에 효과적인 트레일러를 노출시키기 위해, 다시보기 영상에 실시간 방송 지표를 적용한 트레일러 추출 및 적용',
        },
        {
          content:
            '기존의 일차원적인 트레일러를 다양하게 제공할 수 있도록 서비스 설계 및 이벤트 파이프라인 구현',
        },
        {
          content: '개선 이후 다시보기 주요 영역 유입 약 x%, 최대 y%, 최소 z% 상승',
        },
      ],
    },
  ],
};

const yaNol2020Dlc: IProject.Item = {
  title: '야놀자 놀력 이벤트 성수기 업데이트 및 운영',
  startedAt: '2020-05',
  endedAt: '2020-07',
  where: WHERE.YA,
  descriptions: [
    { content: '하단의 놀력 이벤트 기능에서 경품 당첨 기능을 추가한 고도화 개발' },
    {
      content:
        '놀력 추첨 알고리즘, 경품 재고 관리, 당첨 정보 스토리징 및 스트리밍, Mashup API 구현',
    },
    { content: '단기 측정 기준 해당 프로젝트 성과로 DAU 의 n% 증가됨' },
  ],
};

const yaRedisDist: IProject.Item = {
  title: 'Redis 구조 추가 개선/개편',
  startedAt: '2020-04',
  endedAt: '2020-06',
  where: WHERE.YA,
  descriptions: [
    {
      content: '사용성 최적화 및 인스턴스 축소로 전체 사용 비용 $n 감소에 기여 (기존 대비 n% 수준)',
    },
    {
      content:
        '레거시 불필요 데이터 조사 및 청산으로 Storeage 사용량을 x% → y% 로 감소시켜 Disk Full Risk 해소',
    },
    {
      content:
        'AWS ElastiCache 에서 제공하는 Redis Read Replica 활용가능 하도록 Redis 부하 분산 모듈 개발',
    },
    { content: 'Application Level 의 Redis Transaction Logger 구현하여 디버그 용이성 증가' },
  ],
};

const yaNol2020: IProject.Item = {
  title: '야놀자 2020 놀력 포인트 지급 이벤트 개발 및 운영',
  startedAt: '2019-10',
  endedAt: '2020-01',
  where: WHERE.YA,
  descriptions: [
    { content: '1년간 24시간 진행되는 무중단 이벤트 구현' },
    {
      content:
        '비즈니스 요구사항 구체화 및 제약 사항 파악, 개발 방향성 수립, 포인트 지급 알고리즘 및 API 구현',
    },
    {
      content: 'Batch Worker 미 이벤트 지표 모니터링 도구, 비상용 관리자 CLI 기능 구현',
    },
    {
      content:
        '2020년 6월 기준 MAU n%, DAU n% 향상 및 평균 구매 건수 n건 향상, 기존 목표치 대비 4배 달성',
    },
    {
      content: "(관련기사) 야놀자 탁상용 달력 '2020 놀력' 출시",
      href: 'http://topclass.chosun.com/daily/view.asp?idx=267&Newsnumb=201911267',
    },
  ],
};

const yaRedis: IProject.Item = {
  title: 'Legacy Redis 청산 및 구조 개편',
  startedAt: '2019-07',
  endedAt: '2019-10',
  where: WHERE.YA,
  descriptions: [
    { content: '용도와 목적 없이 사용되고 있던 Redis 전체 정리' },
    { content: '기존 n개의 Client 를 용도/목적에 맞게 m개의 Client로 분리' },
    { content: 'Storage 부족 현상 해소로 서비스 운영 위협 감소' },
    { content: 'Read Replica 활용할 수 있는 명령 요청 분산 모듈 구현' },
    { content: '비효율적인 사용 로직 개선하여 트래픽 n% 감소' },
    { content: 'Product 개발시 Redis 사용과 ElastiCache 운영에 대한 정책 수립' },
  ],
};

const yaJoyAPI: IProject.Item = {
  title: '야놀자 Mashup API 개발 및 유지보수 / 운영',
  startedAt: '2018-02',
  endedAt: '2021-02',
  where: WHERE.YA,
  descriptions: [
    { content: 'Aggregation Layer의 Mashup API 개발 및 운영' },
    {
      content: ' 2020년 국내 숙소 상세 실시간 인기도 메시지 기능 추가',
      weight: 'MEDIUM',
      descriptions: [
        {
          content:
            'A/B 테스트 논의 및 클라이언트 제공 Mashup API 구현, 데이터 조직 제종 데이터 Aggregation 완료',
        },
        { content: '실시간 인기도 메시지 노출로 구매 전환 및 화면 전환율 n% 상승' },
      ],
    },
    {
      content: '2020년 국내 레저 찜 기능 추가',
      weight: 'MEDIUM',
      descriptions: [
        { content: '기존 국내 숙소/해외 숙소만 존재하던 야놀자 서비스에 국내 레저 찜 기능을 추가' },
        {
          content:
            '해외 숙소 API 와 통합하여 하나의 API 에서 해외 숙소, 국내 레저 찜 기능을 모두 사용할 수 있는 Integration API 구현',
        },
        {
          content:
            '국내 레저 찜 기능을 통한 주문 전환율 n% 증가 / 전체 주문 건수의 n% 가 국내 레저 찜 기능을 통해 구매',
        },
      ],
    },
    {
      content: '2020년 신규 쿠폰 유형 적용',
      weight: 'MEDIUM',
      descriptions: [
        {
          content:
            '기존 사용되던 쿠폰의 신규 제약조건을 노출 단계에 구현함으로써 오프라인 비즈니스 및 운영 조직 부담 감소',
        },
      ],
    },
    {
      content: '2020년 숙소 후기 Freshness 정책 적용',
      weight: 'MEDIUM',
      descriptions: [
        { content: '신규 후기 정책 Aggregation Layer API 적용으로 사용자 신뢰성 향상' },
        { content: 'Legacy 로 판단되던 정책 개선을 서비스에 반영한 것에 의의' },
      ],
    },
    {
      content: '2019년 숙소 리스트 신규 광고 상품 추가',
      weight: 'MEDIUM',
      descriptions: [{ content: '신규 광고 상품 추가로 신규 매출 발생에 기여' }],
    },
    {
      content: '2019년 쇼킹특가/핫딜 서비스 런칭',
      weight: 'MEDIUM',
      descriptions: [{ content: '신규 할인 상품 추가로 추가 매출 발생 및 사용자 구매율 향상' }],
    },
    {
      content: '2019년 해외숙소 예약 서비스 런칭',
      weight: 'MEDIUM',
      descriptions: [{ content: '해외 OTA 연동으로 해외 숙소 예약 가능하도록 런칭' }],
    },
    {
      content: '2018년 레저 서비스 런칭',
      weight: 'MEDIUM',
      descriptions: [
        { content: '레저 상품 데이터 연동으로 레저 서비스 예약 기능 런칭' },
        {
          content: '(참고자료) 야놀자가 레저를 판매하려고 할 때 벌어지는 일 (by 송요창님)',
          href:
            'https://speakerdeck.com/totuworld/yanoljaga-rejeoreul-panmaeharyeogo-hal-ddae-beoleojineun-il',
        },
      ],
    },
    {
      content: '2018년 국내 숙소 상세 개편 및 유지보수',
      weight: 'MEDIUM',
      descriptions: [
        { content: '2018년 상반기에 국내 숙소 상세(PDP) 리팩토링 및 서비스 개선 완료' },
        { content: 'Redis 활용한 Response Cache 도입 및 리팩토링으로 기존 대비 Latency 90% 감소' },
        { content: '사용자 경험 및 매출 향상 위한 추가 비즈니스 요구사항 개발 및 구조 개선' },
      ],
    },
    {
      content: 'AWS 인프라 유지보수 및 ISMS 인증 작업',
      weight: 'MEDIUM',
      descriptions: [
        { content: '주기적으로 변경 및 강화되는 인프라 정책을 팀 프로젝트에 적용' },
        { content: '팀 내 AWS 사용 구조 개선과 비용 최적화' },
        { content: 'ISMS 인증 획득을 위한 인프라 보안 강화 작업 담당' },
      ],
    },
    { content: 'API 모니터링 대시보드 구성 및 유지보수' },
  ],
};

const plBackend: IProject.Item = {
  title: '플레이팅 백엔드/프론트엔드 서비스 개발',
  startedAt: '2016-10',
  endedAt: '2017-11',
  where: WHERE.PL,
  descriptions: [
    {
      content: 'API Server v1 / v2',
      weight: 'MEDIUM',
      descriptions: [
        { content: '플레이팅 서비스에 사용되는 API 서버 개발' },
        {
          content: '기존 PHP로 작성된 v1 API를 Node.js와 Express.js로 이전 및 기능 추가, 코드 개선',
        },
        { content: 'API v2 부터 TDD, ORM 등 도입' },
        { content: 'AWS EC2, pm2, nginx를 서버 인프라로 사용' },
        { content: 'AWS RDS의 MySQL를 데이터베이스로 사용' },
      ],
    },
    {
      content: 'Socket Server',
      weight: 'MEDIUM',
      descriptions: [
        { content: '주문 관련 백오피스에 사용되는 소켓 서버 개발' },
        { content: 'Node.js와 Socket.io, Express.js를 사용하여 개발' },
        { content: 'AWS EC2 내의 MongoDB를 데이터베이스로 사용' },
      ],
    },
    {
      content: 'ETC',
      weight: 'MEDIUM',
      descriptions: [
        {
          content: 'Admin 서비스 개발',
          descriptions: [
            { content: 'React.js 등을 사용하여 내부 백오피스 툴 개발' },
            { content: 'ERP, 라이더 앱, 서버 모니터링 등 개발' },
            { content: 'Socket Client 통신, 비동기 HTTP 통신 등을 사용' },
          ],
        },
        {
          content: 'ESC/POS Printer Navtive 프로그램 개발',
          descriptions: [
            { content: '플레이팅 자체 주문 확인지와 영수증 출력용 프로그램' },
            { content: 'Node.js와 Electron.js, node-escpos를 사용하여 개발' },
            {
              content: '오픈소스 기여:',
              postHref: 'https://github.com/song940/node-escpos',
            },
          ],
        },
        { content: '백엔드 Batch 서비스 개발' },
        { content: 'Telegram Bot API, CloudWatch Event 사용한 지표 모니터링 서비스 개발' },
        { content: 'Microservice 가격 계산 서버 개발' },
        { content: 'AWS S3, CloudFront 등을 사용한 자체 CDN 구축' },
        { content: 'React Native 사용한 앱 서비스 유지보수' },
      ],
    },
  ],
};

const plDelivery: IProject.Item = {
  title: '플레이팅 새벽 배송 서비스 런칭',
  startedAt: '2017-03',
  endedAt: '2017-05',
  where: WHERE.PL,
  descriptions: [
    { content: '새로운 주문 형태인 새벽 배송 시스템 개발' },
    { content: '기존 API 서버 관리 미흡으로 기능 추가 불가능 상황 도래' },
    { content: '새벽 주문 전용 Node.js API 서버를 구축하고 기능 개발' },
    { content: 'API v2 프로젝트의 코드 베이스가 됨.' },
    { content: '개발 시 확장성과 모듈화 고려의 중요성을 깨닫게 됨' },
  ],
};

const ecBackend: IProject.Item = {
  title: '클릭시티네트웍스 백엔드 개발',
  startedAt: '2015-07',
  endedAt: '2016-02',
  where: WHERE.EC,
  descriptions: [
    { content: '도시 쓰레기량 관제 모니터링 툴 개발' },
    { content: 'Beta는 PHP, v1 은 Node.js, Express.js로 개발' },
    { content: 'v1 개발 당시 사내 최초로 AWS를 도입함' },
    { content: '백엔드 개발자로서 Out of Memory, 침해 사고, 성능 튜닝 등 다양한 서버 문제를 경험' },
  ],
};

const kyToto: IProject.Item = {
  title: '스포츠 경기 승률 계산 서비스 개발',
  startedAt: '2014-09',
  endedAt: '2015-03',
  where: WHERE.KY,
  descriptions: [
    { content: '통계 알고리즘을 사용한 해외 축구 스포츠 경기 승률 예상 서비스' },
    { content: 'Java Servlet을 사용하여 통계 알고리즘을 코드화' },
    { content: 'Linux와 Apache 등을 사용하여 서버 인프라 구축' },
    { content: 'Wordpress, PHP, MySQL 등을 사용하여 서비스 개발' },
    {
      content:
        '비즈니스 멘토링을 통해 BM 분석, 사업 전략 수립, 개발 방향성 수립 및 설계, 다른 직군과의 협업 등을 경험',
    },
  ],
};

const project: IProject.Payload = {
  disable: false,
  list: [
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
    plBackend,
    plDelivery,
    ecBackend,
    kyToto,
  ],
};

export default project;
