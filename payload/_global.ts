import { GlobalPayload } from '../types/global';

const favicon = '/favicon.ico';
const previewImage = '/preview.jpg';

// TODO: 실제 이력서 정보로 변경하세요
const title = 'Your Name | Web Resume';
const description = 'Experienced software engineer specializing in web development. View my interactive resume.';

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
          alt: 'Resume preview image',
        },
      ],
      type: 'profile',
      profile: {
        // TODO: 실제 이름으로 변경하세요
        firstName: 'Your',
        lastName: 'Name',
        username: 'yourname',
        gender: 'male',
      },
    },
  },
  // TODO: 실제 정보로 변경하세요
  jsonLd: {
    name: 'Your Name',
    jobTitle: 'Software Engineer',
    worksFor: 'Company Name',
    url: 'https://your-resume-url.com',
    sameAs: [
      'https://github.com/yourname',
      'https://linkedin.com/in/yourname',
    ],
    knowsAbout: ['TypeScript', 'React', 'Node.js'],
  },
};
