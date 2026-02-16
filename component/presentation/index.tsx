import { CommonSection } from '../common/CommonSection';
import PresentationRow from './row';
import { PresentationPayload } from '../../types/IPresentation';
import { Section } from '../common/Section';

type Payload = PresentationPayload;

export function PresentationSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      <PresentationContent payload={payload} />
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
