import { PropsWithChildren } from 'react';
import { OpenSourcePayload, OpenSourceItem } from '../../types/open-source';
import { EmptyRowCol } from '../common';
import { CommonRows } from '../common/CommonRow';
import { RowPayload } from '../../types/row';

export default function OpenSourceRow({
  payload,
}: PropsWithChildren<{ payload: OpenSourcePayload }>) {
  return (
    <EmptyRowCol>
      {payload.list.map((item, index) => (
        <CommonRows key={index.toString()} payload={serialize(item)} index={index} />
      ))}
    </EmptyRowCol>
  );
}

function serialize(item: OpenSourceItem): RowPayload {
  return {
    left: {
      title: item.title,
    },
    right: {
      descriptions: item.descriptions,
    },
  };
}
