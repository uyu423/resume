import { Container } from 'reactstrap';

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
import { Style } from '../component/common/Style';
import { FloatingNav } from '../component/nav/FloatingNav';
import { DarkModeToggle } from '../component/common/DarkModeToggle';
import Payload from '../payload';
import { ArticleSection } from '../component/article';

function Yosume() {
  const { seo } = Payload._global;
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
              }),
            }}
          />
        )}
      </Head>
      <FloatingNav />
      <DarkModeToggle />
      <main>
        <Container style={Style.global}>
          <ProfileSection payload={Payload.profile} />
          <HighlightSection payload={Payload.highlight} />
          <ExperienceSection payload={Payload.experience} />
          <ProjectSection payload={Payload.project} />
          <SkillSection payload={Payload.skill} />
          <OpenSourceSection payload={Payload.openSource} />
          <PresentationSection payload={Payload.presentation} />
          <ArticleSection payload={Payload.article} />
          <EducationSection payload={Payload.education} />
          <TestimonialSection payload={Payload.testimonial} />
          <IntroduceSection payload={Payload.introduce} />
          <EtcSection payload={Payload.etc} />
          <FooterSection payload={Payload.footer} />
        </Container>
      </main>
    </>
  );
}

export default Yosume;
