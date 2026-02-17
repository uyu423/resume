import { GlobalPayload } from '../types/global';

const favicon = '/favicon.ico';
const previewImage = '/preview_20240930.jpg';

const title = 'Resume: Yongwoo Yu';
const description = "This is Back-end Developer Yowu's Resume. Thank you";

export const _global: GlobalPayload = {
  favicon,
  headTitle: title,
  seo: {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: previewImage,
          width: 800,
          height: 600,
          alt: 'OpenGraph Preview Image',
        },
      ],
      type: 'profile',
      profile: {
        firstName: 'Yongwoo',
        lastName: 'Yu',
        username: 'luckyyowu',
        gender: 'male',
      },
    },
  },
  sectionOrder: [
    'introduce',
    'highlight',
    'experience',
    'project',
    'skill',
    'openSource',
    'presentation',
    'article',
    'education',
    'etc',
  ],
  jsonLd: {
    name: 'Yongwoo Yu',
    jobTitle: 'Backend Developer',
    worksFor: 'NAVER',
    url: 'https://resume.yowu.dev',
    sameAs: [
      'https://github.com/uyu423',
      'https://wiki.yowu.dev',
      'https://blog.yowu.dev',
    ],
    knowsAbout: ['Kotlin', 'Java', 'Spring Boot', 'Node.js', 'TypeScript', 'Kubernetes'],
  },
};
