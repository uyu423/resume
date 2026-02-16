import { homepage, version } from '../package.json';

import { FooterPayload } from '../types/footer';

const footer: FooterPayload = {
  version,
  github: homepage,
};

export default footer;
