import { Section } from '../common/Section';
import { ArticlePayload } from '../../types/IArticle';
import { EmptyRowCol } from '../common';
import { CommonSection } from '../common/CommonSection';
import { CommonDescription } from '../common/CommonDescription';
import Util from '../common/Util';

type Payload = ArticlePayload;

export function ArticleSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <ArticleContent payload={data} />}
    </Section>
  );
}

function ArticleContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="ARTICLE">
      <ArticleRow payload={payload} />
    </CommonSection>
  );
}

function ArticleRow({ payload }: { payload: Payload }) {
  const log = Util.debug('ArticleRow');

  log(payload);

  return (
    <EmptyRowCol>
      <CommonDescription descriptions={payload.list} />
    </EmptyRowCol>
  );
}
