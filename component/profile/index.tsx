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
  const ctaLinkSet = new Set(
    (ctas ?? []).map((cta) => normalizeLink(cta.link)).filter((link): link is string => !!link),
  );

  const visibleContacts = contact.filter((item) => {
    const normalized = normalizeLink(item.link);
    if (!normalized) {
      return true;
    }
    if (!isGithubLink(item.link)) {
      return true;
    }
    return !ctaLinkSet.has(normalized);
  });

  return (
    <div className="profile-section">
      <div className="text-center">
        <ProfileImage src={image} />

        <h1 className="profile-name">
          {name.title} {name.small && <small>{name.small}</small>}
        </h1>

        {tagline && <p className="profile-tagline">{tagline}</p>}

        {headings && headings.length > 0 && (
          <div className="stats-grid profile-stats">
            {headings.map((heading, index) => (
              <div key={index.toString()} className="profile-stat-item">
                <div className="profile-stat-value">{heading.value}</div>
                <div className="profile-stat-label">{heading.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="profile-contacts">
          {visibleContacts.map((contactItem, index) => (
            <ProfileContact key={index.toString()} payload={contactItem} />
          ))}
        </div>

        {ctas && ctas.length > 0 && (
          <div className="profile-cta-group">
            {ctas.map((cta, index) => {
              const isPrimary = cta.variant === 'primary';
              return (
                <a
                  key={index.toString()}
                  href={cta.link}
                  className={`cta-button ${isPrimary ? 'cta-button-primary' : 'cta-button-outline'}`}
                >
                  {cta.icon && <FontAwesomeIcon icon={cta.icon} />}
                  {cta.label}
                </a>
              );
            })}
          </div>
        )}

        <div className="notice-banner">
          {notice.icon && <FontAwesomeIcon icon={notice.icon} className="notice-icon" />}
          {notice.title}
        </div>
      </div>
    </div>
  );
}

function normalizeLink(link?: string) {
  if (!link) {
    return null;
  }
  const trimmed = link.trim();

  if (trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
    return trimmed.toLowerCase();
  }

  try {
    const parsed = new URL(trimmed);
    const normalizedPath = parsed.pathname.replace(/\/+$/, '').toLowerCase();
    return `${parsed.hostname.replace(/^www\./, '').toLowerCase()}${normalizedPath}`;
  } catch {
    return trimmed.toLowerCase();
  }
}

function isGithubLink(link?: string) {
  if (!link) {
    return false;
  }
  try {
    return new URL(link).hostname.replace(/^www\./, '').toLowerCase() === 'github.com';
  } catch {
    return false;
  }
}
