import { SkillPayload, SkillItem } from '../types/skill';

const backendLanguage: SkillItem = {
  category: 'Languages',
  items: [
    {
      title: 'Kotlin',
    },
    {
      title: 'Java',
    },
    {
      title: 'TypeScript',
    },
    {
      title: 'JavaScript',
    },
    {
      title: 'HTML/CSS',
    },
  ],
};

const frameworkLib: SkillItem = {
  category: 'Frameworks & Libraries',
  items: [
    {
      title: 'Spring Boot (WebFlux)',
    },
    {
      title: 'Node.js',
    },
    {
      title: 'Express.js',
    },
    {
      title: 'Next.js',
    },
    {
      title: 'React.js',
    },
    {
      title: 'Kotlin Coroutines',
    },
  ],
};

const infraDb: SkillItem = {
  category: 'Infrastructure & Databases',
  items: [
    {
      title: 'AWS',
    },
    {
      title: 'NCP',
    },
    {
      title: 'Kubernetes',
    },
    {
      title: 'Docker',
    },
    {
      title: 'nginx',
    },
    {
      title: 'Apache',
    },
    {
      title: 'Kafka',
    },
    {
      title: 'MySQL',
    },
    {
      title: 'Redis',
    },
    {
      title: 'MongoDB',
    },
    {
      title: 'OpenSearch',
    },
    {
      title: 'Linux',
    },
  ],
};

const ai: SkillItem = {
  category: 'AI',
  items: [
    {
      title: 'Claude Code',
    },
    {
      title: 'AI Agent Workflow',
    },
    {
      title: 'MCP',
    },
  ],
};

const toolIde: SkillItem = {
  category: 'Tools & IDEs',
  items: [
    {
      title: 'Vim',
    },
    {
      title: 'VS Code',
    },
    {
      title: 'IntelliJ IDEA',
    },
    {
      title: 'Git',
    },
    {
      title: 'GitHub',
    },
    {
      title: 'GitHub Actions',
    },
    {
      title: 'k6',
    },
    {
      title: 'Bitbucket',
    },
    {
      title: 'Jenkins',
    },
    {
      title: 'Jira',
    },
    {
      title: 'Confluence',
    },
  ],
};

const misc: SkillItem = {
  category: 'Misc',
  items: [
    {
      title: 'DevOps',
    },
    {
      title: 'Agile',
    },
    {
      title: 'HHKB',
    },
    {
      title: 'Drum',
    },
    {
      title: 'Electric Guitar',
    },
  ],
};

const skill: SkillPayload = {
  disable: false,
  skills: [backendLanguage, frameworkLib, infraDb, ai, toolIde, misc],
};

export default skill;
