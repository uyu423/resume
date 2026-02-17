import { PropsWithChildren } from 'react';
import { CommonSection } from '../common/CommonSection';
import { EmptyRowCol } from '../common';
import { CommonRows } from '../common/CommonRow';
import { ShowMoreWrapper } from '../common/ShowMoreWrapper';
import { RowPayload } from '../../types/row';
import Util from '../common/Util';
import { EtcPayload, EtcItem } from '../../types/etc';
import { Section } from '../common/Section';

type Payload = EtcPayload;
type Item = EtcItem;

export function EtcSection({ payload }: { payload: Payload }) {
  return (
    <Section payload={payload}>
      <EtcContent payload={payload} />
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
      <ShowMoreWrapper showMoreCount={payload.showMoreCount}>
        {payload.list.map((item, index) => {
          return <CommonRows key={index.toString()} payload={serialize(item)} index={index} />;
        })}
      </ShowMoreWrapper>
    </EmptyRowCol>
  );
}

function serialize(item: Item): RowPayload {
  return {
    left: {
      title: Util.formatDateRange(item.startedAt, item.endedAt),
    },
    right: {
      ...item,
    },
  };
}
