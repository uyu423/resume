import { OpenSourcePayload } from '../../types/open-source';
import OpenSourceRow from './row';
import { CommonSection } from '../common/CommonSection';
import { Section } from '../common/Section';

type Payload = OpenSourcePayload;

export function OpenSourceSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      <OpenSourceContent payload={payload} />
    </Section>
  );
}

function OpenSourceContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="OPEN SOURCE">
      <OpenSourceRow payload={payload} />
    </CommonSection>
  );
}
