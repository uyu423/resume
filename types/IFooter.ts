import { CommonPayload } from './ICommon';

export interface FooterPayload extends CommonPayload {
  github: string;
  version: string;
}
