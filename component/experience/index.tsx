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
      <ExperienceContent payload={payload} />
    </Section>
  );
}

function ExperienceContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="EXPERIENCE">
      {!payload.disableTotalPeriod && (
        <div className="split-row experience-summary-row">
          <div className="split-left">
            <span className="experience-summary-label">TOTAL</span>
          </div>
          <div className="experience-total-period">
            <span className="tag tag--muted">{getFormattingExperienceTotalDuration(payload)}</span>
          </div>
        </div>
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
