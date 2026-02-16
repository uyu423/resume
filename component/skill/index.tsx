import { Row, Col, Tooltip } from 'reactstrap';
import { useState } from 'react';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Style } from '../common/Style';
import { ISkill } from '../../types/ISkill';
import SkillRow from './row';
import { EmptyRowCol } from '../common';
import { Section } from '../common/Section';

type Payload = ISkill.Payload;

export function SkillSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <SkillContent payload={data} />}
    </Section>
  );
}

function SkillContent({ payload }: { payload: Payload }) {
  return (
    <div className="mt-5">
      <EmptyRowCol>
        <Row className="pb-3">
          <Col>
            <h2>
              <span style={Style.blue}>SKILL</span>
              {payload.tooltip ? <SkillTooltip content={payload.tooltip} /> : ''}
            </h2>
          </Col>
        </Row>
        {payload.skills.map((skill, index) => (
          <SkillRow key={index.toString()} skill={skill} index={index} />
        ))}
      </EmptyRowCol>
    </div>
  );
}

function SkillTooltip({ content }: { content: string }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <small>
      {' '}
      <FontAwesomeIcon icon={faQuestionCircle} id="skill-tooltip" />
      <Tooltip
        style={{ whiteSpace: 'pre-wrap' }}
        placement="right"
        target="skill-tooltip"
        isOpen={tooltipOpen}
        toggle={toggle}
      >
        {content}
      </Tooltip>
    </small>
  );
}
