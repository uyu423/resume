import { Row, Col } from 'reactstrap';
import { SkillPayload } from '../../types/ISkill';
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
      <Row className="mb-3">
        <Col>
          <div
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.8rem',
              marginBottom: 'var(--space-md)',
            }}
          >
            <span style={{ marginRight: '12px' }}>
              {createDots(1)} Beginner
            </span>
            <span style={{ marginRight: '12px' }}>
              {createDots(2)} Intermediate
            </span>
            <span>{createDots(3)} Expert</span>
          </div>
        </Col>
      </Row>
      {payload.skills.map((skill, index) => (
        <SkillRow key={index.toString()} skill={skill} index={index} />
      ))}
    </CommonSection>
  );
}
