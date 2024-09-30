import { faEnvelope, faPen, faPhone, faRss } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

import { IProfile } from '../component/profile/IProfile';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import image from '../asset/20240930-5.png';

const profile: IProfile.Payload = {
  disable: false,

  // image: 'https://resume.yowu.dev/static/image/profile_2019.png',
  image,
  name: {
    title: '유용우',
    small: '(요우)',
  },
  contact: [
    {
      title: 'me@yowu.dev',
      link: 'mailto:me@yowu.dev',
      icon: faEnvelope,
    },
    {
      title: 'Please contact me by email',
      icon: faPhone,
      badge: true,
    },
    {
      link: 'https://wiki.yowu.dev',
      icon: faPen,
    },
    {
      link: 'https://github.com/uyu423',
      icon: faGithub,
    },
    {
      link: 'https://fb.com/luckyyowu',
      icon: faFacebook,
    },
    {
      link: 'https://blog.yowu.dev',
      icon: faRss,
    },
  ],
  notice: {
    title: '휴대전화나 페이스북 메시지 아닌 이메일로 연락 부탁드립니다.',
    icon: faBell,
  },
};

export default profile;
