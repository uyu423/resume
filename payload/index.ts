import profile from './profile';
import introduce from './introduce';
import skill from './skill';
import experience from './experience';
import openSource from './openSource';
import project from './project';
import presentation from './presentation';
import education from './education';
import article from './article';
import etc from './etc';
import footer from './footer';

import { _global } from './_global';

import { IProfile } from '../types/IProfile';
import { IIntroduce } from '../types/IIntroduce';
import { ISkill } from '../types/ISkill';
import { IOpenSource } from '../types/IOpenSource';
import { IExperience } from '../types/IExperience';
import { IProject } from '../types/IProject';
import { IPresentation } from '../types/IPresentation';
import { IEducation } from '../types/IEducation';
import { IEtc } from '../types/IEtc';
import { IFooter } from '../types/IFooter';
import { IGlobal } from '../types/IGlobal';
import { IArticle } from '../types/IArticle';

const Payload: Payload = {
  profile,
  introduce,
  skill,
  openSource,
  experience,
  project,
  presentation,
  article,
  education,
  etc,
  footer,

  _global,
};

interface Payload {
  profile: IProfile.Payload;
  introduce: IIntroduce.Payload;
  skill: ISkill.Payload;
  openSource: IOpenSource.Payload;
  experience: IExperience.Payload;
  project: IProject.Payload;
  presentation: IPresentation.Payload;
  education: IEducation.Payload;
  article: IArticle.Payload;
  etc: IEtc.Payload;
  footer: IFooter.Payload;

  _global: IGlobal.Payload;
}

export default Payload;
