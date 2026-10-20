import { IntroducePayload } from '../types/introduce';
import { latestUpdatedAt } from '../package.json';

const introduce: IntroducePayload = {
  disable: false,

  contents: [
    '웹·앱 서비스 백엔드 개발과 여러 스타트업에서 쌓은 경험을 바탕으로, 현재는 대규모 커머스 서비스의 백엔드 개발을 담당하고 있습니다. Kotlin(Coroutine), Java, Spring Boot(WebFlux, Netty), Node.js 등을 주력으로 사용합니다. MySQL, Redis, OpenSearch/Elasticsearch, Kafka, Kubernetes 기반 환경에서 확장성과 유지보수성이 높은 아키텍처를 설계하고 운영해 왔습니다. 대규모 트래픽을 처리하면서 성능 최적화와 장애 대응 경험을 쌓았습니다. 최근에는 출시 전 성능 검증에 쓰는 분산 부하 테스트 플랫폼과 AI 코드 리뷰 도구를 직접 만들어 운영하고 있습니다. 두 도구 모두 여러 조직이 함께 씁니다.',
    '오픈소스 프로젝트와 개발 커뮤니티 활동에도 꾸준히 참여하고 있습니다. 개인 프로젝트도 계속 진행합니다. 오랜 기간 운영해 온 블로그와 위키에는 400개가 넘는 기술 포스트를 남겼습니다. 외부 리뷰어와 멘토링 활동으로 여러 개발자와 경험을 나누며 저 스스로도 성장해 왔습니다.',
    '백엔드 개발자로서 전문성을 계속 넓혀 나가면서도 팀, 조직과 함께 성장하는 개발자가 되고자 합니다. 서비스 개발은 결국 개발과 비즈니스의 긴밀한 커뮤니케이션 위에서 완성된다고 믿습니다. 적극적으로 소통하고 협력해 문제를 해결하고 가치를 만들어 내는 개발자가 되려고 꾸준히 배우고 경험을 쌓고 있습니다.',
  ],
  sign: 'Yongwoo',
  // sign: packageJson.author.name,
  // latestUpdated: '2019-07-24',
  latestUpdated: latestUpdatedAt,
};

export default introduce;
