import { Container } from 'reactstrap';

import Head from 'next/head';
import { EducationSection } from '../component/education';
import { EtcSection } from '../component/etc';
import { ExperienceSection } from '../component/experience';
import { FooterSection } from '../component/footer';
import { IntroduceSection } from '../component/introduce';
import { OpenSourceSection } from '../component/openSource';
import { PresentationSection } from '../component/presentation';
import { ProfileSection } from '../component/profile';
import { ProjectSection } from '../component/project';
import { SkillSection } from '../component/skill';
import { Style } from '../component/common/Style';
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
      </Head>
      <main>
        <Container style={Style.global}>
          <ProfileSection payload={Payload.profile} />
          <IntroduceSection payload={Payload.introduce} />
          <SkillSection payload={Payload.skill} />
          <ExperienceSection payload={Payload.experience} />
          <ProjectSection payload={Payload.project} />
          <OpenSourceSection payload={Payload.openSource} />
          <PresentationSection payload={Payload.presentation} />
          <ArticleSection payload={Payload.article} />
          <EducationSection payload={Payload.education} />
          <EtcSection payload={Payload.etc} />
          <FooterSection payload={Payload.footer} />
        </Container>
      </main>
    </>
  );
}

export default Yosume;
