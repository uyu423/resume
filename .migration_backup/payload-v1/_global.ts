import { IGlobal } from '../component/common/IGlobal';
import favicon from '../asset/favicon.ico';
import previewImage from '../asset/preview_20240930.jpg';

const title = 'Resume: Yongwoo Yu';
const description = "This is Back-end Developer Yowu's Resume. Thank you";

export const _global: IGlobal.Payload = {
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
};
