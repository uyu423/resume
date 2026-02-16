import { Container } from 'reactstrap';

import Head from 'next/head';
import { Education } from '../component/education';
import { Etc } from '../component/etc';
import { Experience } from '../component/experience';
import { Footer } from '../component/footer';
import { Introduce } from '../component/introduce';
import { OpenSource } from '../component/openSource';
import { Presentation } from '../component/presentation';
import { Profile } from '../component/profile';
import { Project } from '../component/project';
import { Skill } from '../component/skill';
import { Style } from '../component/common/Style';
import Payload from '../payload';
import { Article } from '../component/article';

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
      <Container style={Style.global}>
        <Profile.Component payload={Payload.profile} />
        <Introduce.Component payload={Payload.introduce} />
        <Skill.Component payload={Payload.skill} />
        <Experience.Component payload={Payload.experience} />
        <Project.Component payload={Payload.project} />
        <OpenSource.Component payload={Payload.openSource} />
        <Presentation.Component payload={Payload.presentation} />
        <Article.Component payload={Payload.article} />
        <Education.Component payload={Payload.education} />
        <Etc.Component payload={Payload.etc} />
        <Footer.Component payload={Payload.footer} />
      </Container>
    </>
  );
}

export default Yosume;
