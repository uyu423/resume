import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'reactstrap';
import type { ProfileContact as ProfileContactType } from '../../types/IProfile';
import { HrefTargetBlank } from '../common';

export default function ProfileContact({
  payload,
}: { payload: ProfileContactType }) {
  return (
    <span className="profile-contact-item" style={{ marginRight: 'var(--space-md)' }}>
      <FontAwesomeIcon icon={payload.icon} style={{ marginRight: 'var(--space-xs)' }} />
      {createLink(payload)}
    </span>
  );
}

function createLink(payload: ProfileContactType) {
  if (payload.badge) {
    return <Badge color="light">{payload.title || payload.link}</Badge>;
  }
  return payload.link ? (
    <HrefTargetBlank url={payload.link} text={payload.title} />
  ) : (
    <span>{payload.title}</span>
  );
}
