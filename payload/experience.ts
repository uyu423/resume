import { ExperiencePayload } from '../types/experience';

const naverAxTf = {
  title: 'Shopping Product / AI 전환(AX) 개발 생산성 향상 TF (겸직)',
  startedAt: '2026-02',
  descriptions: [
    { content: '팀 공용 AI 코드 리뷰를 TF 과제로 제안하고 개발·운영 담당' },
    { content: '리서치, 구현 계획, 커밋, PR 생성을 잇는 팀 공통 AI 스킬 세트 공동 설계' },
    { content: '여러 개발팀의 AI 에이전트 기반 개발 워크플로우 표준화와 확산 참여' },
  ],
  skillKeywords: ['Claude Code', 'AI Agent Workflow', 'GitHub Actions'],
};

const naverVerticalServer = {
  title: 'Shopping Product / 쇼핑 버티컬 서비스 백엔드 개발자',
  startedAt: '2025-04',
  descriptions: [
    { content: '네이버 쇼핑 버티컬 서비스(홈·전시·퀵커머스·멤버십 등)의 백엔드 API와 BFF 개발' },
    { content: '운영자용 전시 도구 백엔드 개발' },
    { content: 'k6 기반 분산 부하 테스트 플랫폼 개발·운영' },
    { content: '부분 실패 격리와 폴백 설계, 레거시 정리 등 서비스 안정화' },
  ],
  skillKeywords: [
    'Kotlin',
    'Coroutine',
    'Spring Boot',
    'WebFlux',
    'MongoDB',
    'Redis',
    'OpenSearch',
    'Kafka',
    'Kubernetes',
    'k6',
    'GitHub Actions',
    'TypeScript',
  ],
};

const naverNspa = {
  title: 'Shopping Product / 쇼핑 앱 백엔드 개발자',
  startedAt: '2024-02',
  endedAt: '2025-04',
  descriptions: [
    { content: '네이버 쇼핑 앱 BFF 서버 API 개발' },
    {
      content:
        '네이버플러스 스토어 앱 출시(2025.03)에 맞춰 마이홈, 멤버십, 마케팅 배너, 내 주변 등 앱 기능 API 개발',
    },
    {
      content:
        'MySQL·NoSQL 데이터베이스 운영, 앱 출시에 맞춰 서버를 사내 Kubernetes 플랫폼으로 이관',
    },
    { content: 'Kafka 이벤트 처리로 실시간 데이터 통합' },
    { content: '팀 코드 리뷰와 기술 스터디 진행' },
  ],
  skillKeywords: [
    'Kotlin',
    'Coroutine',
    'Java',
    'Spring Boot',
    'Node.js',
    'TypeScript',
    'Next.js',
    'MySQL',
    'MongoDB',
    'Redis',
    'Kubernetes',
    'Docker',
    'Kafka',
    'Jenkins',
  ],
};

const naverShoppinglive = {
  title: 'Forest CIC / 쇼핑라이브 백엔드 개발자',
  startedAt: '2021-02',
  endedAt: '2024-02',
  descriptions: [
    { content: '네이버 비디오커머스 서비스(쇼핑라이브) 백엔드 개발' },
    { content: '라이브 방송과 숏클립 서비스의 데이터 모델링, API 개발' },
    { content: '사용자 요구를 반영한 기능 개선과 신규 비즈니스 로직 구현' },
    { content: '레거시 정리와 기존 기능 유지보수' },
    { content: 'MySQL·NoSQL 데이터베이스 운영' },
    { content: 'Kafka 이벤트 처리로 쇼핑라이브 데이터 실시간 통합' },
    { content: 'Kubernetes 컨테이너 클러스터 운영' },
  ],
  skillKeywords: [
    'Java',
    'Spring Boot',
    'NCP',
    'Kubernetes',
    'Docker',
    'MySQL',
    'MongoDB',
    'Redis',
    'Kafka',
    'Jenkins',
  ],
};

const naver = {
  title: '네이버 (NAVER)',
  positions: [
    //
    naverAxTf,
    naverVerticalServer,
    naverNspa,
    naverShoppinglive,
  ],
};

const yanolja = {
  title: '야놀자 (Yanolja)',
  positions: [
    {
      title: 'R&D 그룹 CX 개발실 백엔드 개발자',
      startedAt: '2018-02',
      endedAt: '2021-02',
      descriptions: [
        { content: '국내·글로벌 숙박·레저 OTA (임직원 800명 이상, R&D 200명 이상)' },
        { content: '숙박·레저 정보와 예약 서비스의 데이터 모델링, BFF API 개발' },
        { content: '사용자 요구를 반영한 기능 개선과 신규 비즈니스 로직 구현' },
        { content: '레거시 정리와 기존 비즈니스 로직 유지보수' },
        { content: 'AWS 인프라와 NoSQL 데이터베이스 운영' },
        { content: 'Agile Scrum 스프린트 플래닝 관리' },
      ],
      skillKeywords: [
        'Node.js',
        'TypeScript',
        'Express.js',
        'ElastiCache',
        'ElasticBeanstalk',
        'CloudWatch',
        'Redis',
        'Jenkins',
        'BFF API',
        'ISMS',
        'Agile',
        'A/B Test',
      ],
    },
  ],
};

const plating = {
  title: '플레이팅 (Plating)',
  positions: [
    {
      title: '개발팀 백엔드 개발자',
      startedAt: '2016-10',
      endedAt: '2017-11',
      descriptions: [
        { content: '요식업·푸드테크 스타트업 (15~50명, 개발팀 2~6명)' },
        { content: '이커머스·물류 백엔드와 인프라 개발' },
        { content: '개발 프로젝트 관리' },
      ],
      skillKeywords: [
        'Node.js',
        'Express.js',
        'PHP',
        'Laravel',
        'EC2',
        'RDS',
        'CloudFront',
        'React.js',
        'Redux',
        'MySQL',
        'MongoDB',
        'Socket.io',
        'nginx',
        'Database Design',
        'Architecture',
        'DDD',
        'TDD',
      ],
    },
  ],
};

const ecubelabs = {
  title: '이큐브랩 (Ecube Labs)',
  positions: [
    {
      title: '소프트웨어 개발팀 서버 개발자',
      startedAt: '2015-07',
      endedAt: '2016-02',
      descriptions: [
        { content: 'IoT 하드웨어·소프트웨어 스타트업 (15~25명, 개발팀 8~10명)' },
        { content: "'도시 쓰레기량 관제 소프트웨어' 백엔드 개발" },
        { content: '인프라 설계와 보안 담당' },
        { content: 'AWS와 Agile 도입 검토·적용' },
      ],
      skillKeywords: [
        'PHP',
        'CodeIgniter',
        'Cafe24',
        'AWS',
        'MySQL',
        'Node.js',
        'Express.js',
        'Apache',
        'Security',
        'Infrastructure',
        'Database Design',
        'Architecture',
      ],
    },
  ],
};

const kyny = {
  title: '키니 (KYNY)',
  positions: [
    {
      title: '웹 개발자',
      startedAt: '2014-07',
      endedAt: '2015-04',
      descriptions: [
        { content: '가톨릭대학교 재학생 창업 지원 스타트업 (5명)' },
        { content: "'스포츠 경기 승률 계산 서비스' 기획과 개발" },
        { content: 'RDB 스키마 모델링, 백엔드 아키텍처 설계, 서버 인프라 구성' },
        { content: '자체 승률 계산 알고리즘으로 외부 데이터 정제' },
        { content: '클라이언트용 CRUD API 개발' },
      ],
      skillKeywords: ['PHP', 'WordPress', 'Ubuntu Linux', 'Apache2', 'MySQL'],
    },
  ],
};

const experience: ExperiencePayload = {
  showMoreCount: 3,
  disable: false,
  disableTotalPeriod: false,
  list: [naver, yanolja, plating, ecubelabs, kyny],
};

export default experience;
