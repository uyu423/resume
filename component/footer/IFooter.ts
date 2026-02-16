import { ICommon } from '../common/ICommon';

export declare namespace IFooter {
  export interface Payload extends ICommon.Payload {
    github: string;
    version: string;
  }
}
