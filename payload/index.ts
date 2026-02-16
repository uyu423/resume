import profile from './profile';
import introduce from './introduce';
import highlight from './highlight';
import skill from './skill';
import experience from './experience';
import openSource from './openSource';
import project from './project';
import presentation from './presentation';
import education from './education';
import article from './article';
import testimonial from './testimonial';
import etc from './etc';
import footer from './footer';

import { _global } from './_global';

import { ProfilePayload } from '../types/IProfile';
import { IntroducePayload } from '../types/IIntroduce';
import { HighlightPayload } from '../types/IHighlight';
import { TestimonialPayload } from '../types/ITestimonial';
import { SkillPayload } from '../types/ISkill';
import { OpenSourcePayload } from '../types/IOpenSource';
import { ExperiencePayload } from '../types/IExperience';
import { ProjectPayload } from '../types/IProject';
import { PresentationPayload } from '../types/IPresentation';
import { EducationPayload } from '../types/IEducation';
import { EtcPayload } from '../types/IEtc';
import { FooterPayload } from '../types/IFooter';
import { GlobalPayload } from '../types/IGlobal';
import { ArticlePayload } from '../types/IArticle';

const Payload: Payload = {
  profile,
  introduce,
  highlight,
  skill,
  openSource,
  experience,
  project,
  presentation,
  article,
  testimonial,
  education,
  etc,
  footer,

  _global,
};

interface Payload {
  profile: ProfilePayload;
  introduce: IntroducePayload;
  highlight: HighlightPayload;
  skill: SkillPayload;
  openSource: OpenSourcePayload;
  experience: ExperiencePayload;
  project: ProjectPayload;
  presentation: PresentationPayload;
  education: EducationPayload;
  article: ArticlePayload;
  testimonial: TestimonialPayload;
  etc: EtcPayload;
  footer: FooterPayload;

  _global: GlobalPayload;
}

export default Payload;
