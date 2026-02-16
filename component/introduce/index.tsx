import { Row, Col, Badge } from 'reactstrap';
import { DateTime } from 'luxon';
import { Style } from '../common/Style';
import Util from '../common/Util';
import { IntroducePayload } from '../../types/IIntroduce';
import { Section } from '../common/Section';

type Payload = IntroducePayload;

export function IntroduceSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <IntroduceContent payload={data} />}
    </Section>
  );
}

function IntroduceContent({ payload }: { payload: Payload }) {
  const latestUpdated = DateTime.fromFormat(
    payload.latestUpdated,
    Util.LUXON_DATE_FORMAT.YYYY_LL_DD,
  );
  const latestUpdatedByNow = Math.floor(
    DateTime.local().diff(latestUpdated).milliseconds / 1000 / 60 / 60 / 24,
  );

  return (
    <div className="mt-5">
      <Row>
        <Col sm={12} md={3}>
          <h2 style={Style.blue}>INTRODUCE</h2>
        </Col>
        <Col sm={12} md={9}>
          {payload.contents.map((content, index) => (
            <p key={index.toString()}>{content}</p>
          ))}
          <p className="text-end">
            <small>Latest Updated</small>{' '}
            <Badge color="secondary">
              {`${latestUpdated.toFormat(
                Util.LUXON_DATE_FORMAT.YYYY_DOT_LL_DOT_DD,
              )} (D+${latestUpdatedByNow})`}
            </Badge>
          </p>
          <p className="text-end" style={Style.sign}>
            {payload.sign}
          </p>
        </Col>
      </Row>
    </div>
  );
}
