import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

export function PrintButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="인쇄 / PDF 저장"
      className="print-button"
    >
      <FontAwesomeIcon icon={faPrint} />
    </button>
  );
}
