import { Fragment, ReactNode } from 'react';
import Head from 'next/head';
import { EducationSection } from '../component/education';
import { EtcSection } from '../component/etc';
import { ExperienceSection } from '../component/experience';
import { FooterSection } from '../component/footer';
import { HighlightSection } from '../component/highlight';
import { IntroduceSection } from '../component/introduce';
import { TestimonialSection } from '../component/testimonial';
import { OpenSourceSection } from '../component/openSource';
import { PresentationSection } from '../component/presentation';
import { ProfileSection } from '../component/profile';
import { ProjectSection } from '../component/project';
import { SkillSection } from '../component/skill';
import { FloatingNav } from '../component/nav/FloatingNav';
import { DarkModeToggle } from '../component/common/DarkModeToggle';
import { PrintButton } from '../component/common/PrintButton';
import Payload from '../payload';
import { ArticleSection } from '../component/article';
import { SectionKey } from '../types/global';

/** 섹션 키 → ReactNode 매핑 */
const SECTION_MAP: Record<SectionKey, ReactNode> = {
  highlight: <HighlightSection payload={Payload.highlight} />,
  experience: <ExperienceSection payload={Payload.experience} />,
  project: <ProjectSection payload={Payload.project} />,
  skill: <SkillSection payload={Payload.skill} />,
  openSource: <OpenSourceSection payload={Payload.openSource} />,
  presentation: <PresentationSection payload={Payload.presentation} />,
  article: <ArticleSection payload={Payload.article} />,
  education: <EducationSection payload={Payload.education} />,
  testimonial: <TestimonialSection payload={Payload.testimonial} />,
  introduce: <IntroduceSection payload={Payload.introduce} />,
  etc: <EtcSection payload={Payload.etc} />,
};

/** 기본 섹션 순서 (Profile, Footer 제외) */
const DEFAULT_SECTION_ORDER: SectionKey[] = [
  'highlight',
  'experience',
  'project',
  'skill',
  'openSource',
  'presentation',
  'article',
  'education',
  'testimonial',
  'introduce',
  'etc',
];

/**
 * 최종 섹션 순서를 계산한다.
 * customOrder에 없는 섹션은 기본 순서대로 뒤에 추가된다.
 */
function getSectionOrder(customOrder?: SectionKey[]): SectionKey[] {
  if (!customOrder || customOrder.length === 0) return DEFAULT_SECTION_ORDER;
  const unique = [...new Set(customOrder)];
  const remaining = DEFAULT_SECTION_ORDER.filter((key) => !unique.includes(key));
  return [...unique, ...remaining];
}

function Yosume() {
  const { seo } = Payload._global;
  const sectionOrder = getSectionOrder(Payload._global.sectionOrder);

  return (
    <>
      <Head>
        <title>{Payload._global.headTitle}</title>
        <link rel="shortcut icon" href={Payload._global.favicon} />
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.openGraph?.title && <meta property="og:title" content={seo.openGraph.title} />}
        {seo.openGraph?.description && (
          <meta property="og:description" content={seo.openGraph.description} />
        )}
        {seo.openGraph?.type && <meta property="og:type" content={seo.openGraph.type} />}
        {seo.openGraph?.images?.[0]?.url && (
          <meta property="og:image" content={seo.openGraph.images[0].url} />
        )}
        {seo.openGraph?.profile?.firstName && (
          <meta property="profile:first_name" content={seo.openGraph.profile.firstName} />
        )}
        {seo.openGraph?.profile?.lastName && (
          <meta property="profile:last_name" content={seo.openGraph.profile.lastName} />
        )}
        {seo.openGraph?.profile?.username && (
          <meta property="profile:username" content={seo.openGraph.profile.username} />
        )}
        {Payload._global.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ProfilePage',
                mainEntity: {
                  '@type': 'Person',
                  name: Payload._global.jsonLd.name,
                  jobTitle: Payload._global.jsonLd.jobTitle,
                  worksFor: {
                    '@type': 'Organization',
                    name: Payload._global.jsonLd.worksFor,
                  },
                  url: Payload._global.jsonLd.url,
                  ...(Payload._global.jsonLd.sameAs && { sameAs: Payload._global.jsonLd.sameAs }),
                  ...(Payload._global.jsonLd.knowsAbout && { knowsAbout: Payload._global.jsonLd.knowsAbout }),
                },
              }).replace(/</g, '\\u003c'),
            }}
          />
        )}
      </Head>
      <FloatingNav />
      <DarkModeToggle />
      <PrintButton />
      <main>
        <div className="resume-container">
          <ProfileSection payload={Payload.profile} />
          {sectionOrder.map((key) => (
            <Fragment key={key}>{SECTION_MAP[key]}</Fragment>
          ))}
          <FooterSection payload={Payload.footer} />
        </div>
      </main>
    </>
  );
}

export default Yosume;
