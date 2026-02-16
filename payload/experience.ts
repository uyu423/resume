import { ExperiencePayload } from '../types/experience';

const experience: ExperiencePayload = {
  disable: false,
  disableTotalPeriod: false,
  list: [
    {
      title: 'Linux Foundation',
      positions: [
        {
          title: 'System Engineer',
          startedAt: '1996-05',
          descriptions: [
            { content: 'Steering Kernel patching and updates for various distributions' },
            { content: 'Automating deployment and integration processes for Linux servers' },
            { content: 'Spearheading initiatives to enhance Linux kernel security' },
            { content: 'Collaborating with global developers to coordinate code contributions' },
          ],
          skillKeywords: ['C', 'Linux', 'Kernel', 'Security', 'Automation'],
        },
        {
          title: 'System Engineer Intern',
          startedAt: '1996-02',
          endedAt: '1996-05',
          descriptions: [
            { content: 'Assisted senior engineers in maintaining and updating kernel patches for Linux distributions' },
            { content: 'Supported deployment and integration tasks for Linux server environments' },
            { content: 'Conducted research on Linux kernel security practices and presented findings to the team' },
          ],
          skillKeywords: ['C', 'Linux', 'Kernel', 'Support', 'Research'],
        },
      ],
    },
    {
      title: 'Open Source Community',
      positions: [
        {
          title: 'System Advocate and Developer',
          startedAt: '2010-06',
          endedAt: '2018-01',
          descriptions: [
            { content: 'Promoted the use and development of Linux globally.' },
            { content: 'Developed automated scripts to streamline system configuration.' },
            { content: 'Facilitated live patching systems, reducing downtime.' },
          ],
          skillKeywords: ['Open Source', 'Linux', 'AWS', 'RDBMS'],
        },
      ],
    },
  ],
};

export default experience;
