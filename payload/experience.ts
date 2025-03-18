import { IExperience } from '../component/experience/IExperience';

const naverVerticalServer: IExperience.Position = {
  title: 'Shopping Product / ???',
  startedAt: '2025-04',
  descriptions: ['To Be Updated'],
  skillKeywords: ['???'],
};

const naverNspa: IExperience.Position = {
  title: 'Shopping Product / 쇼핑 앱 백엔드 개발자',
  startedAt: '2024-02',
  endedAt: '2025-04',
  descriptions: [
    '네이버 쇼핑 앱 BFF 백엔드 API 개발',
    '쇼핑앱 비즈니스에 필요한 주요 API 구현 및 데이터 모델 설계',
    'MySQL / NoSQL 데이터베이스 운영 및 Kubernetes 기반 인프라 아키텍처 구축',
    'Kafka 이벤트 핸들링을 통한 실시간 데이터 통합',
    '장애 방지 다중 방어 체계와 복구 전략 수립 및 적용',
    '코드 리뷰와 기술 스터디를 통한 팀 내 전문성 및 협업 역량 강화',
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

const naverShoppinglive: IExperience.Position = {
  title: 'Forest CIC / 쇼핑라이브 백엔드 개발자',
  startedAt: '2021-02',
  endedAt: '2024-02',
  descriptions: [
    '네이버 비디오커머스 서비스(쇼핑라이브) 백엔드 개발',
    '쇼핑라이브 라이브 방송 및 숏클립 서비스 제공을 위한 데이터 모델링 / API 개발',
    '사용자 Needs 에 맞는 사용성 개선과 신규 비즈니스 로직 구현',
    '레거시 청산 및 기존 비즈니스 유지보수',
    'MySQL / NoSQL 데이터베이스 유지보수 및 관리',
    'Kafka 이벤트 핸들링 및 쇼핑라이브 데이터 실시간 통합',
    'Kubernetes 기반 컨테이너 클러스터 유지보수 및 관리 ',
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

const naver: IExperience.Item = {
  title: '네이버 (NAVER)',
  positions: [
    //
    naverVerticalServer,
    naverNspa,
    naverShoppinglive,
  ],
};

const yanolja: IExperience.Item = {
  title: '야놀자 (Yanolja)',
  positions: [
    {
      title: 'R&D 그룹 CX 개발실 백엔드 개발자',
      startedAt: '2018-02',
      endedAt: '2021-02',
      descriptions: [
        '국내 및 글로벌 숙박/레저 OTA (800명~, R&D 200명~)',
        '숙박/레저 정보 및 예약서비스 제공에 필요한 데이터 모델링 및 BFF API 개발 ',
        '사용자 Needs 에 맞는 사용성 개선과 신규 비즈니스 로직 구현',
        '레거시 청산 및 기존 비즈니스 로직 유지보수',
        'AWS 인프라 및 NoSQL 데이터베이스 유지보수 및 관리',
        'Agile Scrum/Sprint Planning Management',
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

const plating: IExperience.Item = {
  title: '플레이팅 (Plating)',
  positions: [
    {
      title: '개발팀 백엔드 개발자',
      startedAt: '2016-10',
      endedAt: '2017-11',
      descriptions: [
        '요식업 / 푸드테크 스타트업 (15~50명, 개발팀 2~6명)',
        'E-Commerce, 물류 백엔드, 인프라 개발 등',
        'Development Project Management',
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

const ecubelabs: IExperience.Item = {
  title: '이큐브랩 (Ecube Labs)',
  positions: [
    {
      title: '소프트웨어 개발팀 서버 개발자',
      startedAt: '2015-07',
      endedAt: '2016-02',
      descriptions: [
        'IoT 하드웨어/소프트웨어 스타트업 (15~25, 개발팀 8~10명)',
        "'도시 쓰레기량 관제 소프트웨어' 백엔드 개발",
        '인프라 아키텍팅과 보안 담당',
        'AWS, Agile 등 연구 / 도입',
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

const kyny: IExperience.Item = {
  title: '키니 (KYNY)',
  positions: [
    {
      title: '웹 개발자',
      startedAt: '2014-07',
      endedAt: '2015-04',
      descriptions: [
        '가톨릭대학교 재학생 창업 지원 스타트업 (5명)',
        "'스포츠 경기 승률 계산 알고리즘 서비스' 비즈니스 기획 및 개발",
        'RDB Schema 모델링 및 백엔드 아키텍쳐, 서버 인프라 구축',
        '자체 승률 계산 알고리즘 통한 Third Party 데이터 정제',
        '클라이언트 사용 가능한 CRUD API 제공',
      ],
      skillKeywords: ['PHP', 'WordPress', 'Ubuntu Linux', 'Apache2', 'MySQL'],
    },
  ],
};

const experience: IExperience.Payload = {
  disable: false,
  disableTotalPeriod: false,
  list: [naver, yanolja, plating, ecubelabs, kyny],
};

export default experience;
