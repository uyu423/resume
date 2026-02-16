import { CommonSection } from '../common/CommonSection';
import PresentationRow from './row';
import { IPresentation } from '../../types/IPresentation';
import { Section } from '../common/Section';

type Payload = IPresentation.Payload;

export function PresentationSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <PresentationContent payload={data} />}
    </Section>
  );
}

function PresentationContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="PRESENTATION">
      <PresentationRow payload={payload} />
    </CommonSection>
  );
}
