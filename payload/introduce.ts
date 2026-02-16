import { IntroducePayload } from '../types/introduce';
import { latestUpdatedAt } from '../package.json';

const introduce: IntroducePayload = {
  disable: false,

  contents: [
    '웹/앱 서비스 백엔드 개발과 스타트업에서의 다양한 경험을 바탕으로, 현재는 대규모 커머스 서비스의 백엔드 개발을 담당하고 있습니다. Kotlin, Java, Spring Boot(WebFlux, Coroutine, Netty), Node.js 등을 주력으로 사용하며, MySQL, Redis, OpenSearch/Elasticsearch, Kafka, Kubernetes 기반 환경에서 확장성과 유지 보수성이 높은 아키텍처를 설계하고 운영한 경험이 있습니다. 특히 대규모 트래픽을 처리하는 과정에서 성능 최적화와 장애 대응 경험을 쌓으며 안정적인 서비스 운영에 기여해 왔습니다.',
    '오픈소스 프로젝트와 개발 커뮤니티 활동에도 꾸준히 참여하고 있습니다. 개인 프로젝트를 지속적으로 진행하며, 오랜 기간 운영해 온 블로그와 위키에는 400여 개 이상의 기술 포스트를 기록했습니다. 또한 외부 리뷰어와 멘토링 활동을 통해 다양한 개발자들과 경험을 나누며, 지식을 공유하는 과정 속에서 저 스스로도 성장해 왔습니다.',
    '백엔드 개발자로서 전문성을 계속 확장해 나가면서도, 팀과 조직과 함께 성장하는 개발자가 되고자 합니다. 서비스 개발은 결국 개발과 비즈니스의 긴밀한 커뮤니케이션 위에서 완성된다고 믿습니다. 적극적인 소통과 협력을 통해 문제를 해결하고 가치를 만들어내는 개발자가 되기 위해 끊임없이 학습하고 경험을 쌓고 있습니다.',
  ],
  sign: 'Yongwoo',
  // sign: packageJson.author.name,
  // latestUpdated: '2019-07-24',
  latestUpdated: latestUpdatedAt,
};

export default introduce;
