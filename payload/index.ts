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

import { ProfilePayload } from '../types/profile';
import { IntroducePayload } from '../types/introduce';
import { HighlightPayload } from '../types/highlight';
import { TestimonialPayload } from '../types/testimonial';
import { SkillPayload } from '../types/skill';
import { OpenSourcePayload } from '../types/open-source';
import { ExperiencePayload } from '../types/experience';
import { ProjectPayload } from '../types/project';
import { PresentationPayload } from '../types/presentation';
import { EducationPayload } from '../types/education';
import { EtcPayload } from '../types/etc';
import { FooterPayload } from '../types/footer';
import { GlobalPayload } from '../types/global';
import { ArticlePayload } from '../types/article';

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
