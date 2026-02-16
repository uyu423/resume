import { Row, Col, Badge } from 'reactstrap';
import { CSSProperties } from 'react';
import { Section } from '../common/Section';
import { HighlightPayload, HighlightItem } from '../../types/IHighlight';

type Payload = HighlightPayload;

const titleStyle: CSSProperties = {
  fontWeight: 600,
  color: 'var(--color-primary)',
  fontSize: '1.1rem',
  marginBottom: 'var(--space-sm)',
};

const descriptionStyle: CSSProperties = {
  fontWeight: 300,
  color: 'var(--color-text)',
  fontSize: '0.95rem',
  marginBottom: 'var(--space-md)',
  lineHeight: 1.6,
};

export function HighlightSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      <HighlightContent payload={payload} />
    </Section>
  );
}

function HighlightContent({ payload }: { payload: Payload }) {
  return (
    <div
      className="mt-5"
      style={{
        background: 'var(--color-bg-subtle)',
        padding: 'var(--space-xl) 0',
        marginLeft: '-15px',
        marginRight: '-15px',
        paddingLeft: '15px',
        paddingRight: '15px',
      }}
    >
      <Row>
        {payload.list.map((item, index) => (
          <Col lg={4} md={6} xs={12} key={index.toString()} className="mb-3">
            <HighlightCard item={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function HighlightCard({ item }: { item: HighlightItem }) {
  const cardStyle: CSSProperties = {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderLeft: '3px solid var(--color-accent)',
    borderRadius: '0 8px 8px 0',
    padding: 'var(--space-lg)',
    height: '100%',
  };

  return (
    <div
      className="highlight-card"
      style={cardStyle}
    >
      <div style={titleStyle}>{item.title}</div>
      <div style={descriptionStyle}>{item.description}</div>
      {item.keywords && item.keywords.length > 0 && (
        <div>
          {item.keywords.map((keyword, idx) => (
            <Badge
              key={idx.toString()}
              color=""
              style={{
                background: 'var(--color-bg-highlight)',
                color: 'var(--color-accent)',
                border: '1px solid var(--color-accent)',
                fontWeight: 400,
                fontSize: '0.75rem',
                padding: '2px 10px',
                borderRadius: '4px',
                marginRight: '4px',
                marginTop: '4px',
              }}
            >
              {keyword}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
