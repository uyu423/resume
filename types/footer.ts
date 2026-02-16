import { CommonPayload } from './common';

export interface FooterPayload extends CommonPayload {
  github: string;
  version: string;
}
