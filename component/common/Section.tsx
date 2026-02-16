import { ReactNode } from 'react';
import { CommonPayload } from '../../types/ICommon';

/** disable 플래그를 확인하여 조건부 렌더링하는 섹션 래퍼 */
export function Section<T extends CommonPayload>({
  payload,
  children,
}: {
  payload: T;
  children: (payload: T) => ReactNode;
}) {
  if (payload?.disable) return null;
  return <>{children(payload)}</>;
}
