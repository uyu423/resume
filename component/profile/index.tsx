import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileContact from './contact';
import ProfileImage from './image';
import { ProfilePayload } from '../../types/profile';
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
  const { image, contact, name, tagline, headings, notice } = payload;

  return (
    <div className="profile-section">
      {/* Identity Group */}
      <div className="profile-identity">
        <ProfileImage src={image} name={name.title} />
        <div className="profile-identity-text">
          <h1 className="profile-name">
            {name.title} {name.small && <small>{name.small}</small>}
          </h1>
          {tagline && <p className="profile-tagline">{tagline}</p>}
          <div className="profile-contacts">
            {contact.map((contactItem, index) => (
              <ProfileContact key={index.toString()} payload={contactItem} />
            ))}
          </div>
        </div>
      </div>

      <div className="notice-banner">
        {notice.icon && <FontAwesomeIcon icon={notice.icon} className="notice-icon" />}
        {notice.title}
      </div>

      {/* Evidence Group */}
      {headings && headings.length > 0 && (
        <div className="profile-stats-band">
          <div className="stats-grid profile-stats">
            {headings.map((heading, index) => (
              <div key={index.toString()} className="profile-stat-item">
                <div className="profile-stat-value">{heading.value}</div>
                <div className="profile-stat-label">{heading.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
