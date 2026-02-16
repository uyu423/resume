import { homepage, version } from '../package.json';

import { FooterPayload } from '../types/IFooter';

const footer: FooterPayload = {
  version,
  github: homepage,
};

export default footer;
