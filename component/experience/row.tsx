import { Badge, Col, Row } from 'reactstrap';

import { DateTime } from 'luxon';
import { ExperienceItem, ExperiencePosition } from '../../types/IExperience';
import { Style } from '../common/Style';
import Util from '../common/Util';

type PositionWithDates = ExperiencePosition & {
  startedAtDate: DateTime;
  endedAtDate: DateTime | null;
  isCurrent: boolean;
};

function hasEndedAtDate(
  position: PositionWithDates,
): position is PositionWithDates & { endedAtDate: DateTime } {
  return position.endedAtDate !== null;
}

export default function ExperienceRow({
  item,
  index,
}: { item: ExperienceItem; index: number }) {
  const positionsWithDates: PositionWithDates[] = item.positions.map((position) => ({
    ...position,
    startedAtDate: DateTime.fromFormat(position.startedAt, Util.LUXON_DATE_FORMAT.YYYY_LL),
    endedAtDate: position.endedAt
      ? DateTime.fromFormat(position.endedAt, Util.LUXON_DATE_FORMAT.YYYY_LL)
      : null,
    isCurrent: !position.endedAt,
  }));

  const sortedPositions = positionsWithDates
    .slice()
    .sort((a, b) => b.startedAtDate.toMillis() - a.startedAtDate.toMillis());

  const minStartedAt = DateTime.min(...sortedPositions.map((position) => position.startedAtDate)) ?? DateTime.local();
  const isCurrentlyEmployed = sortedPositions.some((position) => position.isCurrent);

  const endedAtDates = sortedPositions
    .filter(hasEndedAtDate)
    .map((position) => position.endedAtDate);

  let maxEndedAt: DateTime<boolean>;
  if (isCurrentlyEmployed) {
    maxEndedAt = DateTime.local();
  } else if (endedAtDates.length > 0) {
    maxEndedAt = DateTime.max(...endedAtDates) ?? DateTime.local();
  } else {
    maxEndedAt = DateTime.local();
  }

  const periodTitle = createOverallWorkingPeriod(sortedPositions);
  const hasMultiplePositions = sortedPositions.length > 1;

  return (
    <div className="experience-item">
      {index > 0 && <hr />}
      {/* 최상위 Row: 전체 재직 기간과 회사명 표시 */}
      <Row>
        <Col sm={12} md={3} className="text-md-end">
          <h4 style={Style.gray}>{periodTitle}</h4>
        </Col>
        <Col sm={12} md={9}>
          <h4 style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isCurrentlyEmployed ? 'var(--color-success)' : 'var(--color-accent)',
                marginRight: '8px',
                boxShadow: isCurrentlyEmployed
                  ? '0 0 0 4px rgba(16, 185, 129, 0.2)'
                  : 'none',
              }}
            />
            {item.title}{' '}
            <span style={{ fontSize: '65%', display: 'inline-flex', alignItems: 'center' }}>
              {isCurrentlyEmployed && (
                <span
                  style={{
                    background: 'var(--color-success)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    marginLeft: '4px',
                  }}
                >
                  재직 중
                </span>
              )}
              <span
                style={{
                  background: 'var(--color-bg-highlight)',
                  color: 'var(--color-info)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  marginLeft: '4px',
                }}
              >
                {Util.getFormattingDuration(minStartedAt, maxEndedAt)}
              </span>
            </span>
          </h4>
        </Col>
      </Row>

      {/* 각 Position을 최신 순으로 반복하여 개별 재직 기간과 직책 표시 */}
      {sortedPositions.map((position, posIndex) => (
        <Row key={posIndex.toString()} className="mt-2">
          <Col sm={12} md={3} className="text-md-end">
            {/* positions가 1개 이상일 때만 Position의 재직 기간 표시 */}
            {hasMultiplePositions && (
              <span style={Style.gray}>
                {createWorkingPeriod(position.startedAtDate, position.endedAtDate)}
              </span>
            )}
          </Col>
          <Col sm={12} md={9}>
            <i style={Style.gray}>{position.title}</i>
            <ul className="pt-2">
              {position.descriptions.map((description, descIndex) => (
                <li key={descIndex.toString()}>{description.content}</li>
              ))}
              {createSkillKeywords(position.skillKeywords)}
            </ul>
          </Col>
        </Row>
      ))}
    </div>
  );
}

function createOverallWorkingPeriod(positions: PositionWithDates[]) {
  const DATE_FORMAT = Util.LUXON_DATE_FORMAT.YYYY_DOT_LL;
  const startedAt = positions[positions.length - 1].startedAtDate;
  const isCurrentlyEmployed = positions.some((position) => position.isCurrent);

  // 재직 중일 때는 종료일 없이 표시
  if (isCurrentlyEmployed) {
    return `${startedAt.toFormat(DATE_FORMAT)} ~`;
  }

  const endedAtDates = positions.filter(hasEndedAtDate).map((position) => position.endedAtDate);

  let endedAt: DateTime<boolean>;
  if (endedAtDates.length > 0) {
    endedAt = DateTime.max(...endedAtDates) ?? DateTime.local();
  } else {
    endedAt = DateTime.local();
  }

  return `${startedAt.toFormat(DATE_FORMAT)} ~ ${endedAt.toFormat(DATE_FORMAT)}`;
}

function createSkillKeywords(skillKeywords?: string[]) {
  if (!skillKeywords) {
    return null;
  }
  return (
    <li>
      <strong>Skill Keywords</strong>
      <div>
        {skillKeywords.map((keyword, index) => (
          <Badge
            key={index.toString()}
            color=""
            style={{
              background: 'var(--color-bg-highlight)',
              color: 'var(--color-accent)',
              border: '1px solid var(--color-accent)',
              fontSize: '0.75rem',
              fontWeight: 400,
              padding: '2px 10px',
              borderRadius: '4px',
              marginRight: '4px',
              marginBottom: '4px',
            }}
          >
            {keyword}
          </Badge>
        ))}
      </div>
    </li>
  );
}

function createWorkingPeriod(startedAt: DateTime, endedAt?: DateTime | null) {
  const DATE_FORMAT = Util.LUXON_DATE_FORMAT.YYYY_DOT_LL;

  if (!endedAt) {
    return `${startedAt.toFormat(DATE_FORMAT)} ~`;
  }

  return `${startedAt.toFormat(DATE_FORMAT)} ~ ${endedAt.toFormat(DATE_FORMAT)}`;
}
