import { SkillPayload } from '../../types/skill';
import SkillRow, { createDots } from './row';
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
      <div className="skill-legend">
        <span className="skill-legend-item">{createDots(1)} Beginner</span>
        <span className="skill-legend-item">{createDots(2)} Intermediate</span>
        <span className="skill-legend-item">{createDots(3)} Expert</span>
      </div>
      {payload.skills.map((skill, index) => (
        <SkillRow key={index.toString()} skill={skill} index={index} />
      ))}
    </CommonSection>
  );
}
