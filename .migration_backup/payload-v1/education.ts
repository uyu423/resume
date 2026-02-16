import { IEducation } from '../component/education/IEducation';

const education: IEducation.Payload = {
  disable: false,

  list: [
    {
      title: '가톨릭대학교',
      subTitle: '컴퓨터공학 / 정보시스템공학 복수 전공 학사 졸업',
      startedAt: '2010-03',
      endedAt: '2016-08',
    },
    {
      title: '안동 경일고등학교',
      subTitle: '자연계 졸업 (경상북도 안동시)',
      startedAt: '2007-03',
      endedAt: '2010-02',
    },
  ],
};

export default education;
