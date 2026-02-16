import { PropsWithChildren } from 'react';
import { CommonRows } from '../common/CommonRow';
import { RowPayload } from '../../types/row';
import Util from '../common/Util';
import { EmptyRowCol } from '../common';
import { PresentationPayload, PresentationItem } from '../../types/presentation';

export default function PresentationRow({
  payload,
}: PropsWithChildren<{ payload: PresentationPayload }>) {
  return (
    <EmptyRowCol>
      {payload.list.map((item, index) => {
        return <CommonRows key={index.toString()} payload={serialize(item)} index={index} />;
      })}
    </EmptyRowCol>
  );
}

function serialize(item: PresentationItem): RowPayload {
  return {
    left: {
      title: Util.formatYearMonth(item.at),
    },
    right: {
      ...item,
    },
  };
}
