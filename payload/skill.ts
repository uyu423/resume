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
      title: 'javascript',
    },
    {
      title: 'HTML/CSS',
    },
  ],
};

const frameworkLib: SkillItem = {
  category: 'Fameworks & Libraries',
  items: [
    {
      title: 'Spring Boot',
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
      title: 'Coroutine',
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
      title: 'Linux',
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
      title: 'IDEA',
    },
    {
      title: 'Git',
    },
    {
      title: 'Github',
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
  skills: [backendLanguage, frameworkLib, infraDb, toolIde, misc],
};

export default skill;
