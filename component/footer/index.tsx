import { HrefTargetBlank } from '../common';
import { FooterPayload } from '../../types/IFooter';
import { Section } from '../common/Section';

type Payload = FooterPayload;

export function FooterSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      <FooterContent payload={payload} />
    </Section>
  );
}

function FooterContent({ payload }: { payload: Payload }) {
  return (
    <footer className="resume-footer">
      <small>
        v.{`${payload.version} / `}
        {/* Github 주소는 origin repository 의 주소를 넣는다. */}
        <HrefTargetBlank url="https://github.com/uyu423/resume-nextjs" text="Github" />
        {' / '}
        Thanks for <HrefTargetBlank url="https://blog.outsider.ne.kr/1234" text="Outsider" />
      </small>
    </footer>
  );
}
