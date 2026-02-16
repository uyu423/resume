import { SkillPayload } from '../../types/skill';
import SkillRow from './row';
import { Section } from '../common/Section';
import { CommonSection } from '../common/CommonSection';

type Payload = SkillPayload;

export function SkillSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      <SkillContent payload={payload} />
    </Section>
  );
}

function SkillContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="SKILL">
      {payload.skills.map((skill, index) => (
        <SkillRow key={index.toString()} skill={skill} index={index} />
      ))}
    </CommonSection>
  );
}
