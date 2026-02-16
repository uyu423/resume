import { PropsWithChildren } from 'react';
import { CommonSection } from '../common/CommonSection';
import { EmptyRowCol } from '../common';
import { CommonRows } from '../common/CommonRow';
import { IRow } from '../../types/IRow';
import Util from '../common/Util';
import { IEtc } from '../../types/IEtc';
import { Section } from '../common/Section';

type Payload = IEtc.Payload;
type Item = IEtc.Item;

export function EtcSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      {(data) => <EtcContent payload={data} />}
    </Section>
  );
}

function EtcContent({ payload }: { payload: Payload }) {
  return (
    <CommonSection title="ETC">
      <EtcRow payload={payload} />
    </CommonSection>
  );
}

function EtcRow({ payload }: PropsWithChildren<{ payload: Payload }>) {
  return (
    <EmptyRowCol>
      {payload.list.map((item, index) => {
        return <CommonRows key={index.toString()} payload={serialize(item)} index={index} />;
      })}
    </EmptyRowCol>
  );
}

function serialize(item: Item): IRow.Payload {
  return {
    left: {
      title: Util.formatDateRange(item.startedAt, item.endedAt),
    },
    right: {
      ...item,
    },
  };
}
