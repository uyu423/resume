import { IntroducePayload } from '../types/introduce';
import { latestUpdatedAt } from '../package.json';

const introduce: IntroducePayload = {
  disable: false,

  contents: [
    '소규모 스타트업부터 대규모 커머스 서비스 조직까지 여러 조직에서 10년 이상 백엔드 개발을 하고 있습니다. 현재는 네이버 쇼핑에서 버티컬 서비스의 BFF와 전시 백엔드 개발을 맡고 있습니다. 다양한 규모의 환경에서 확장성과 유지보수성이 높은 아키텍처를 설계하고 운영한 경험이 있습니다.',
    '오픈소스 프로젝트와 개발 커뮤니티 활동에도 꾸준히 참여하고 있습니다. AI 에이전트로 개발자 도구와 MCP 서버 같은 개인 프로젝트를 직접 만들어 공개하고 있습니다. 오랜 기간 운영해 온 블로그와 위키에는 400개가 넘는 포스트를 작성했습니다. 부스트캠프 리뷰어와 기타 멘토링 활동으로 여러 개발자와 경험을 나누며 스스로도 성장해 왔습니다.',
    '백엔드 개발자로서 전문성을 계속 넓혀 나가면서도 팀, 조직과 함께 성장하는 개발자가 되고자 합니다. 서비스 개발은 결국 개발과 비즈니스의 긴밀한 커뮤니케이션 위에서 완성된다고 믿습니다. AI 에이전트 시대에는 요구사항 구현보다 무엇을 만들지 정하는 일이 더 중요해진다고 생각합니다. 적극적으로 소통하고 협력해 문제 정의부터 출시와 검증까지 책임지는 Product Engineer로 성장하고 있습니다.',
  ],
  sign: 'Yongwoo',
  // sign: packageJson.author.name,
  // latestUpdated: '2019-07-24',
  latestUpdated: latestUpdatedAt,
};

export default introduce;
