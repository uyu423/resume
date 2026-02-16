import { PropsWithChildren } from 'react';
import { Row, Col } from 'reactstrap';
import { EmptyRowCol } from '.';
import { Style } from './Style';

export function CommonSection({ title, children }: PropsWithChildren<{ title: string }>) {
  const sectionId = `section-${title.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <section className="mt-5" aria-labelledby={sectionId}>
      <EmptyRowCol>
        <Row className="pb-3">
          <Col>
            <h2 id={sectionId} style={Style.blue}>
              <span>{title}</span>
            </h2>
          </Col>
        </Row>
        {children}
      </EmptyRowCol>
    </section>
  );
}
