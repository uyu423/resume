import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ProfileContact as ProfileContactType } from '../../types/IProfile';
import { HrefTargetBlank } from '../common';

export default function ProfileContact({ payload }: { payload: ProfileContactType }) {
  return (
    <span className="profile-contact-item">
      <FontAwesomeIcon icon={payload.icon} style={{ marginRight: 'var(--space-xs)' }} />
      {createLink(payload)}
    </span>
  );
}

function createLink(payload: ProfileContactType) {
  const displayText = getDisplayText(payload);

  if (payload.badge) {
    return <span className="tag">{displayText}</span>;
  }
  return payload.link ? (
    <HrefTargetBlank url={payload.link} text={displayText} />
  ) : (
    <span>{displayText}</span>
  );
}

function getDisplayText(payload: ProfileContactType) {
  if (payload.title && !isHttpUrl(payload.title)) {
    return payload.title;
  }

  const handle = extractSocialHandle(payload.link);
  if (handle) {
    return `@${handle}`;
  }

  return payload.title || payload.link || '';
}

function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

function extractSocialHandle(link?: string) {
  if (!link) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(link);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
  const segments = parsed.pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    return null;
  }

  if (host === 'facebook.com') {
    const reserved = new Set(['groups', 'pages', 'events', 'watch', 'marketplace']);
    if (reserved.has(segments[0].toLowerCase())) {
      return null;
    }
    return sanitizeHandle(segments[0]);
  }

  if (
    host === 'instagram.com' ||
    host === 'threads.net' ||
    host === 'x.com' ||
    host === 'twitter.com'
  ) {
    return sanitizeHandle(segments[0]);
  }

  if (host === 'linkedin.com') {
    if (segments[0] === 'in' && segments[1]) {
      return sanitizeHandle(segments[1]);
    }
    if (segments[0] === 'company' && segments[1]) {
      return sanitizeHandle(segments[1]);
    }
    return null;
  }

  if (host === 'github.com' && segments.length === 1) {
    return sanitizeHandle(segments[0]);
  }

  return null;
}

function sanitizeHandle(raw: string) {
  return decodeURIComponent(raw).replace(/^@+/, '').trim();
}
