import { OpenSourcePayload } from '../../types/IOpenSource';
import OpenSourceRow from './row';
import { CommonSection } from '../common/CommonSection';
import { Section } from '../common/Section';

type Payload = OpenSourcePayload;

export function OpenSourceSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <OpenSourceContent payload={data} />}
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
