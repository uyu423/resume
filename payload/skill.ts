import { ISkill } from '../component/skill/ISkill';

const backendLanguage: ISkill.Skill = {
  category: 'Languages',
  items: [
    {
      title: 'Java',
      level: 3,
    },
    {
      title: 'TypeScript',
      level: 3,
    },
    {
      title: 'javascript',
      level: 2,
    },
    {
      title: 'HTML/CSS',
      level: 2,
    },
    {
      title: 'Kotlin',
      level: 1,
    },
  ],
};

const kernelDevelopment: ISkill.Skill = {
  category: 'Kernel Development',
  items: [
    {
      title: 'PHP',
      level: 1,
    },
    {
      title: 'GNU Debugger',
      level: 3,
    },
    {
      title: 'Memory Management',
      level: 2,
    },
    {
      title: 'System Call Interface',
      level: 2,
    },
  ],
};

const frameworkLib: ISkill.Skill = {
  category: 'Fameworks & Libraries',
  items: [
    {
      title: 'Node.js',
      level: 3,
    },
    {
      title: 'Express.js',
      level: 3,
    },
    {
      title: 'Spring Boot',
      level: 3,
    },
    {
      title: 'Nest.js',
      level: 2,
    },
    {
      title: 'Next.js',
      level: 2,
    },
    {
      title: 'React.js',
      level: 2,
    },
    {
      title: 'CodeIgniter',
      level: 1,
    },
  ],
};

const infraDb: ISkill.Skill = {
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
  ],
};

const toolIde: ISkill.Skill = {
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
      title: 'Joke Telling',
    },
    {
      title: 'Duct Tape Crafting',
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
      title: 'CircleCI',
    },
  ],
};

const misc: ISkill.Skill = {
  category: 'Misc',
  items: [
    {
      title: 'Linux',
    },
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
  ],
};

const skill: ISkill.Payload = {
  disable: false,
  skills: [backendLanguage, frameworkLib, infraDb, toolIde, misc],
  tooltip: '1: 기초 수준\n2: 취미 개발 수준\n3: Production 개발 가능 수준',
};

export default skill;
