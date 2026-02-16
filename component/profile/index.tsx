import { Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileContact from './contact';
import ProfileImage from './image';
import { ProfilePayload } from '../../types/IProfile';
import { Section } from '../common/Section';

type Payload = ProfilePayload;

export function ProfileSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      <ProfileContent payload={payload} />
    </Section>
  );
}

function ProfileContent({ payload }: { payload: Payload }) {
  const { image, contact, name, tagline, headings, ctas, notice } = payload;
  return (
    <div className="mt-5">
      <div className="text-center">
        {/* 프로필 이미지 */}
        <ProfileImage src={image} />

        {/* 이름 */}
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: 'var(--color-primary)',
            marginBottom: 'var(--space-sm)',
          }}
        >
          {name.title} {name.small && <small style={{ fontSize: '1.5rem' }}>{name.small}</small>}
        </h1>

        {/* 태그라인 */}
        {tagline && (
          <p
            style={{
              fontSize: '1.25rem',
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-lg)',
            }}
          >
            {tagline}
          </p>
        )}

        {/* 핵심 수치 카드 */}
        {headings && headings.length > 0 && (
          <Row className="justify-content-center mb-4">
            {headings.map((heading, index) => (
              <Col key={index.toString()} xs={12} sm={6} md={4} className="mb-3">
                <div
                  style={{
                    padding: 'var(--space-md)',
                    backgroundColor: 'var(--color-bg-highlight)',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      marginBottom: 'var(--space-xs)',
                    }}
                  >
                    {heading.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {heading.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}

        {/* 연락처 */}
        <div className="profile-contacts mb-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-xs)' }}>
          {contact.map((contactItem, index) => (
            <ProfileContact key={index.toString()} payload={contactItem} />
          ))}
        </div>

        {/* CTA 버튼 */}
        {ctas && ctas.length > 0 && (
          <div className="mb-4" style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
            {ctas.map((cta, index) => {
              const isPrimary = cta.variant === 'primary';
              return (
                <Button
                  key={index.toString()}
                  tag="a"
                  href={cta.link}
                  className="cta-button"
                  style={{
                    backgroundColor: isPrimary ? 'var(--color-accent)' : 'transparent',
                    borderColor: 'var(--color-accent)',
                    color: isPrimary ? 'white' : 'var(--color-accent)',
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (isPrimary) {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
                    } else {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-highlight)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isPrimary) {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    } else {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {cta.icon && <FontAwesomeIcon icon={cta.icon} style={{ marginRight: 'var(--space-xs)' }} />}
                  {cta.label}
                </Button>
              );
            })}
          </div>
        )}

        {/* 공지 */}
        <div
          className="notice-banner"
          style={{
            borderLeft: '3px solid var(--color-accent)',
            backgroundColor: 'var(--color-bg-highlight)',
            padding: 'var(--space-md)',
            borderRadius: '4px',
            textAlign: 'left',
            marginTop: 'var(--space-lg)',
          }}
        >
          {notice.icon && <FontAwesomeIcon icon={notice.icon} style={{ marginRight: 'var(--space-sm)' }} />}
          {notice.title}
        </div>
      </div>
    </div>
  );
}
