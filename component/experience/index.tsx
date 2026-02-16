import { Badge, Col, Row } from 'reactstrap';
import { DateTime, Duration } from 'luxon';

import { CommonSection } from '../common/CommonSection';
import ExperienceRow from './row';
import { ExperiencePayload, ExperienceItem, ExperiencePosition } from '../../types/IExperience';
import { Section } from '../common/Section';
import Util from '../common/Util';

type Payload = ExperiencePayload;

export function ExperienceSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <ExperienceContent payload={data} />}
    </Section>
  );
}

function ExperienceContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="EXPERIENCE">
      {!payload.disableTotalPeriod && (
        <Row className="mb-3">
          <Col>
            <Badge
              style={{
                background: 'var(--color-bg-highlight)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: '4px 12px',
                borderRadius: '4px',
              }}
            >
              {getFormattingExperienceTotalDuration(payload)}
            </Badge>
          </Col>
        </Row>
      )}
      {payload.list.map((item, index) => (
        <ExperienceRow key={index.toString()} item={item} index={index} />
      ))}
    </CommonSection>
  );
}

function getFormattingExperienceTotalDuration(payload: ExperiencePayload) {
  const durations = payload.list.reduce((acc: Duration[], item: ExperienceItem) => {
    const itemDurations = item.positions.map((position: ExperiencePosition) => {
      const endedAt = position.endedAt
        ? DateTime.fromFormat(position.endedAt, Util.LUXON_DATE_FORMAT.YYYY_LL)
        : DateTime.local();
      const startedAt = DateTime.fromFormat(position.startedAt, Util.LUXON_DATE_FORMAT.YYYY_LL);
      return endedAt.diff(startedAt);
    });
    return acc.concat(itemDurations); // 중첩된 배열 평탄화
  }, []);

  const totalExperience = durations.reduce(
    (prev: Duration, cur: Duration) => prev.plus(cur),
    Duration.fromMillis(0),
  );

  return totalExperience.toFormat(`총 ${Util.LUXON_DATE_FORMAT.DURATION_KINDNESS}`);
}
