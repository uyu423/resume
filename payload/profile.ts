import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

import { faBell } from '@fortawesome/free-regular-svg-icons';
import { ProfilePayload } from '../types/IProfile';

const image = '/sample_tux.png';

const profile: ProfilePayload = {
  disable: false,

  // image: 'https://resume.yowu.dev/static/image/profile_2019.png',
  image,
  name: {
    title: 'Tux Linux Penguin',
    small: '(Tux)',
  },
  contact: [
    {
      title: 'tux@linux.org',
      link: 'mailto:tux@linux.org',
      icon: faEnvelope,
    },
    {
      title: 'Please contact me by email',
      icon: faPhone,
      badge: true,
    },
    {
      link: 'https://github.com/uyu423/resume-nextjs',
      icon: faGithub,
    },
    {
      link: 'https://www.facebook.com/groups/ubuntu.ko',
      icon: faFacebook,
    },
  ],
  notice: {
    title:
      "The content below is all fictitious and is just a sample from 'https://github.com/uyu423/resume-nextjs'.",
    icon: faBell,
  },
  tagline: 'Open Source Enthusiast | Full Stack Developer',
  headings: [
    { value: '5+', label: 'Years of Experience' },
    { value: '10+', label: 'Projects Completed' },
    { value: '1K+', label: 'GitHub Contributions' },
  ],
  ctas: [
    {
      label: 'Email Me',
      link: 'mailto:tux@linux.org',
      icon: faEnvelope,
      variant: 'primary',
    },
    {
      label: 'GitHub',
      link: 'https://github.com/uyu423/resume-nextjs',
      icon: faGithub,
      variant: 'secondary',
    },
  ],
};

export default profile;
