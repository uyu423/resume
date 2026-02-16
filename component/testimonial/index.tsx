import { CSSProperties } from 'react';
import { Row, Col } from 'reactstrap';
import { Section } from '../common/Section';
import { CommonSection } from '../common/CommonSection';
import { TestimonialPayload, TestimonialItem } from '../../types/ITestimonial';

type Payload = TestimonialPayload;

export function TestimonialSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <TestimonialContent payload={data} />}
    </Section>
  );
}

function TestimonialContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="TESTIMONIAL">
      <Row>
        {payload.list.map((item, index) => (
          <Col md={6} xs={12} key={index.toString()} className="mb-4">
            <TestimonialCard item={item} />
          </Col>
        ))}
      </Row>
    </CommonSection>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const cardStyle: CSSProperties = {
    background: 'var(--color-bg-subtle)',
    borderRadius: '12px',
    padding: '32px',
    height: '100%',
    position: 'relative',
  };

  const quoteMarkStyle: CSSProperties = {
    fontSize: '4rem',
    color: 'var(--color-accent)',
    opacity: 0.2,
    position: 'absolute',
    top: '8px',
    left: '16px',
    fontFamily: 'Georgia, serif',
    lineHeight: 1,
  };

  const quoteStyle: CSSProperties = {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.8,
    color: 'var(--color-text)',
    position: 'relative',
    zIndex: 1,
  };

  const authorStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
    gap: '12px',
  };

  const avatarStyle: CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
    background: 'var(--color-bg-highlight)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-accent)',
    fontWeight: 600,
    fontSize: '1.1rem',
    flexShrink: 0,
  };

  const initial = item.name.charAt(0);

  return (
    <div className="testimonial-card" style={cardStyle}>
      <span style={quoteMarkStyle}>{'\u201C'}</span>
      <div style={quoteStyle}>{item.quote}</div>
      <div style={authorStyle}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            style={{ ...avatarStyle, background: 'none' }}
          />
        ) : (
          <div style={avatarStyle}>{initial}</div>
        )}
        <div>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.95rem' }}>
            {item.name}
          </div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            {item.title}
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
            {item.relation}
          </div>
        </div>
      </div>
    </div>
  );
}
